import type { StarlightPlugin } from '@astrojs/starlight/types'

import { overrideComponents } from './libs/starlight'

export default function starlightThemeRapidePlugin(): StarlightPlugin {
  return {
    name: 'starlight-theme-rapide',
    hooks: {
      'config:setup'({ config, logger, updateConfig }) {
        const userExpressiveCodeConfig =
          !config.expressiveCode || config.expressiveCode === true ? {} : config.expressiveCode

        updateConfig({
          components: overrideComponents(config, ['ThemeSelect'], logger),
          customCss: [
            ...(config.customCss ?? []),
            'starlight-theme-vintage/styles/layers',
            'starlight-theme-vintage/styles/theme',
            'starlight-theme-vintage/styles/base',
            ...(config.markdown?.headingLinks === false ? [] : ['starlight-theme-vintage/styles/anchors']),
          ],
          expressiveCode:
            config.expressiveCode === false
              ? false
              : {
                  themes: ['github-dark-default', 'github-light-default'],
                  ...userExpressiveCodeConfig,
                  styleOverrides: {
                    borderColor: 'var(--sl-vintage-ui-border-color)',
                    borderWidth: 'var(--sl-vintage-ui-border-width)',
                    ...userExpressiveCodeConfig.styleOverrides,
                    frames: {
                      editorActiveTabBackground: 'var(--sl-vintage-ec-editor-tab-bar-bg-color)',
                      editorActiveTabIndicatorTopColor: 'transparent',
                      editorActiveTabIndicatorBottomColor: 'var(--sl-color-gray-5)',
                      editorBackground: 'var(--sl-vintage-ui-bg-color)',
                      editorTabBarBackground: 'var(--sl-vintage-ec-editor-tab-bar-bg-color)',
                      editorTabBarBorderBottomColor: 'var(--sl-vintage-ec-editor-tab-bar-border-color)',
                      frameBoxShadowCssValue: 'none',
                      inlineButtonBackground: 'var(--sl-color-gray-5)',
                      inlineButtonBackgroundHoverOrFocusOpacity: '0.4',
                      inlineButtonBorder: 'var(--sl-vintage-ec-inline-button-border-color)',
                      inlineButtonBorderOpacity: '1',
                      terminalBackground: 'var(--sl-vintage-ui-bg-color)',
                      terminalTitlebarBackground: 'var(--sl-vintage-ec-editor-tab-bar-bg-color)',
                      terminalTitlebarBorderBottomColor: 'var(--sl-vintage-ec-editor-tab-bar-border-color)',
                      terminalTitlebarDotsForeground: 'var(--sl-vintage-ec-terminal-titlebar-dots-color)',
                      terminalTitlebarDotsOpacity: '1',
                      terminalTitlebarForeground: 'var(--sl-color-gray-2)',
                      ...userExpressiveCodeConfig.styleOverrides?.frames,
                    },
                    textMarkers: {
                      backgroundOpacity: '0.35',
                      markBackground: 'var(--sl-vintage-ec-marker-bg-color)',
                      markBorderColor: 'var(--sl-vintage-ec-marker-border-color)',
                      ...userExpressiveCodeConfig.styleOverrides?.textMarkers,
                    },
                  },
                },
        })
      },
    },
  }
}
