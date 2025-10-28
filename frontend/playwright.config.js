import { defineConfig, devices } from "@playwright/test";

/**
 * Set PLAYWRIGHT_VIEW=true to run Playwright in visible "view" mode:
 * Example:
 *   PLAYWRIGHT_VIEW=true npx playwright test
 */
const isView = process.env.PLAYWRIGHT_VIEW === "true";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // When view mode is active run a single worker so tests are easy to watch;
  // otherwise preserve default workers (CI forces 1).
  workers: isView ? 1 : process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    // Default to headless true for normal automated runs; flip to false in view mode.
    headless: isView ? false : true,
    // Only enable slowMo when view mode is active so test execution is watchable.
    ...(isView ? { slowMo: 200 } : {}),
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
