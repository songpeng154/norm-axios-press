import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from '../components/Demo.vue'
import 'virtual:uno.css'
import './style.css'
import Layout from '../components/Layout.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Demo)
  },
} satisfies Theme
