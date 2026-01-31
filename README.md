# ITPM Assignment

This project contains automated tests using [Playwright](https://playwright.dev/) for browser-based testing.

## Project Structure

- `package.json` — Project dependencies and scripts
- `playwright.config.js` — Playwright configuration
- `tests/` — Test specifications
    - `example.spec.js` — Example test file
    - `swifttranslator.spec.js` — Swift Translator test file
- `test-results/` — Test result outputs and error contexts
- `playwright-report/` — Playwright HTML reports and data

## Setup Instructions

1. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed.

   Open a terminal in the project directory and run:
   ```bash
   npm install
   ```

2. **Run Tests**

   To execute all Playwright tests:
   ```bash
   npx playwright test
   ```

   To run a specific test file:
   ```bash
   npx playwright test tests/example.spec.js
   ```

3. **View Test Reports**

   After running tests, view the HTML report:
   ```bash
   npx playwright show-report
   ```
   Or open `playwright-report/index.html` in your browser.

## Additional Notes

- Test results and error contexts are saved in the `test-results/` folder.
- Playwright reports are generated in the `playwright-report/` folder.
- You can customize Playwright settings in `playwright.config.js`.

## Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Node.js Download](https://nodejs.org/)

---

For any issues, please check the error context files in `test-results/` or consult the Playwright documentation.