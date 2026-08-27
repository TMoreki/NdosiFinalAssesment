# Ndosi Final Assessment – Playwright Automation Framework

A **TypeScript + Playwright** test automation framework covering UI and API testing for the [Automation Exercise](https://automationexercise.com) site.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Reports](#reports)
- [CI/CD Pipeline](#cicd-pipeline)
- [GitHub Secrets](#github-secrets)
- [Screenshots](#screenshots)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & API testing |
| TypeScript | Strongly-typed test code |
| Allure | Rich HTML test reports |
| GitHub Actions | CI/CD pipeline & scheduled runs |

---

## Project Structure

```
NdosiFinalAssesment/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI pipeline (push + daily midnight SAST)
├── fixtures/
│   ├── avatar.png                  # Test profile picture (auto-generated)
│   └── create-avatar.ts            # Script to generate avatar.png
├── src/
│   ├── data/
│   │   ├── PlaywrightTests.csv     # CSV test data
│   │   └── Testdata.ts             # Centralised test data
│   ├── fixtures/
│   │   └── CustomFixtures.ts       # Extended Playwright fixtures (page objects)
│   ├── pages/
│   │   ├── BasePage.ts             # Shared page utilities
│   │   ├── LoginPage.ts            # Login page object
│   │   └── ProfilePage.ts          # Profile page object
│   └── utils/
│       └── CsvReader.ts            # CSV file reader utility
├── tests/
│   ├── profile.spec.ts             # UI test: login → upload profile picture
│   └── api.spec.ts                 # API tests: validate response codes
├── test-results/                   # Screenshots captured during test run
├── allure-results/                 # Raw Allure data
├── allure-report/                  # Generated Allure HTML report
├── playwright-report/              # Playwright built-in HTML report
├── .env                            # Local credentials (not committed)
├── .env.example                    # Credential template
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## Prerequisites

- Node.js **v20+**
- npm **v9+**
- Git

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/NdosiFinalAssesment.git
cd NdosiFinalAssesment

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install --with-deps chromium

# 4. Configure credentials
cp .env.example .env
# Edit .env and fill in USER_EMAIL and USER_PASSWORD

# 5. Generate the avatar fixture
node fixtures/create-avatar.js
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Open Playwright HTML report after a run
npx playwright show-report

# Generate and open Allure report
npm run report
```

---

## Test Coverage

### UI Tests (`tests/ui/profile.spec.ts`)

| Step | Action | Assertion |
|---|---|---|
| 1 | Navigate to `/login` | Page loads |
| 2 | Login with credentials | "Logged in as" text visible |
| 3 | Navigate to My Account | Account page loads |
| 4 | Click Edit Profile | Edit form visible |
| 5 | Upload `avatar.png` | File input populated |
| 6 | Save profile | "Account Updated!" confirmation visible |

Screenshots are captured at every step and saved to `test-results/`.

### API Tests (`tests/api/profile-api.spec.ts`)

| Endpoint | Method | Expected Response |
|---|---|---|
| `/api/productsList` | GET | HTTP 200 |
| `/api/verifyLogin` | POST (valid) | HTTP 200, `responseCode: 200` |
| `/api/verifyLogin` | POST (invalid) | HTTP 200, `responseCode: 404` |
| `/api/getUserDetailByEmail` | GET | HTTP 200, `responseCode: 200` |
| `/api/updateAccount` | PUT | HTTP 200, `responseCode: 200` |
| `/api/deleteAccount` | DELETE | HTTP 200 |

---

## Reports

### Playwright HTML Report

Auto-generated after every run at `playwright-report/index.html`.

```bash
npx playwright show-report
```

### Allure Report

```bash
npm run report
```

The Allure report is also published to **GitHub Pages** on every push to `main`:

```
https://<your-username>.github.io/<repo-name>/allure-report/
```

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/playwright.yml`) triggers on:

| Trigger | When |
|---|---|
| `push` | Every push to `main` |
| `pull_request` | Every PR targeting `main` |
| `schedule` | **Daily at midnight SAST** (22:00 UTC = 00:00 UTC+2) |
| `workflow_dispatch` | Manual trigger from GitHub UI |

### Pipeline Steps

1. Checkout code
2. Setup Node.js 20
3. `npm ci` – install dependencies
4. Install Chromium browser
5. Generate avatar fixture
6. Run UI tests → upload screenshots & report artifacts
7. Run API tests → upload report artifacts
8. Generate Allure HTML report
9. Publish Allure report to GitHub Pages (main branch only)

### Artifacts Published

Every pipeline run uploads:
- `playwright-report` – Playwright HTML report
- `allure-results` – Raw Allure data
- `allure-report` – Allure HTML report
- `screenshots` – Step-by-step PNG screenshots

---

## GitHub Secrets

Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `BASE_URL` | `https://automationexercise.com` |
| `USER_EMAIL` | Your test account email |
| `USER_PASSWORD` | Your test account password |

---

## Screenshots

Screenshots are captured at each UI test step and uploaded as pipeline artifacts.

| Step | File |
|---|---|
| Login page | `test-results/01-login-page.png` |
| Logged in | `test-results/02-logged-in.png` |
| My Account | `test-results/03-my-account.png` |
| Edit Profile | `test-results/04-edit-profile.png` |
| Picture selected | `test-results/05-picture-selected.png` |
| Profile updated | `test-results/06-profile-updated.png` |

Download them from the **Actions → your run → Artifacts → screenshots** section on GitHub.

---

## Author

Tlotlegi Moreki – Ndosi Final Assessment
