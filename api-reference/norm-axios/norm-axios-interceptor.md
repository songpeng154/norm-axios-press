---
outline: deep
---

[NormAxios总览](./home) / **NormAxiosInterceptor**

# 接口：NormAxiosInterceptor

拦截器，将 [Axios](https://github.com/axios/axios) 的拦截器的方法抽取到了[NormAxiosConfig.interceptor](./norm-axios-config.md#interceptor)
中,是为了限制响应成功和响应失败返回，都限制成统一的[ResponseContent](/api-reference/common-type/response-content.md)类型

::: warning 注意事项
请勿在拦截器中直接通过 `Promise.reject` 抛出错误（例如: `Promise.reject(responseContent)`），因为后续的错误处理逻辑依赖
[ResponseContent[1]](/api-reference/common-type/response-content.md#responsecontent-1) 索引。

正确的做法是：将捕获到的异常信息直接赋值给 [ResponseContent[1]](/api-reference/common-type/response-content.md#responsecontent-1)
即可。
::: details 点我查看示例

```typescript
import { NormAxios, ResponseContent } from 'norm-axios'

const server = new NormAxios<Result>({
  interceptor: {
    // 处理响应
    onResponse(response) { // [!code focus:41]
      // 服务响应数据
      const { code, msg, data } = response.data
      // 统一的响应结果
      const responseContent: ResponseContent<Result, typeof result> = [ data, undefined, response ]


      // 处理响应错误 (假设 code 不等于 200 为错误)
      if (code !== 200) {
        // 错误实例 ❌ // [!code --]
        return Promise.reject(responseContent) // [!code --]

        // 正确设置错误的响应内容 ✅ // [!code ++]
        responseContent[1] = { code, msg } // [!code ++]
      }

      return responseContent
    },
    // 处理响应错误
    onResponseError(error) {
      const responseContent: ResponseContent = [ undefined, undefined, err.response ]

      // 处理响应后的错误
      if (err.response) {
        // 错误实例 ❌ // [!code --]
        return Promise.reject(responseContent) // [!code --]

        // 请求已发出，但服务器响应的状态码错误 ✅ // [!code ++]
        responseContent[1] = { code: err.response.status, msg: '请求错误' } // [!code ++]
      }
      // 处理请求时的错误
      else {
        // 错误实例 ❌ // [!code --]
        return Promise.reject(responseContent) // [!code --]

        // 正确设置错误的响应内容 ✅ // [!code ++]
        responseContent[1] = { code: err.code as number, msg: '请求错误', axiosError: err } // [!code ++]
      }

      return responseContent
    },
  },
})
```

:::

```typescript
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

export interface NormAxiosInterceptor<TResponse extends Record<string, any> = Record<string, any>> {
  onBeforeRequest?: (config: AxiosRequestConfig) => void | Promise<void>

  onResponse?: (response: AxiosResponse<TResponse>) => ResponseContent<TResponse> | Promise<ResponseContent<TResponse>>

  onResponseError?: (error: AxiosError) => ResponseContent | Promise<ResponseContent>
}
```

## 泛型

| 名称          | 默认值                   | 继承                    | 可选  | 描述     |
|:------------|:----------------------|:----------------------|:----|--------|
| `TResponse` | `Record<string, any>` | `Record<string, any>` | `是` | 数据结构类型 |

## 方法

### onBeforeRequest

请求之前拦截器。

在这里可以处理请求头、请求参数、token等。

#### 入参

| 名称       | 类型                                                   | 默认值                                                  | 描述          |
|:---------|:-----------------------------------------------------|:-----------------------------------------------------|:------------|
| `config` | [AxiosRequestConfig](https://github.com/axios/axios) | [AxiosRequestConfig](https://github.com/axios/axios) | `axios`请求配置 |

#### 返回值

`void` | `Promise<void>`

### onResponse

响应拦截器。

在这里可以处理响应数据，统一处理响应数据格式。

#### 入参

| 名称         | 类型                                              | 默认值                                             | 描述          |
|:-----------|:------------------------------------------------|:------------------------------------------------|:------------|
| `response` | [AxiosResponse](https://github.com/axios/axios) | [AxiosResponse](https://github.com/axios/axios) | `axios`响应内容 |

#### 返回值

[ResponseContent](/api-reference/common-type/response-content.md) | `Promise<ResponseContent>`

### onResponseError

响应错误拦截器。

在这里可以处理[Axios](https://github.com/axios/axios)响应时抛出的异常，比如：请求超时、响应状态码错误等。

#### 入参

| 名称      | 类型                                           | 默认值                                          | 描述          |
|:--------|:---------------------------------------------|:---------------------------------------------|:------------|
| `error` | [AxiosError](https://github.com/axios/axios) | [AxiosError](https://github.com/axios/axios) | `axios`异常对象 |

#### 返回值

[ResponseContent](/api-reference/common-type/response-content.md) | `Promise<ResponseContent>`



