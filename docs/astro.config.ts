import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeVintage from 'starlight-theme-vintage'

// TODO(HiDeoo) public/favicon
// TODO(HiDeoo) public/og
const site =
  (process.env['CONTEXT'] === 'production' ? process.env['URL'] : process.env['DEPLOY_PRIME_URL']) ??
  'https://starlight-theme-vintage.netlify.app/'

export default defineConfig({
  integrations: [
    starlight({
      locales: {
        root: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
      credits: true,
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-theme-vintage/edit/main/docs/',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            // TODO(HiDeoo)
            content: new URL('og.jpg', site).href,
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: '// TODO(HiDeoo)',
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
