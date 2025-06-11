import { defineConfig } from 'vitepress'
import { restrictAccess } from './plugins/restrict-access'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vitepressWebsite",
  description: "test",
   head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'script',
      { id: 'register-sw' },
      `;(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
        }
      })()`
    ]
  ],
  vite: {
    plugins: [
      restrictAccess()
    ]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Runtime API Examples', 
            collapsed: true, 
            items: [
            {
              text: 'test', 
              collapsed: true,
              items: [
                { text: 'multi', link: 'file'}
              ]
            }
          ] }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
