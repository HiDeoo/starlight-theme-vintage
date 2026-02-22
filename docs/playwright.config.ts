import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  forbidOnly: !!process.env['CI'],
  projects: [
    {
      name: 'Chrome Stable',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
  ],
  webServer: [
    {
      command: 'pnpm run build && pnpm run preview',
      reuseExistingServer: !process.env['CI'],
      stdout: 'pipe',
      url: 'http://localhost:4321',
    },
  ],
  workers: 1,
})
