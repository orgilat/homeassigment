

## 1. Overview

This repository contains manual and automated tests for [**https://automationintesting.online/**](https://automationintesting.online/):

* **API tests** exercise the `Rooms` endpoint (`GET`, `POST`, `DELETE`).

* **UI tests** are fully automated, covering Navigation, Contact Form, and Full Booking Flow with 100% implementation (see Coverage Matrix for details).

* **Allure** generates a rich HTML report; three attached screenshots illustrate key outcomes.

---

## 2. Prerequisites & Versions

* **Node.js** v18+ (LTS)
* **npm** v9+
* **Playwright** v1.35+ (`npx playwright install --with-deps`)
* **Allure CLI**:

  ```bash
  npm install -g allure-commandline
  ```

---

## 3. Installation

```bash
# 1. Clone the repo
git clone https://github.com/orgilat/homeassigment.git
cd homeassigment

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install --with-deps
```

---

## 4. Local Execution

```bash
# Run API & UI tests\ npx playwright test

# Generate Allure report\ npx allure generate allure-results --clean -o allure-report

# Open the report\ npx allure open allure-report
```

> **Windows users:** I’ve provided a quick-run batch file (`AllureReport.bat`) so you can generate and view the report with a double-click.

---

## 5. Test Documentation (Excel Workbook)

File: `Complete_Testing_Documentation_Or_gilat.xlsx` contains the following four sheets:

* API Manual Test Cases
* UI Manual Test Cases
* Bug Reports
* Coverage Matrix

---

## 6. CI Pipeline Behavior

On every push or PR to `main`, GitHub Actions will:

1. Checkout code & install dependencies (`npm ci`).
2. Install Playwright browsers (`npx playwright install --with-deps`).
3. Run all tests (`npx playwright test`).
4. Generate Allure report (`npx allure generate allure-results --clean -o allure-report`).
5. Upload `allure-report/` as an artifact.

---

## 7. Technologies & Extras

* **Global Setup**: `global-setup.ts` logs into the admin panel and saves `storageState.json` for UI tests.

* **Logging**: Winston configured only in the Page Object Model classes for structured, leveled logs.

* **API Client Utilities**: `helpers/apiClients/roomApiClient.ts` defines `RoomApi` using Playwright's `request`, `APIRequestContext`, and `expect` imports from `@playwright/test` for streamlined REST calls.

* **Page Object Model**: Reusable classes in `tests/pages/`.

* **Reporting**: Allure captures steps, traces, and the following screenshots located in `screenshots/`:

  * `screenshot1-main-dashboard.png`
  * `screenshot2-fail-test.png`
  * `screenshot3-suites.png`

---

## 8. Testing Scope & Summary

* **API**: Covers `GET`, `POST`, `DELETE` for Rooms.
* **UI**: Validates Navigation, Contact Form, and Full Booking Flow.

**Results:** 23 of 24 automated tests passed; one failure revealed a valid bug (Amenities button scroll issue).

Further automation can be added upon request.
