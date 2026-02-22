import { expect, test } from './test-utils'

test('does not report accessibility violations on the docs site', async ({ docsSite }) => {
  let violationsCount = 0

  for (const colorScheme of docsSite.getColorSchemes()) {
    for (const url of docsSite.getAllUrls()) {
      const violations = await docsSite.testPage(url, colorScheme)

      if (violations.length > 0) {
        violationsCount += violations.length
      }

      await docsSite.reportPageViolations(violations, colorScheme)
    }
  }

  expect(
    violationsCount,
    `Found ${violationsCount} accessibility violations. Check the errors above for more details.`,
  ).toBe(0)
})
