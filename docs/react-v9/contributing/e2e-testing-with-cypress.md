- [Introduction](#introduction)
  - [Recommended reading](#recommended-reading)
  - [Critical differences from Jest](#critical-differences-from-jest)
- [Running tests](#running-tests)
- [Writing tests](#writing-tests)
  - [Structure](#structure)
  - [Asserting](#asserting)
  - [Interacting with elements](#interacting-with-elements)
- [Debugging](#debugging)
  - [Debugging a flaky test](#debugging-a-flaky-test)
  - [Verifying that a test is reliable](#verifying-that-a-test-is-reliable)
- [Tips and common issues](#tips-and-common-issues)

## Introduction

Some scenarios, particularly those relating to focus management, cannot be realistically/reliably tested with jsdom. In these cases we use [Cypress](https://docs.cypress.io/) for testing with a real browser. ([See this page for other types of tests.](Testing))

On top of Cypress, we use [Cypress component testing](https://docs.cypress.io/guides/component-testing/introduction) with [`@cypress/react`](https://github.com/cypress-io/cypress/blob/master/npm/react/README.md) to enable directly mounting the components within the test file, rather than running tests against Storybook or some other URL.

We also use [`cypress-real-events`](https://github.com/dmtrKovalenko/cypress-real-events/blob/develop/README.md) in some cases to directly fire events using the Chrome dev tools protocol, which enables some additional event types beyond what Cypress provides and could be considered more realistic.

### Recommended reading

Cypress has excellent documentation. Rather than repeating everything here, it's recommended that you check out their introductions to some key topics:

- [High-level overview](https://docs.cypress.io/guides/overview/why-cypress)
- [How it compares to other testing tools](https://docs.cypress.io/guides/overview/key-differences)
- **[Introduction to testing with Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress) (highly recommended)**
  - Note that with Cypress component testing, we use `@cypress/react`'s `mount()` instead of `cy.visit()` (but most other things should be the same)
- **[Retry-ability](https://docs.cypress.io/guides/core-concepts/retry-ability) (highly recommended)**
- [Return values and aliases](https://docs.cypress.io/guides/core-concepts/variables-and-aliases)

### Critical differences from Jest

In a Jest test, each line inside the test runs immediately. If an assertion/matcher or any other part of the code fails, the test will immediately fail.

By contrast, Cypress commands are **[asynchronous](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous)**: the code inside your `it()` enqueues the commands to be run later, within the actual browser test environment. The link has some good examples of how this affects the way you write tests.

Most commands are also **[retry-able](https://docs.cypress.io/guides/core-concepts/retry-ability)**: they'll automatically re-run until they succeed (up to the timeout).

## Running tests

To start Cypress for a particular package, `cd` to the package folder and run `yarn e2e`. By default it will start an interactive test run in a browser; you can specify `--mode run` for a headless run like in CI.

(Implementation details: The `e2e` command is defined under `bin` in `scripts/package.json` so that it's available to all packages. It runs a [wrapper script](https://github.com/microsoft/fluentui/blob/master/scripts/cypress.js) that provides helpful options and mimics config extension.)

## Writing tests

### Structure

Tests are located as follows:

- v9: in the component package's `e2e` folder, `packages/react-<component>/e2e/<ComponentName>.e2e.tsx`

Within each file, the tests are structured similarly to Jest or Mocha using `describe()` and `it()`, with optional before/after hooks. Cypress also supports modifying test configuration (such as viewport size or retries) per `describe()` or `it()`. [More details on test structure and options here.](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Writing-tests)

Here's a very basic example of what a test might look like:

```tsx
import * as React from 'react';
import { mount } from '@cypress/react';
import { Sample } from './Sample';

describe('Sample', () => {
  it('opens the menu', () => {
    // Assume Sample contains a button "Open menu" which opens a menu
    mount(<Sample />);
    // Wait for the component to render (.contains() will retry until a matching element is found)
    // and click the button
    cy.contains('Open menu').click();
    // Verify that the menu opened (will retry until it succeeds or times out)
    cy.contains('Good option').should('exist');
  });
});
```

### Asserting

The assertion syntax in Cypress is a bit different than Jest. It uses [Chai-style assertions](https://docs.cypress.io/guides/references/assertions#BDD-Assertions), and most often, you'll write assertions with `.should()` due to the asynchronous nature of Cypress commands and their retry-ability.

Here are some example assertions. All the commands and assertions shown will retry until they succeed (up to the timeout).

```js
cy.get('#greeting').should('have.text', 'hello world');
cy.contains('hello world').should('exist');
cy.get('li.selected').should('have.length', 3);
cy.focused().should('have.text', 'click me');
```

You can find [more examples of common assertions here](https://docs.cypress.io/guides/references/assertions#Common-Assertions).

#### 🚨 Be careful about negative assertions!

Especially with the async/retried nature of Cypress commands, there are [many ways a negative assertion might pass when you don't expect it](https://docs.cypress.io/guides/references/assertions#Negative-assertions). It's best to only use negative assertions to verify that a specific condition is _no longer present_ after an action.

For example: suppose you're testing a menu and want to verify that an option is _not_ present. Since Cypress actions and assertions are run asynchronously, the code below could easily pass _even if the menu hasn't finished opening yet!_

```js
cy.contains('Button that opens menu').click();
cy.contains('Not an option').should('not.exist'); // is the menu even open yet? ¯\_(ツ)_/¯
```

Instead, you need to wait for the menu to open before testing that the option is absent:

```js
cy.contains('Button that opens menu').click();
cy.contains('Good option').should('exist'); // menu is open
cy.contains('Not an option').should('not.exist'); // and this option isn't included
```

On a similar note: if the component runs some kind of action after mount (such as FocusTrapZone bringing focus into the zone), verify that the action is finished and the initial expected state is present before starting interactions for the actual test.

### Interacting with elements

For interactions, you have a choice of [Cypress's built-in interaction methods](https://docs.cypress.io/guides/core-concepts/interacting-with-elements) or [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events/blob/develop/README.md). There are pros and cons to each of these approaches.

|                                          | Built-in                       | cypress-real-events                    |
| ---------------------------------------- | ------------------------------ | -------------------------------------- |
| Example APIs **(not a full list)**       | `cy.click()`, `cy.type()`, etc | `cy.realClick()`, `cy.realType()`, etc |
| Type of events fired                     | simulated                      | real (via Chrome dev tools protocol)   |
| Can press tab key                        | ❌                             | ✅                                     |
| Can hover                                | ❌                             | ✅                                     |
| Extra validation or user emulation steps | ✅                             | maybe                                  |

Generally we prefer using real events, but it's possible that you could run into a case where the [additional validation of Cypress's events](https://docs.cypress.io/guides/core-concepts/interacting-with-elements) could provide value: for example, verifying that the clicked element is visible or waiting for animation to finish.

## Debugging

If a test fails, start by looking at the actual state of the UI at the time of failure:

- In `open` mode, click on the name of the failed test, then click on individual steps
- In `run` (headless) mode, screenshots of failed tests are saved under `<pkg>/cypress/screenshots`

Cypress has a [full guide to debugging](https://docs.cypress.io/guides/guides/debugging), but a few tips are included below.

### Debugging a flaky test

Due to the asynchronous nature of Cypress, it's much easier to accidentally write flaky tests. Most of the issues have to do with timing. For example:

- If you forgot to ensure state of the page was as expected before acting, it might sometimes succeed or sometimes fail depending on timing.
- A test may succeed in a local run with `--mode open` (the default) but fail in `--mode run` in CI since the headless browser is faster and can expose timing issues.

Cypress's debugging guide has a whole section about [debugging flake](https://docs.cypress.io/guides/guides/debugging#Debugging-flake), but here are a few ideas to get started:

- Make sure you have assertions to verify that the UI is in the expected state before starting interactions (see [Asserting](#asserting) above)
- If the component runs an action on mount, verify that the action is finished before doing anything else
- Verify that the test doesn't somehow rely on state/other results of a previous test
  - One way this can happen is if you're reusing mutable variables between tests
- Also check out [tips and common issues](#tips-and-common-issues) below for more suggestions

### Verifying that a test is reliable

In CI, we run tests with 2 retries to help mitigate flakiness, but the team members will very much appreciate your due diligence to verify the test's reliability before check-in. 🙂

The easiest way to do this is to **temporarily** wrap the test in `Cypress._.times` and add `.only` to `describe` or `it`:

```ts
Cypress._.times(20, () => {
  describe.only('MyComponent', () => {
    it('does stuff', () => /* test code here */);
  });
});
```

Then try running in **both** `open` and `run` mode. Changing modes may reveal timing issues because the headless browser in `run` mode is faster.

If the number of test failures is very small, it might be okay to check in (and let the retries handle it), but please at least try to investigate what happened and get the test passing 100%.

## Tips and common issues

### Think like a user

When writing tests (or porting old tests), think about **how would a user view and interact with the component?** For example:

- Prefer querying by text or label rather than className
- Rather than manually calling `.focus()` on an element, prefer clicking it, or focusing and activating it with the keyboard

### Do NOT define test functions as `async`

Cypress [is not designed to support `async`/`await`](https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-use-the-new-ES7-async-await-syntax). In addition, due to a [longstanding bug](https://github.com/cypress-io/cypress/issues/4742), if a test function is accidentally defined with `async`, assertion failures within the function won't be detected, and the test will appear to succeed.

```ts
// ❌  assertion failures in this async function will not fail the test!
it('does stuff', async () => {});
// ✅  correct
it('does stuff', () => {});
```

### Verify that the UI is in the expected state before verifying something is absent

Mentioning this again because it's a very easy trap to fall into. [See "Asserting" above for details.](#asserting)

### `cy.contains()` returns an unexpected element

`cy.contains(text)` will match **substrings** within an element, which sometimes gives unexpected results. For example, if you have this HTML:

```html
<div>
  <label>a field <input type="text" /></label>
  <button>a</button>
</div>
```

If you want to get the button but you do `cy.contains('a')`, it will give you the label instead!

One way around this is to use more informative, specific text, but there's also `cy.contains(selector, text)` which allows narrowing by a CSS selector before looking for text: for example, `cy.contains('button', 'a')`.

### Be careful with local variables and asynchronous code

Since Cypress commands are enqueued synchronously but run asynchronously, be very careful about how you access things that you've saved in local variables within the test (or consider using a different pattern).

A common example is wrapping local variable access in `cy.then()` or `cy.should()` to ensure you get the latest value at runtime (not at the time the test's commands were enqueued).

<details><summary>click to expand example</summary>

```tsx
it('focuses a button incorrectly', () => {
  let focusButton = () => undefined;

  const TestCase = () => {
    // In the actual instance where this happened, the code needed to call a component's custom
    // imperative API. (If the goal is really just to focus a button, there are better ways to do it.)
    const buttonRef = React.useRef();
    React.useEffect(() => {
      focusButton = () => buttonRef.current?.focus();
    }, []);

    return <button ref={buttonRef}>hello</button>;
  };

  mount(<TestCase />);

  // ❌ this will NOT be set to the correct value yet, because the component hasn't rendered!
  focusButton();
  // ❌ fails
  cy.focused().should('have.text', 'hello');

  cy.contains('hello').then(() => {
    // ✅ button has rendered
    focusButton();
  });
  // ✅ succeeds
  cy.focused().should('have.text', 'hello');
});
```

</details>

### Testing that nothing is focused

Use `cy.focused().should('not.exist')`, NOT an assertion about `body`. Even though `document.activeElement` is probably `body` in that case, Cypress gets the focused element using `:focus`, which never goes to `body`.

### Waiting

Cypress does provide a `cy.wait(ms)` method, but it's best if you can think of an actual UI condition to wait for instead.
