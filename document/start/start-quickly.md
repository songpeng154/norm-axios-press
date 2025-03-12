---
outline: deep
---

# 快速开始

本节介绍如何快速上手

## 安装

::: code-group

```bash [npm]
npm install axios norm-axios
```

```bash [yarn]
yarn add axios norm-axios
```

```bash [pnpm]
pnpm add axios norm-axios
```

```bash [bun]
bun add axios norm-axios
```

:::

## 浏览器直接引入

直接通过浏览器的 `HTML` 标签导入 `norm-axios`，然后就可以使用全局变量 `NormAxios` 了。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 `unpkg` 和 `jsDelivr` 举例。 你也可以使用其它的 CDN 供应商。

### unpkg

```html

<head>
    <!-- 导入 Vue 3 -->
    <script src="//unpkg.com/vue@3"></script>
    <!-- 导入 axios -->
    <script src="//unpkg.com/axios"></script>
    <!-- 导入 norm-axios -->
    <script src="//unpkg.com/norm-axios"></script>
</head>
```

### jsDelivr

```html

<head>
    <!-- 导入 Vue 3 -->
    <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
    <!-- 导入 axios -->
    <script src="//cdn.jsdelivr.net/npm/axios"></script>
    <!-- 导入 norm-axios -->
    <script src="//cdn.jsdelivr.net/npm/norm-axios"></script>
</head>
```

## 示例

```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-if="error">异常啦</div>
    <div v-if="data">数据（取的是后台响应内容的 data）: {{ data }}</div>
    <div v-if="data">原始数据（包含 code、msg、data）: {{ data }}</div>
    <div v-if="response">axios 响应内容: {{ data }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { useRequest } from 'norm-axios'

  const { data, loading, error, rawData, response } = useRequest(getUserinfo)
</script>

```