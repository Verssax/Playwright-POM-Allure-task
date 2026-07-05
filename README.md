# redmine-playwright

This is a project for web automation testing of the [Redmine](https://www.redmine.org/) website, built using **TypeScript** and **Playwright**.

On the architecture side, the project follows the **Page Object Model (POM)** pattern. Each page (`login.page.ts`, `main.page.ts`, `registration.page.ts`) extends a shared `base.page.ts`, and locators are exposed as getters while action methods (fill, click, submit) live in the page classes. Reusable UI parts that appear across pages (like the site header) are extracted into their own components under `pages/components`. Test data is generated randomly per run using `@faker-js/faker`, and expected error messages are kept in a single source of truth (`errMessageTexts.ts`) instead of being duplicated across specs.

The project currently covers two areas:
- **Login page** — invalid credentials handling and the "Lost password" flow.
- **Registration page** — empty-field validation, short password validation, and invalid email format validation.

## Requirements

- [Node.js](https://nodejs.org/en/) version 20 or higher.
- npm (comes bundled with Node.js).
- Git, to clone the repository.

## Installing

These instructions will help you get the project running on your local machine.

1. Clone the repository:

```
git clone <your-repo-url>
```

> **Note**
> The project will be cloned into whichever folder your terminal is currently pointed at. Navigate to your desired location first using `cd`.

2. Navigate into the project folder and open it in your code editor of choice (e.g. Visual Studio Code).

3. Open a terminal in the project root (in VS Code: **Ctrl + Shift + `**) and install all dependencies:

```
npm install
```

This installs `@playwright/test`, `@faker-js/faker`, `allure-playwright`, `allure-commandline`, and the Playwright browser binaries' driver packages.

4. Install the Playwright browsers themselves:

```
npx playwright install
```

## How to run the tests

- Run all tests in headless mode:

```
npm test
```

- Run all tests in headed mode (visible browser):

```
npm run test:headed
```

- Run tests in Playwright's interactive UI mode:

```
npm run test:ui
```

- Run tests against a single browser only:

```
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

- Run a single spec file directly:

```
npx playwright test Login.spec.ts
```

## How to generate the report

This project uses **Allure** for reporting.

1. Run the tests first (this produces raw results in `allure-results/`):

```
npm test
```

2. Generate the Allure HTML report from those results:

```
npm run report:generate
```

3. Open the generated report in your browser:

```
npm run report:open
```

Or run all three steps in one go:

```
npm run test:report
```

> **Note**
> Playwright's built-in HTML reporter is also enabled (see `playwright.config.ts`). You can open that one separately with `npx playwright show-report`.

## Project structure

```
├── pages/
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── main.page.ts
│   ├── registration.page.ts
│   ├── components/
│   │   ├── header.ts
│   │   └── testData/
│   │       └── errMessageTexts.ts
│   └── helpers/
│       └── user_generator.ts
├── tests/
│   ├── Login.spec.ts
│   └── register.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Built with

- [TypeScript](https://www.typescriptlang.org/) — strongly typed superset of JavaScript used for this project.
- [Playwright](https://playwright.dev/) — cross-browser, cross-platform testing framework.
- [@faker-js/faker](https://fakerjs.dev/) — random test data generation.
- [Allure](https://allurereport.org/) — test reporting.
