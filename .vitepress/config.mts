import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { setupContainerDemo } from './container/demo'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Norm Fetch使用文档',
  description: 'Norm Axios 是一个基于 Axios 的约定式请求库',
  cleanUrls: true,
  markdown: {
    theme: {
      dark: 'github-dark',
      light: 'github-light',
    },
    async config(md) {
      setupContainerDemo(md)
    },
    lineNumbers: true,
  },
  vite: {
    server: {
      hmr: true,
    },
    plugins: [
      UnoCSS(),
    ],
  },
  themeConfig: {
    logo: '/assets/images/logo.png',
    darkModeSwitchLabel: '主题',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言',
    sidebarMenuLabel: '目录',
    skipToContentLabel: '跳转到内容',
    notFound: {
      linkLabel: '首页',
      linkText: '🔙 返回地球（主页）',
      title: '🚀 “Oops！页面被外星人劫持了…”\n',
      quote: '我们派出的星际侦察队确认，该页面已被外星人打包带走，理由可能是‘地球网页设计太好看，值得学习',
    },
    outline: {
      label: '页面导航',
    },
    docFooter: {
      next: '下一页',
      prev: '上一页',
    },
    nav: [
      {
        text: '文档',
        link: '/document/start/introduction',
        activeMatch: '^/document/',
      },
      {
        text: ' API参考',
        link: '/api-reference/common-type/home',
        activeMatch: '^/api-reference/',
      },
      {
        text: ' 最佳实践',
        link: '/frontEndGuide/start/introduction',
        activeMatch: '^/document/',
      },
    ],

    sidebar: {
      '/document': [
        {
          text: '开始',
          base: '/document/start',
          items: [
            { text: '介绍', link: '/introduction' },
            { text: '快速上手', link: '/start-quickly' },
          ],
        },
        {
          text: '约定式请求',
          base: '/document/norm-axios',
          items: [
            { text: '教程', link: '/home' },
            { text: '元数据', link: '/meta' },
          ],
        },
        {
          text: 'use-request',
          base: '/document/use-request',
          items: [
            { text: '介绍', link: '/introduction' },
            { text: '基础用法', link: '/basic-usage' },
          ],
        },
      ],
      '/api-reference': [
        {
          text: '通用类型',
          link: '/api-reference/common-type/home',
        },
        {
          text: 'NormAxios',
          link: '/api-reference/norm-axios/home',
        },
        {
          text: 'hooks',
          base: '/api-reference/hooks',
          items: [
            {
              text: 'useRequest',
              link: '/use-request/home',
            },
            {
              text: 'usePagination',
              link: '/use-pagination/home',
            },
            {
              text: 'useGlobalConfigProvider',
              link: '/use-global-config-provider/home',
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/songpeng154/Norm-fetch.git' },
    ],
  },
})
