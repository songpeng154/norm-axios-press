import { defineConfig } from 'vitepress'
import { setupContainerDemo } from "./container/demo";
import UnoCSS from 'unocss/vite'
export default defineConfig({
    lang: 'zh-CN',
    title: 'Norm Fetch使用文档',
    description: 'Norm Fetch 是一个基于 Axios 的约定式请求库',
    cleanUrls: true,
    markdown: {
        theme:{
            dark:'github-dark',
            light:'github-light'
        },
        async config(md) {
            setupContainerDemo(md)
        },
        lineNumbers: true
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
                link: '/introduction'
            },
            {
                text: ' API参考',
                link: '/frontEndGuide/start/introduction',
            },
            {
                text: ' 最佳实践',
                link: '/frontEndGuide/start/introduction',
            }
        ],

        sidebar: {
            '/frontEndGuide': [
                {
                    text: '开始',
                    base: '/frontEndGuide/start',
                    items: [
                        { text: '介绍', link: '/introduction' },
                        { text: '快速上手', link: '/getStartedQuickly' }
                    ]
                },
                {
                    text: '基础',
                    base: '/frontEndGuide/basis',
                    items: [
                        { text: '环境配置', link: '/envConfig' },
                        { text: '服务请求 & 数据模拟Fake', link: '/serviceRequest' },
                        { text: '路由&菜单', link: '/routeAndMenu' },
                        { text: '权限控制', link: '/auth' },
                        { text: '浏览器缓存', link: '/localCache' },
                        { text: '主题', link: '/theme' },
                    ]
                },
                {
                    text: '功能',
                    base: '/frontEndGuide/function',
                    items: [
                        { text: '图标', link: '/icon' },
                        { text: '表单', link: '/form' },
                    ]
                }
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/songpeng154/Norm-fetch.git' }
        ]
    }
})
