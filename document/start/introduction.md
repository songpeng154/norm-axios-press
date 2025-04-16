---
outline: deep
---

# 介绍

`Norm Axios` 是基于 [Axios](https://github.com/axios/axios) 实现的约定式请求库，提供了约定式的请求以及强大的 `Hook API`
，帮助你更高效的开发。

## Norm Axios 解决了什么问题

* 解决了多个后台服务，后台服务的数据结构可能不一致的问题。
* 简化了数据获取流程，自动处理请求状态，减少了冗余代码。
* 简化了分页处理，自动管理分页状态，减少了手动编写分页逻辑的麻烦。

```vue

<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-if="error">异常啦</div>
    <div v-if="list">列表数据（取的是后台响应内容data中的 list）: {{ list }}</div>
    <div v-if="rawData">原始数据（包含 code、msg、data）: {{ rawData }}</div>
    <div v-if="response">axios 响应内容: {{ response }}</div>
    <div v-if="page">当前分页: {{ page }}</div>
    <div v-if="pageSize"> 每页数量: {{ pageSize }}</div>
    <div v-if="total"> 列表总数: {{ total }}</div>
    <div v-if="totalPage"> 分页总数: {{ totalPage }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { usePagination } from 'norm-axios'

  const {
    list,
    loading,
    error,
    rawData,
    response,
    page,
    pageSize,
    total,
    totalPage,
  } = usePagination(({ page, pageSize }) => getUserList({ page, pageSize }))
</script>
```
* 🌐 统一多后端服务的数据结构
* ⚡ 响应式数据
* 🔄 轮询请求
* ♻️ 自动处理错误重试
* 💾 内存缓存策略
* ⏳ 节流、防抖请求
* 🔍 聚焦页面时自动重新请求
* 📊 强大的分页钩子、自动管理分页状态，无限滚动等功能
* ⚙️ 全局配置（包含插件）
* 🟢 支持 Vue3
* 📘 支持 TypeScript，具有强大的类型提示

## 致谢

* [Axios](https://github.com/axios/axios)
* [VueReuquest](https://github.com/attojs/vue-request)
* [VueHookPlus](https://github.com//InhiblabCore/vue-hooks-plus)
* [Ahooks](https://github.com/alibaba/hooks)
* [Alova](https://github.com/alovajs/alova.git)
* [TanStackQuery](https://github.com/tanstack/query)
