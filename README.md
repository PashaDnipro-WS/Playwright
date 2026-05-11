# Redmine Playwright Tests

Automated E2E tests for [Redmine](https://www.redmine.org/)

---

# Project Structure

```txt
data/           test data
docs/           test cases documentation
e2e/            test specifications
e2e/setup/      authentication setup for saved session
fixtures/       custom Playwright fixtures
pages/          page objects
sections/       reusable page sections/components
utils/          helper functions and URLs
```

---

# Test Cases

Test cases are available in the `docs` folder:

- `redmine_test_cases.xlsx`

---

# Test Groups

Tests are divided into several groups:

- **Public tests**  
  Tests that do not require authorization.

- **Login test**  
  Manual/local login flow validation.

- **Authenticated tests**  
  Tests that require an authorized session.

- **Setup test**  
  Creates and saves the authentication state for authenticated tests.

---

# Tags Used in the Project

| Tag | Description |
|---|---|
| `@setup` | Authentication state creation |
| `@login` | Login flow validation |
| `@auth` | Authorized tests |

---

# Authentication Approach

Redmine requires 2FA confirmation during login. Because of this limitation, authenticated tests cannot be fully executed in GitHub Actions without manual confirmation.

The project uses local environment variables for credentials:

```env

LOGIN
PASSWORD
```

The `@setup` test:

1. Logs in with valid credentials
2. Saves the browser session into:

```txt
playwright/.auth/user.json
```

Authenticated tests then reuse this session through `storageState`.

The `@login` test validates the login flow separately and does not generate a saved session.

> **Note:**  
> 2FA could not be disabled because the website requires additional verification during authentication.  
> Due to this limitation, authorized tests are intended for local execution only.

---

# Running Tests Locally

## Run public tests

```bash
npx playwright test --grep-invert "@setup|@login|@auth"
```

---

## Run login test manually

```bash
npx playwright test --grep "@login" --headed
```

---

## Run authentication setup

```bash
npx playwright test --grep "@setup" --headed
```

---

## Run authenticated tests after setup

```bash
npx playwright test --grep "@auth"
```

---

## Run tests in Playwright UI mode

```bash
npx playwright test --ui
```

---

# CI Pipeline

Because Redmine requires 2FA authentication, CI executes only public tests:

```bash
npx playwright test --grep-invert "@setup|@login|@auth"
```

>Authenticated and login tests are intended for local execution.

---

# Allure Report

The Allure report is automatically published through GitHub Pages.

## Report Link

[allure-report](https://pashadnipro-ws.github.io/Playwright/)

---