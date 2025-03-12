---
outline: deep
---

[NormAxios总览](./home) / **NormAxiosConfig**

# 接口：NormAxiosConfig

配置对象的属性除了[interceptor](./norm-axios-interceptor.md)，其他属性和 `Axios` 的配置对象一致

```typescript
import type { CreateAxiosDefaults } from 'axios'

export interface NormAxiosConfig<TResponse extends Record<string, any> = Record<string, any>> extends CreateAxiosDefaults {
  interceptor?: NormAxiosInterceptor<TResponse>
}
```

## 泛型

| 名称          | 默认值                   | 继承                    | 可选  | 描述     |
|:------------|:----------------------|:----------------------|:----|--------|
| `TResponse` | `Record<string, any>` | `Record<string, any>` | `是` | 数据结构类型 |

## 继承

[CreateAxiosDefaults](https://github.com/axios/axios/blob/v1.x/index.d.ts#L389)

## 属性

### interceptor

* `可选` - [NormAxiosInterceptor](./norm-axios-interceptor.md)

拦截器。

