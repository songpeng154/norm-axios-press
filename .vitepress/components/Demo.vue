<script lang="ts" setup>
import { getComponent } from '../utils'
import { codeToHtml } from 'shiki'
import { computed, onBeforeMount, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { NButton,useMessage,NCollapseTransition } from 'naive-ui'
import { run } from 'node:test'

const props = defineProps<{
  path: string
  runUrl: string
  sourceCode: string
}>()
const files = import.meta.glob('../examples/**/*.vue', {
  eager: true,
})

const message = useMessage()
const [ isShow, toggleShow ] = useToggle()
const clipboard = useClipboard()

const Example = getComponent(files, props.path)

const html = ref('')

const onCopy = () => {
  clipboard.copy(decodeURIComponent(props.sourceCode)).then(() => {
    message.success('复制成功')
  }).catch(() => {
    message.error('复制失败')
  })
}

onBeforeMount(async () => {
  html.value = await codeToHtml(decodeURIComponent(props.sourceCode), {
    lang: 'vue',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })
})
</script>

<template>
  <div class="demo">
    <div class="card">
      <div class="card-content">
        <n-button>test33</n-button>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
      <div class="card-action">
        <div>
          <a v-if="runUrl" :href="runUrl">在线运行</a>
        </div>
        <div class="card-action-icon-group">
          <div @click="onCopy" class="icon i-ep:copy-document"/>
          <div @click="toggleShow()" class="icon i-ic:baseline-code"/>
        </div>
      </div>
      <n-collapse-transition :show="isShow">
        <div class="code-container" v-show="isShow">
          <div class="code" v-html="html"></div>
        </div>
      </n-collapse-transition>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  margin-top: 10px;
  border-radius: 12px;

  &-content {
    padding: 24px;
    flex: 1;
  }

  &-action {
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--vp-c-gutter);

    a {
      font-size: 14px;
    }

    &-icon-group {
      display: flex;
      gap: 10px;
      align-items: center;

      .icon {
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
}

.code-container {
  border-top: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg-soft);
}

</style>