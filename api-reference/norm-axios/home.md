---
outline: deep
---

# NormAxios

`NormAxios` 是一个基于 [Axios](https://github.com/axios/axios)
实现的约定式请求类，它解决了多个后台服务，后台服务的数据结构可能不一致的问题。
---> [详细教程](../../document/norm-axios/home)

```typescript
class NormAxios<TResponse extends Record<string, any> = Record<string, any>> {
  axiosInstance: AxiosInstance;

  axiosConfig: NormAxiosConfig<TResponse>;

  constructor(config: NormAxiosConfig<TResponse>);

  request<TData = any, TParams extends Record<string, any> = Record<string, any>>(config: AxiosRequestConfig<TParams>): Promise<ResponseContent<TData, TResponse>>;

  get<TData = any, TParams extends Record<string, any> = Record<string, any>>(url: string, params?: TParams, config?: AxiosRequestConfig<TParams>): Promise<ResponseContent<TData, TResponse>>;

  post<TData = any, TParams extends Record<string, any> = Record<string, any>>(url: string, data?: TParams, config?: AxiosRequestConfig<TParams>): Promise<ResponseContent<TData, TResponse>>;

  put<TData = any, TParams extends Record<string, any> = Record<string, any>>(url: string, data?: TParams, config?: AxiosRequestConfig<TParams>): Promise<ResponseContent<TData, TResponse>>;

  delete<TData = any, TParams extends Record<string, any> = Record<string, any>>(url: string, data?: TParams, config?: AxiosRequestConfig<TParams>): Promise<ResponseContent<TData, TResponse>>;

  static extend<Result extends Record<string, any> = Record<string, any>>(instance: NormAxios<Result>, config?: NormAxiosConfig<Result>): NormAxios<Result>;
}
```

## 相关类型

### [NormAxiosConfig](./norm-axios-config)

### [NormAxiosInterceptor](./norm-axios-interceptor.md)

## 泛型

| 名称          | 默认值                   | 继承                    | 可选  | 描述     |
|:------------|:----------------------|:----------------------|:----|--------|
| `TResponse` | `Record<string, any>` | `Record<string, any>` | `是` | 数据结构类型 |

## 构造函数

### 入参

| 名称       | 类型                           | 默认值 | 描述                                          |
|:---------|:-----------------------------|:----|:--------------------------------------------|
| `config` | `NormAxiosConfig<TResponse>` | 无   | `norm fetch`配置;[详解](./norm-axios-config.md) |

### 返回值

`void`

## 实例-属性

### axiosInstance

* 类型：[AxiosInstance](https://github.com/axios/axios/blob/v1.x/index.d.ts#L510)

`axios` 实例

### axiosConfig

* 类型：[NormAxiosConfig](./norm-axios-config)

`axios` 配置

## 实例-方法

### request

通用请求方法,与 `axios`的`request`用法一致

#### 泛型

| 名称        | 默认值                   | 继承                    | 可选  | 描述     |
|:----------|:----------------------|:----------------------|:----|--------|
| `TData`   | `any`                 |                       | `是` | 数据类型   |
| `TParams` | `Record<string, any>` | `Record<string, any>` | `是` | 接口入参类型 |

#### 入参

| 名称       | 类型                              | 默认值 | 描述                                                                  |
|:---------|:--------------------------------|:----|:--------------------------------------------------------------------|
| `config` | `AxiosRequestConfig<TResponse>` | 无   | 请求配置;[详解](https://github.com/axios/axios/blob/v1.x/index.d.ts#L316) |

#### 返回值

[Promise<ResponseContent<TData,TParams,TResponse>>](/api-reference/common-type/response-content.md)

#### 示例

```typescript
interface Userinfo {
  name: string

  age: number
}

interface UserinfoParams {
  id: number
}

const getUserinfo = (params: UserinfoParams) => server.request<Userinfo, UserinfoParams>({
  url: '/userinfo',
  method: 'get',
  params,
})

```

### get

`Get`请求方法,与 基于`request`实现，优化了入参方式

#### 泛型

| 名称        | 默认值                   | 继承                    | 可选  | 描述     |
|:----------|:----------------------|:----------------------|:----|--------|
| `TData`   | `any`                 |                       | `是` | 数据类型   |
| `TParams` | `Record<string, any>` | `Record<string, any>` | `是` | 接口入参类型 |

#### 入参

| 名称        | 类型                              | 默认值 | 描述                                                                  |
|:----------|:--------------------------------|:----|:--------------------------------------------------------------------|
| `url`     | `string`                        | 无   | 请求路径                                                                |
| `params?` | `TParams`                       | 无   | 入参                                                                  |
| `config?` | `AxiosRequestConfig<TResponse>` | 无   | 请求配置;[详解](https://github.com/axios/axios/blob/v1.x/index.d.ts#L316) |

#### 返回值

[Promise<ResponseContent<TData,TParams,TResponse>>](/api-reference/common-type/response-content.md)

#### 示例

```typescript
const getUserinfo = (params: UserinfoParams) => server.get('/userinfo', params)
```

### post

`Post`请求方法,与 基于`request`实现，优化了入参方式

#### 泛型

| 名称        | 默认值                   | 继承                    | 可选  | 描述     |
|:----------|:----------------------|:----------------------|:----|--------|
| `TData`   | `any`                 |                       | `是` | 数据类型   |
| `TParams` | `Record<string, any>` | `Record<string, any>` | `是` | 接口入参类型 |

#### 入参

| 名称        | 类型                              | 默认值 | 描述                                                                  |
|:----------|:--------------------------------|:----|:--------------------------------------------------------------------|
| `url`     | `string`                        | 无   | 请求路径                                                                |
| `data?`   | `TParams`                       | 无   | 入参                                                                  |
| `config?` | `AxiosRequestConfig<TResponse>` | 无   | 请求配置;[详解](https://github.com/axios/axios/blob/v1.x/index.d.ts#L316) |

#### 返回值

[Promise<ResponseContent<TData,TParams,TResponse>>](/api-reference/common-type/response-content.md)

#### 示例

```typescript
const getUserinfo = (params: UserinfoParams) => server.post('/userinfo', params)
```

### delete

`Delete`请求方法,与 基于`request`实现，优化了入参方式

#### 泛型

| 名称        | 默认值                   | 继承                    | 可选  | 描述     |
|:----------|:----------------------|:----------------------|:----|--------|
| `TData`   | `any`                 |                       | `是` | 数据类型   |
| `TParams` | `Record<string, any>` | `Record<string, any>` | `是` | 接口入参类型 |

#### 入参

| 名称        | 类型                              | 默认值 | 描述                                                                  |
|:----------|:--------------------------------|:----|:--------------------------------------------------------------------|
| `url`     | `string`                        | 无   | 请求路径                                                                |
| `params?` | `TParams`                       | 无   | 入参                                                                  |
| `config?` | `AxiosRequestConfig<TResponse>` | 无   | 请求配置;[详解](https://github.com/axios/axios/blob/v1.x/index.d.ts#L316) |

#### 返回值

[Promise<ResponseContent<TData,TParams,TResponse>>](/api-reference/common-type/response-content.md)

#### 示例

```typescript
const getUserinfo = (params: UserinfoParams) => server.delete('/userinfo', params)
```

### put

`Put`请求方法,与 基于`request`实现，优化了入参方式

#### 泛型

| 名称        | 默认值                   | 继承                    | 可选  | 描述     |
|:----------|:----------------------|:----------------------|:----|--------|
| `TData`   | `any`                 |                       | `是` | 数据类型   |
| `TParams` | `Record<string, any>` | `Record<string, any>` | `是` | 接口入参类型 |

#### 入参

| 名称        | 类型                              | 默认值 | 描述                                                                  |
|:----------|:--------------------------------|:----|:--------------------------------------------------------------------|
| `url`     | `string`                        | 无   | 请求路径                                                                |
| `data?`   | `TParams`                       | 无   | 入参                                                                  |
| `config?` | `AxiosRequestConfig<TResponse>` | 无   | 请求配置;[详解](https://github.com/axios/axios/blob/v1.x/index.d.ts#L316) |

#### 返回值

[Promise<ResponseContent<TData,TParams,TResponse>>](/api-reference/common-type/response-content.md)

#### 示例

```typescript
const getUserinfo = (params: UserinfoParams) => server.put('/userinfo', params)
```

## 静态-方法

### extend

使用该静态方法可以继承已有的`NormAxios`实例

#### 泛型

* Result：数据结构

#### 入参

| 名称         | 类型                           | 默认值     | 描述                                            |
|:-----------|:-----------------------------|:--------|:----------------------------------------------|
| `instance` | `NormAxios<Result>`          | 无       | `norm fetch` 实例                               |
| `config？`  | `NormAxiosConfig<TResponse>` | 继承实例的配置 | 覆盖`norm fetch`配置;[详解](./norm-axios-config.md) |

#### 返回值

`NormAxios`实例

#### 示例

```typescript
import { NormAxios } from 'norm-axios'

const service = new NormAxios({
  baseURL: '/service',
  timeout: 1000,
  interceptor: {
    onBeforeRequest(config) {
      console.log(config)
    },
  },
})

const newService = NormAxios.extend(service, {
  baseURL: '/newService',
})
```


