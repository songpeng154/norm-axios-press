---
outline: deep
---

# 介绍

可以通过[NormAxios](/api-reference/norm-axios/home.md)
类创建请求实例，[NormAxios](/api-reference/norm-axios/home.md)
是一个基于 [Axios](https://github.com/axios/axios)
实现的约定式请求类，它解决了多个后台服务，后台服务的数据结构可能不一致的问题。

[NormAxios](/api-reference/norm-axios/home.md) 的[构造函数](/api-reference/norm-axios/home.md#构造函数)
接收一个配置对象，配置对象的属性和 `Axios` 的配置对象一致。

[NormAxios](/api-reference/norm-axios/home.md) 将 [Axios](https://github.com/axios/axios)
的拦截器的方法抽取到了[interceptor](/api-reference/norm-axios/norm-axios-interceptor.md)中，并且约定了拦截器和请求方法（
`GET`、`POST`、`PUT`、`DELETE`）返回的类型必须是
[ResponseContent](/api-reference/common-type/response-content.md)。

::: tip 最最最麻烦的一点
开发人员需要在接口成功和失败的拦截器中，将后端返回的数据统一转换为 [ResponseContent](/api-reference/common-type/response-content.md)格式，确保在 `useRequest` 和`usePagination`中能正常使用。
:::


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

## 定义后台服务数据结构

```typescript
interface Result<TData> {
  code: number,
  msg: string
  data: TData
}
```

## 创建请求实例

```typescript{16,18,24,28,33,37,40}
import { NormAxios, ResponseContent } from 'norm-axios'

const server = new NormAxios<Result>({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  interceptor: {
    // 处理请求之前（比如请求头、token）
    onBeforeRequest(config) {
      return config
    },
    // 处理响应
    onResponse(response) {
      // 服务响应数据
      const { code, msg, data } = response.data
      // 统一的响应结果
      const responseContent: ResponseContent<Result, typeof result> = [ data, undefined, response ]

      // 处理响应错误 (假设 code 不等于 200 为错误)
      if (code !== 200) {
        // 设置错误的响应内容
        responseContent[1] = { code, msg }
      }

      return responseContent
    },
    // 处理响应错误
    onResponseError(error) {
      const responseContent: ResponseContent = [ undefined, undefined, err.response ]

      // 处理响应后的错误
      if (err.response) {
        // 请求已发出，但服务器响应的状态码错误
        responseContent[1] = { code: err.response.status, msg: '请求错误' }
      }
      // 处理请求时的错误
      else {
        responseContent[1] = { code: err.code as number, msg: '请求错误', axiosError: err }
      }

      return responseContent
    },
  },
})
```

## 定义 API

```typescript
interface Userinfo {
  name: string

  age: number
}

const getUserinfo = (id) => server.get<Userinfo>('/userinfo', { id })

const getUserList = (params) => server.post<Userinfo[]>('/userlist', params)
```

## 常规使用

```typescript
const setUserinfo = async (id) => {
  const [ data, err, res ] = await getUserinfo(id)
  if (err) {
    // 处理错误
  }
  console.log(data) // 取的是后台响应内容的 data
  console.log(res) // axios响应体（包含请求头、响应头、实际响应内容之类）
}
```


## 搭配 `useRequest` 使用

```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-if="error">异常啦</div>
    <div v-if="data">数据（取的是后台响应内容的 data）: {{ data }}</div>
    <div v-if="rawData">原始数据（包含 code、msg、data）: {{ rawData }}</div>
    <div v-if="response">axios 响应内容: {{ response }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { useRequest } from 'norm-axios'

  const { data, loading, error, rawData, response } = useRequest(getUserinfo)
</script>
```

[//]: # ()
[//]: # (## 使用 usePagination 获取分页数据)

[//]: # ()
[//]: # (```vue)

[//]: # (<template>)

[//]: # (  <div>)

[//]: # (    <div v-if="loading">加载中...</div>)

[//]: # (    <div v-if="error">异常啦</div>)

[//]: # (    <div v-if="data">数据（取的是后台响应内容的 data）: {{ data }}</div>)

[//]: # (    <div v-if="data">原始数据（包含 code、msg、data）: {{ data }}</div>)

[//]: # (    <div v-if="response">axios 响应内容: {{ data }}</div>)

[//]: # (  </div>)

[//]: # (</template>)

[//]: # (<script lang="ts" setup>)

[//]: # (  import { usePagination } from 'norm-axios')

[//]: # ()
[//]: # (  const { data, list, loading, error } = usePagination&#40;pagination => getUserList&#40;{}&#41;&#41;)

[//]: # (</script>)

[//]: # (```)