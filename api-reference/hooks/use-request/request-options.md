---
outline: deep
---

[useRequest](./home) / **RequestOptions**

# 接口：RequestOptions

`RequestState` 是 [useRequest](./home.md) 返回的数据状态类型。

## 类型声明
```typescript
import type { AxiosResponse } from 'axios'
import type { EffectScope, MaybeRef, Ref, WatchSource } from 'vue'


export interface RequestOptions<
  // 数据
  TData = any,
  // 方法参数
  TParams extends any[] = any[],
  // 格式化数据
  TFormatData = TData,
  // 原始数据
  TRawData = any,
> {
  /**
   * data 初始的数据
   */
  initialData?: TFormatData

  /**
   * 传递给 service 的参数
   */
  defaultParams?: TParams

  /**
   * 手动执行
   * @desc  默认 false。 即在初始化时自动执行 service。如果设置为 true, 则需要手动调用 run 或 runAsync 触发执行
   * @default false
   */
  manual?: boolean

  /**
   * 当前请求是否准备好了,准备好后才可以发送请求
   * @default true
   */
  ready?: Ref<boolean>

  /**
   * 侦听一个或多个响应式数据源，如果传入 true 会自动收集 server 中的响应式数据源。当响应式数据源变化时会自动刷新服务
   */
  watchSource?: true | WatchSource | WatchSource[]

  /**
   * 是否深度观察，与 vue watch 中的 deep一致
   * @default false
   */
  watchDeep?: boolean

  /**
   * 窗口获取焦点的时候刷新请求
   * @default false
   */
  refreshOnWindowFocus?: MaybeRef<boolean>

  /**
   * 重新请求间隔（毫秒）
   * @default 5000ms
   */
  focusTimespan?: MaybeRef<number>

  /**
   * 指定 loading 的延时打开时间 (毫秒)，可以防止接口加载速度非常快，loading出现闪烁的情况
   */
  loadingDelay?: MaybeRef<number>

  /**
   * 可以让 loading 持续指定的时间 (毫秒)，可以防止 loading 一闪而过
   * 如果请求时间少于指定的时间，则最终时间为指定的时间
   * 如果请求时间大于指定的时间，则最终时间为请求的时间
   */
  loadingKeep?: MaybeRef<number>

  /**
   * 设置防抖等待时间 (毫秒)
   * @default 500ms
   */
  debounceWait?: MaybeRef<number>

  /**
   * 防抖允许被延迟的最大值
   */
  debounceMaxWait?: MaybeRef<number>

  /**
   * 在延迟开始前执行调用
   * @default false
   */
  debounceLeading?: MaybeRef<boolean>

  /**
   * 在延迟结束后执行调用
   * @default true
   */
  debounceTrailing?: MaybeRef<boolean>

  /**
   * 设置节流等待时间 (毫秒)
   * @default 500ms
   */
  throttleWait?: MaybeRef<number>

  /**
   * 在节流开始前执行调用
   * @default true
   */
  throttleLeading?: MaybeRef<boolean>

  /**
   * 在节流结束后执行调用
   * @default true
   */
  throttleTrailing?: MaybeRef<boolean>

  /**
   * 轮询间隔（毫秒），如果值大于 0，则启动轮询模式。
   * @default 0
   */
  pollingInterval?: MaybeRef<number>

  /**
   * 屏幕不可见时轮询，当 pollingInterval 大于 0 时才生效。
   * 默认情况下，轮询在屏幕不可见时，会暂停轮询。当设置成 true 时，在屏幕不可见时，轮询任务依旧会定时执行。
   * @default false
   */
  pollingWhenDocumentHidden?: MaybeRef<boolean>

  /**
   * 窗口失去焦点时进行轮询
   * @default true
   */
  pollingWhenWindowBlur?: MaybeRef<boolean>

  /**
   * 轮询错误重试次数。如果设置为 Infinity，则无限次
   * @default 3
   */
  pollingErrorRetryCount?: MaybeRef<number>

  /**
   * 错误重试次数。如果设置为 Infinity，则无限次重试。
   */
  errorRetryCount?: MaybeRef<number>

  /**
   * 重试时间间隔，单位为毫秒
   */
  errorRetryInterval?: MaybeRef<number>

  /**
   * 请求唯一标识。如果设置了 cacheKey，我们会启用缓存机制。同一个 cacheKey 的数据全局同步。
   */
  cacheKey?: string

  /**
   * 缓存过期时间（毫秒），超过该时间会自动清除该缓存数据。
   * 设置 Infinity 表示永不过期
   * @default 600000
   */
  cacheTime?: number

  /**
   * 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。
   * 设置 Infinity 表示永不过期
   */
  staleTime?: number

  /**
   * 格式化数据
   */
  formatData?: (data: TData, params: TParams, response: AxiosResponse<TRawData>) => TFormatData

  /**
   * 请求之前执行
   * @param params 请求参数
   */
  onBefore?: (params: TParams) => void

  /**
   * promise resolve 的时候执行
   * @param data 响应数据
   * @param params 请求参数
   * @param response  axios响应内容
   */
  onSuccess?: (
    data: TFormatData,
    params: TParams,
    response: AxiosResponse<TRawData>,
  ) => void

  /**
   * 请求错误的时候执行
   * @param error 错误信息
   * @param params 请求参数
   * @param response  axios响应内容
   */
  onError?: (
    error: ResponseError,
    params: TParams,
    response: AxiosResponse<TRawData>,
  ) => void

  /**
   * 最后执行,不管 service 成功失败都会执行
   * @param params 参数
   */
  onFinally?: (params: TParams) => void
}
```

## 泛型

| 名称            | 默认值     | 继承      | 可选  | 描述        |
|:--------------|:--------|:--------|:----|-----------|
| `TData`       | `any`   |         | `是` | 数据类型      |
| `TParams`     | `any[]` | `any[]` | `是` | 函数入参类型    |
| `TFormatData` | `TData` |         | `是` | 格式化数据后的类型 |
| `TRawData`    | `any`   |         | `是` | 原始数据类型    |

## 属性

### initialData

* `可选` - `TFormatData`

[data](request-state#data) 初始的数据

### defaultParams

* `可选` - `TParams`

传递给 [service](request-service-fn) 的参数

### manual

* `可选` - `boolean`
* 默认值：`false`

是否手动执行请求（`true` 需手动调用 [run](request-method#run)，`false` 自动初始化执行）

### ready

* `可选` - `Ref<boolean>`
* 默认值：`true`

当前请求是否准备就绪（`true` 可发送请求）

### watchSource

* `可选` - `true | WatchSource | WatchSource[]`

自动/手动侦听响应式数据源变化,当响应式数据源变化时会自动刷新服务（`true` 自动收集 service 中的响应式依赖）

### watchDeep

* `可选` - `boolean`
* 默认值：`false`

是否深度观察数据源（与 [vue watch](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers) 的 `deep` 选项一致）

### refreshOnWindowFocus

* `可选` - `MaybeRef<boolean>`
* 默认值：`false`

窗口获取焦点时自动刷新请求

### focusTimespan

* `可选` - `MaybeRef<number>`
* 默认值：`5000`

重新请求间隔（毫秒）

### loadingDelay

* `可选` - `MaybeRef<number>`

延迟显示 loading 的时间（毫秒，防止快速响应时闪烁）

### loadingKeep

* `可选` - `MaybeRef<number>`

强制 loading 最小持续时间（毫秒，避免一闪而过）

* 如果请求时间少于指定的时间，则最终时间为指定的时间
* 如果请求时间大于指定的时间，则最终时间为请求的时间

### debounceWait

* `可选` - `MaybeRef<number>`
* 默认值：`500`

防抖等待时间（毫秒）

### debounceMaxWait

* `可选` - `MaybeRef<number>`

防抖允许被延迟的最大时间

### debounceLeading

* `可选` - `MaybeRef<boolean>`
* 默认值：`false`

是否在防抖延迟前执行调用

### debounceTrailing

* `可选` - `MaybeRef<boolean>`
* 默认值：`true`

是否在防抖延迟后执行调用

### throttleWait

* `可选` - `MaybeRef<number>`
* 默认值：`500`

节流等待时间（毫秒）

### throttleLeading

* `可选` - `MaybeRef<boolean>`
* 默认值：`true`

是否在节流开始前执行调用

### throttleTrailing

* `可选` - `MaybeRef<boolean>`
* 默认值：`true`

是否在节流结束后执行调用

### pollingInterval

* `可选` - `MaybeRef<number>`
* 默认值：`0`

轮询间隔（毫秒，>0 时启用轮询）

### pollingWhenDocumentHidden

* `可选` - `MaybeRef<boolean>`
* 默认值：`false`

屏幕不可见时是否继续轮询（需开启 pollingInterval）

### pollingWhenWindowBlur

* `可选` - `MaybeRef<boolean>`
* 默认值：`true`

窗口失去焦点时是否继续轮询

### pollingErrorRetryCount

* `可选` - `MaybeRef<number>`
* 默认值：`3`

轮询错误重试次数（`Infinity` 表示无限重试）

### errorRetryCount

* `可选` - `MaybeRef<number>`

普通请求错误重试次数（`Infinity` 表示无限重试）

### errorRetryInterval

* `可选` - `MaybeRef<number>`

重试时间间隔（毫秒）

### cacheKey

* `可选` - `string`

请求唯一标识（启用缓存机制，相同 cacheKey 全局同步数据）

### cacheTime

* `可选` - `number`
* 默认值：`600000`

缓存过期时间（毫秒，`Infinity` 永不过期）

### staleTime

* `可选` - `number`

数据保鲜时间（毫秒，期内不重新请求，`Infinity` 永保鲜）

## 方法

### formatData

自定义数据格式化函数

#### 入参

| 名称         | 类型                        | 默认值 | 描述        |
|:-----------|:--------------------------|:----|:----------|
| `data`     | `TData`                   |     | 数据        |
| `params`   | `TParams`                 |     | 入参        |
| `response` | `AxiosResponse<TRawData>` |     | axios原始响应 |

#### 返回值

`TFormatData`

### onBefore

请求前回调

#### 入参

| 名称       | 类型        | 默认值 | 描述 |
|:---------|:----------|:----|:---|
| `params` | `TParams` |     | 入参 |

#### 返回值

`void`

### onSuccess

请求成功回调

#### 入参

| 名称         | 类型                        | 默认值 | 描述        |
|:-----------|:--------------------------|:----|:----------|
| `data`     | `TFormatData`             |     | 数据        |
| `params`   | `TParams`                 |     | 入参        |
| `response` | `AxiosResponse<TRawData>` |     | axios原始响应 |

#### 返回值

`void`

### onError

请求失败回调

#### 入参

| 名称         | 类型                                                         | 默认值 | 描述        |
|:-----------|:-----------------------------------------------------------|:----|:----------|
| `error`    | [ResponseError](/api-reference/common-type/response-error) | -   | 错误信息      |
| `params`   | `TParams`                                                  | -   | 入参        |
| `response` | `AxiosResponse<TRawData>`                                  | -   | axios原始响应 |

#### 返回值

`void`

### onFinally

请求最终回调,无论成功失败都会执行

#### 入参

| 名称       | 类型        | 默认值 | 描述 |
|:---------|:----------|:----|:---|
| `params` | `TParams` | -   | 入参 |

#### 返回值

`void`
