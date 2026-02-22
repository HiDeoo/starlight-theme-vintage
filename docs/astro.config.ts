import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeVintage from 'starlight-theme-vintage'

const site =
  (process.env['CONTEXT'] === 'production' ? process.env['URL'] : process.env['DEPLOY_PRIME_URL']) ??
  'https://telephony-investigated-background-kingdom.trycloudflare.com/'

export default defineConfig({
  integrations: [
    starlight({
      credits: true,
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-theme-vintage/edit/main/docs/',
      },
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: new URL('og.jpg', site).href },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'Starlight theme heavily inspired by the timeless design of the legacy Astro documentation.',
          },
        },
      ],
      plugins: [starlightThemeVintage()],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started', 'customization'],
        },
        {
          label: 'Resources',
          items: [{ label: 'Plugins and Tools', link: '/resources/starlight/' }],
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
      ],
      social: [
        {
          href: 'https://bsky.app/profile/hideoo.dev',
          icon: 'blueSky',
          label: 'Bluesky',
        },
        {
          href: 'https://github.com/HiDeoo/starlight-theme-vintage',
          icon: 'github',
          label: 'GitHub',
        },
      ],
      title: 'Starlight Vintage',
    }),
  ],
  site,
})
