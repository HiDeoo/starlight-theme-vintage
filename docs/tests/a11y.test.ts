import { expect, getAllUrls, getColorSchemes, test } from './test-utils'

const urls = getAllUrls()
const colorSchemes = getColorSchemes()

for (const url of urls) {
  const { pathname } = new URL(url)

  for (const colorScheme of colorSchemes) {
    test(`does not report accessibility violations: ${pathname} - ${colorScheme}`, async ({ docsSite }) => {
      let violationsCount = 0

      const violations = await docsSite.testPage(url, colorScheme)

      if (violations.length > 0) {
        violationsCount += violations.length
      }

      await docsSite.reportPageViolations(violations, colorScheme)

      expect(
        violationsCount,
        `Found ${violationsCount} accessibility violations. Check the errors above for more details.`,
      ).toBe(0)
    })
  }
}
