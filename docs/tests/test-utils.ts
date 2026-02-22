import { test as baseTest, type Page } from '@playwright/test'
import { DefaultTerminalReporter, getViolations, injectAxe, reportViolations } from 'axe-playwright'

export { expect, type Locator } from '@playwright/test'

const config: Config = {
  axe: {
    // https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag21a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'],
    },
  },
  colorSchemes: ['light', 'dark'],
  // List of slugs to test.
  paths: ['/examples/kitchen-sink/'],
  // The base URL of the preview server to test against.
  url: 'http://localhost:4321',
}

process.env['ASTRO_TELEMETRY_DISABLED'] = 'true'
process.env['ASTRO_DISABLE_UPDATE_CHECK'] = 'true'

export const test = baseTest.extend<{
  docsSite: DocsSite
}>({
  docsSite: async ({ page }, use) => use(new DocsSite(page)),
})

// A Playwright test fixture accessible from within all tests.
class DocsSite {
  constructor(private readonly page: Page) {}

  getAllUrls() {
    return config.paths.map((path) => config.url + path)
  }

  getColorSchemes() {
    return config.colorSchemes
  }

  async testPage(url: string, colorScheme: ColorScheme) {
    await this.page.emulateMedia({ colorScheme })
    await this.page.goto(url)
    await injectAxe(this.page)
    await this.page.waitForLoadState('networkidle')
    return getViolations(this.page, undefined, config.axe)
  }

  async reportPageViolations(violations: Awaited<ReturnType<typeof this.testPage>>, colorScheme: ColorScheme) {
    const url = this.page.url().replace(config.url, '')

    if (violations.length > 0) {
      console.error(`> Found ${violations.length} violations on ${url} (theme: ${colorScheme})\n`)
      await reportViolations(violations, new DefaultTerminalReporter(true, true, false))
      console.error('\n')
    } else {
      // eslint-disable-next-line no-console
      console.info(`> Found no violations on ${url} (theme: ${colorScheme})`)
    }
  }
}

interface Config {
  axe: Parameters<typeof getViolations>[2]
  colorSchemes: ColorScheme[]
  paths: string[]
  url: string
}

type ColorScheme = NonNullable<NonNullable<Parameters<Page['emulateMedia']>[0]>['colorScheme']>
