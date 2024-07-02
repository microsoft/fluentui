> 🚨🚨 **This page is primarily about `@fluentui/react-components` ("v9") and `@fluentui/react` ("v8") and related packages.** 🚨🚨&nbsp; [See this page for `@fluentui/react-northstar` ("v0").](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/test-a-feature.md)

## Overview

Fluent UI's unit, functional, and snapshot tests are built using [Jest](https://jestjs.io/). This allows us to run tests in a Node environment but simulates the browser using [jsdom](https://github.com/jsdom/jsdom). ([See this page for other types of tests.](Testing))

We use various libraries on top of Jest for rendering and interacting with React components:

- New tests should use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- Legacy tests may also use:
  - [Enzyme](https://enzymejs.github.io/enzyme/) -- **not allowed in new tests**
  - [react-test-renderer](https://reactjs.org/docs/test-renderer.html), primarily for snapshot testing _(snapshots are discouraged in new tests)_

## Running tests

Our Jest setup generally require that packages be built before testing, so before running tests the first time, you should run `yarn build --to my-package` from the repo root.

To run the tests for one package, `cd` to that package and then run `yarn test`.

To run an individual test (or technically any tests with a path matching this substring), `cd` to the relevant package and run `yarn jest MyTestName`.

(You can also run tests for the whole repo by running `yarn test` at the repo root. This will build beforehand if needed.)

## Running tests in watch mode

When you are developing tests, use the watch mode to run the tests as you write them!

1. Go to the package folder where you want to run the tests.
2. The start command varies by library: for v8, `yarn start-test`, or for v9, `yarn test --watch`
3. Edit and saving tests should now cause the console to re-run the tests you have added/modified.

### Debugging

The repo includes launch configurations for debugging tests using Visual Studio Code. (You could also configure debugging in another editor of your choice.)

1. Set breakpoints in the test file (`*.test.ts` or `*.test.tsx`)
2. Open the **Run** (debugger) pane in the sidebar and choose the configuration you want: usually **Debug current open test** to run only the current open test, or **Debug test** to run all tests for the package the current file is in
3. Start debugging

## Jest basics

Tests in Jest are written similarly to Mocha tests, though Jest includes a number of assertions that work similarly to Chai. (If you've never used either of those, don't worry about it!)

- If you're new to Jest, start with the [introduction and guides](https://jestjs.io/docs/using-matchers)
- [Jest API reference](https://jestjs.io/docs/api)
  - [Available `expect` matchers](https://jestjs.io/docs/expect)
  - [Mock functions](https://jestjs.io/docs/mock-function-api)
  - [The `jest` object](https://jestjs.io/docs/jest-object) including fake timer APIs ([more info](https://jestjs.io/docs/timer-mocks))

Note that you do not need to import the assertions or the Jest APIs; they should be available automatically through the included typings.

A basic test example:

```ts
describe('thing', () => {
  it('does something', () => {
    expect(thing()).toEqual(aValue);
  });
});
```

## Testing components

In cases where you need to automate a component and validate it performs correctly, you can use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to mount components, evaluate DOM structure, and simulate events.

Here's a very basic example of what a test might look like (we'll go over this in more detail later):

```tsx
const onClick = jest.fn();
const { getByRole } = render(<Button onClick={onClick}>This is a button</Button>);

userEvent.click(getByRole('button'));
expect(onClick).toHaveBeenCalled();
```

### Philosophy

The [guide on migrating from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme/) nicely sums up Testing Library's philosophy, and how it differs from the way tests tended to be written with Enzyme:

> The primary purpose of React Testing Library is to increase confidence in your tests by **testing your components in the way a user would use them.** Users don't care what happens behind the scenes, they just see and interact with the output. Instead of accessing the components' internal APIs or evaluating their state, you'll get more confidence by writing your tests based on the component output.

Some examples of this philosophy:

- Prefer [finding elements like a user would](https://testing-library.com/docs/queries/about/#priority) (by role, label, or text) rather than relying on `className`, `id`, or DOM structure. This approach helps encourage writing UI that's accessible to all users.
- Prefer interact with elements the way the user would, by clicking or using the keyboard, rather than using imperative APIs.
  - [`@testing-library/user-event`](https://testing-library.com/docs/ecosystem-user-event/) more realistically simulates the full sequence of events that occur during user interaction.

Testing Library's APIs also make it _easier_ to write realistic, user-focused tests compared to Enzyme.

### Recommended reading

This page will only go into basics of using Testing Library (and some [common pitfalls](#tips-and-faq)).

For a more detailed run-through of how to write tests, check out this [tutorial](https://www.robinwieruch.de/react-testing-library/) recommended in Testing Library's docs. (One difference: we typically use the queries returned by `render()`, rather than the global queries from `screen` like the tutorial uses.)

It's highly recommended that you check out Testing Library's docs as well!

- Basics
  - [Intro and philosophy](https://testing-library.com/docs/react-testing-library/intro)
  - [Guide on migrating from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme/)
- APIs and strategies
  - [Queries](https://testing-library.com/docs/queries/about) and how to think about querying elements (also read about the individual queries)
  - [Waiting for appearance/disappearance](https://testing-library.com/docs/guide-disappearance)
  - [API cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
  - [`render()` API details](https://testing-library.com/docs/react-testing-library/api)
  - Also check out other pages in the "Core API" section of the Testing Library docs (not repeating it all here)
- Events
  - [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events) for firing raw events, and [considerations for `fireEvent`](https://testing-library.com/docs/guide-events/)
  - [`userEvent`](https://testing-library.com/docs/ecosystem-user-event/) (`@testing-library/user-event`) for simulating interaction event sequences
  - If you're having trouble getting an interaction test working, see [My event isn't working properly](#my-event-isnt-working-properly) below

### Examples

```tsx
import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('calls a function on click', () => {
    const onClick = jest.fn();
    // render() returns a variety of get/query methods
    const { getByRole } = render(<Button onClick={onClick}>This is a button</Button>);

    // getByRole will throw if it doesn't find anything
    const button = getByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();

    // 🧹 Unlike with Enzyme or react-test-renderer, cleanup is automatic!
  });
});
```

## Snapshot testing

> 🚨 **Prefer specific unit/functional tests over snapshot tests.** For example, if you want to verify that an attribute is applied in a particular place, it's much better to test that directly rather than using a snapshot.

Jest allows creating [snapshot tests](https://jestjs.io/docs/snapshot-testing) that compare an object or text with expected output.

- `expect.toMatchSnapshot(...)` abstracts loading a .snap file for the test to compare, or will create one if none exists
- `expect.toMatchInlineSnapshot()` saves the snapshot within the test file itself
  - **Prefer inline snapshots**: they're more obvious to read and harder to ignore. If the snapshot seems too long to save in the file, that's often a good reason to consider ways to test the desired outcome directly.

Snapshots in v8 will include style information from `@fluentui/merge-styles` CSS classes. Snapshots in v9 do not include style information.

<details>
<summary>Expand for example snapshot test</summary>

```tsx
// Foo.test.tsx
import * as React from 'react';
import { render } from '@testing-library/react';

const Foo = () => <div>hello world</div>;

describe('Foo', () => {
  it('renders correctly', () => {
    const { container } = render(<Foo />);
    // This saves the snapshot in a file ./__snapshots__/Foo.test.tsx.snap
    expect(container).toMatchSnapshot();
  });

  it('renders correctly (inline snapshot)', () => {
    const { container } = render(<Foo />);
    // Inline snapshots are good for basic cases
    expect(container.firstElementChild).toMatchInlineSnapshot(`
      <div>
        hello world
      </div>
    `);
  });
});
```

</details>

If you ever break a snapshot, you can update it by running one of the following in the package folder:

- for v8: `yarn update-snapshots`
- for v9: `yarn test -u`

## Tips and FAQ

See also [Tips for interaction testing](#tips-for-interaction-testing) above.

### Be careful with `.toBeDefined()` and `.not.toBeNull()`

The matcher `expect(value).toBeDefined()` checks that `value` is _**specifically**_ `undefined`. This can be a problem when `null` is also a possible return value (such as with many DOM APIs) because `null` is not `undefined`.

```ts
// ❌  querySelector and queryBy____ return null if not found, null !== undefined, matcher passes
expect(queryByRole('button')).toBeDefined();
expect(element.querySelector('.foo')).toBeDefined();
```

Similarly, `expect(value).not.toBeNull()` will succeed if `value` is `undefined`.

Instead, consider either checking for a specific value if possible, or using `expect(value).toBeTruthy()`. This works unless `0`, `''`, or `false` is a possible "success" return value (in which case you should check specifically for that value instead).

```ts
// ✅  return value is always an object (matcher passes) or null (matcher fails)
expect(queryByRole('button')).toBeTruthy();
expect(element.querySelector('.foo')).toBeTruthy();
// also okay if you're CERTAIN that the method will never return undefined on failure
// (you can assume this from DOM or testing-library APIs if documented as such)
expect(queryByRole('button')).not.toBeNull();
expect(element.querySelector('.foo')).not.toBeNull();
```

### Browser methods aren't working

Using browser methods like `getBoundingClientRect` won't work when using enzyme to render a document fragment. It's possible to mock this method out if needed; see the `FocusZone` unit tests as an example.

If the test is using `userEvent.type(element)` and throws an error since `getBoundingClientRect` is missing, you can provide the option `userEvent.click(element, { skipClick: true })` to skip the step of clicking on the element (if its actual size/position is irrelevant to the rest of the test).

### My event isn't working properly

There are a few possibilities here:

- Make sure to use [`@testing-library/user-event`](https://www.npmjs.com/package/@testing-library/user-event) to more realistically simulate the sequence of user events that would occur in a real interaction.
- Try using [fake timers](https://jestjs.io/docs/timer-mocks) and manually advancing them to ensure the event and related updates are triggered.
- In some cases, jsdom does not provide realistic event simulation (this is especially an issue for tests involving focus), so try [testing the scenario with Cypress](E2E-testing-with-Cypress) instead.

### `getByRole` can't find an element or says it's hidden

testing-library's `getByRole` will only return elements that would be included in the accessibility tree (per its heuristics). Some possible reasons why an element would register as hidden:

- A few components have an initial off-screen render for measurement purposes (example: v8 CommandBar). In this case, use fake timers and advance the timers past the initial render before running other tests.
- Maybe the component (or the part you're trying to test) is actually not accessible--try it with a screen reader to check
- Some rare edge case where testing-library is wrong (or you want to use `getByRole` for convenience when it doesn't quite apply)

If you need to override this, you can pass [`{ hidden: true }`](https://testing-library.com/docs/queries/byrole/#hidden) as a second argument to `getByRole` to include the hidden elements. Example: `getByRole('button', { hidden: true })`
