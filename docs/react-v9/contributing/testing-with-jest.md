## Overview

Fluent UI's unit, functional, and snapshot tests are built using [Jest](https://jestjs.io/). This allows us to run tests in a Node environment but simulates the browser using [jsdom](https://github.com/jsdom/jsdom).

We use various libraries on top of Jest for rendering and interacting with React components:

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

- Old monorepo libraries (like v8)( **none of these approaches is allowed in any new tests** ):
  - [Enzyme](https://enzymejs.github.io/enzyme/) -- **not allowed in new tests**
  - [react-test-renderer](https://reactjs.org/docs/test-renderer.html), primarily for snapshot testing _(snapshots are discouraged in new tests)_

## Running tests

From your Terminal invoke one of following commands:
`yarn nx run <package-name>:test` or `yarn lage test --to <package-name>`

> New packages (v9) don't require build step before, which is not true for old fluent libraries like v8.
> Until v8 lives within our main branch we cannot remove `build` dependency from target task graph thus you'll experience build step even for new packages.
>
> You can use `yarn workspace <package-name> test` for new packages if you don't have build within your cache and don't wanna wait for `build` step

## Running tests in watch mode

When you are developing tests, use the watch mode to run the tests as you write them!

1. The start command varies by library: for v8, `yarn start-test`, or for v9, `yarn test --watch`
2. Edit and saving tests should now cause the console to re-run the tests you have added/modified.

### Debugging

The repo includes launch configurations for debugging tests using Visual Studio Code. (You could also configure debugging in another editor of your choice.)

1. Set breakpoints in the test file (`*.test.ts`,`*.spec.ts`,`*.test.tsx`,`*.spec.tsx`)
2. Open the **Run** (debugger) pane in the sidebar and choose the configuration you want: usually **Debug current open test** to run only the current open test, or **Debug test** to run all tests for the package the current file is in
3. Start debugging

## Jest basics

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

### Recommended reading

- [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/docs/getting-started)
