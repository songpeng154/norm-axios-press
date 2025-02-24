<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { NConfigProvider,NNotificationProvider,NLoadingBarProvider,NMessageProvider,NModalProvider,NDialogProvider, darkTheme } from 'naive-ui'
import { useData } from 'vitepress'

const { isDark } = useData()
const { Layout } = DefaultTheme

</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme:null">
    <n-notification-provider>
      <n-loading-bar-provider>
        <n-message-provider>
          <n-dialog-provider>
            <n-modal-provider>
              <layout></layout>
            </n-modal-provider>
          </n-dialog-provider>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">

</style>