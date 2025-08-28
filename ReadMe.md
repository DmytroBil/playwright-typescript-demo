# Playwright Test Automation Project

# Prerequisites
- Node.js

# Setup
1. Clone the repository
   git clone <your-repo-url>
   cd <your-repo-folder>

2. Install dependencies
   npm install

3. Install Playwright browsers
   npx playwright install

# Running Tests
- Run all tests
  npx playwright test

- Run tests in headed mode (with browser UI):
  npx playwright test --headed

- Run a specific test by its title:
  npx playwright test -g "user can login successfully"
  npx playwright test -g "shows error on invalid login"
  npx playwright test -g "add two products to cart"
  npx playwright test -g "checkout flow completes successfully"
  npx playwright test -g "sort products by price"

- Run in a specific browser:
  npx playwright test --project=chromium
  npx playwright test --project=firefox (if needed must be enabled in playwright.config.ts)

# Viewing HTML Report
After running tests, generate and open the HTML report with:
npx playwright show-report

# Notes
Environment variables such as username, password, and base URL are stored in .env.test