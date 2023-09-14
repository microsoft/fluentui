# @fluentui/stress-test

Stress Test is an application for testing Fluent UI components in "stressful" scenarios so we can evaluate performance.

This application is configured to support Fluent UI v8, v9 and Web Components.

## Usage

Run tests by invoking the CLI:

```shell
$ yarn workspace @fluentui/stress-test stress-test
```

This will show the help documentation that provides details for each command.

### Building

Building produces a static application that can be served with a simple HTTP server.

```shell
# Build all the dependencies for this application (e.g., `@fluentui/react`, `@fluentui/web-components`) along with the application.
$ yarn workspace @fluentui/stress-test stress-test build --build-deps

# Build only this application.
$ yarn workspace @fluentui/stress-test stress-test build
```

> NOTE: `build --build-deps` is much slower, but is required the first time you're building the application or if you've pulled in lots of changes. Use `build` if you don't need to build dependencies like `@fluentui/react` as it's much faster.

### Examples

```shell
# Run your "my-scenario" scenario with the "mount" and "inject-styles" test cases against Chrome and Firefox with small sizes. Target the "stress-tree" page with "button" renderers.
$ yarn workspace @fluentui/stress-test stress-test run --scenario my-scenario --test-cases mount inject-styles --browsers chrome firefox --sizes xs s --targets v8/stress-tree?r=button v9/stress-tree?r=button wc/stress-tree?r=button

# Run your "my-scenario" scenario with the "mount" and "inject-styles" test cases against the default browsers at the default sizes and sample size. Target the "stress-tree" page with "button" renderers.
$ yarn workspace @fluentui/stress-test stress-test run --scenario my-scenario --test-cases mount inject-styles --targets v8/stress-tree?r=button v9/stress-tree?r=button wc/stress-tree?r=button
```

> NOTE: Tests should be run against production builds. While tests can be run against development builds, and this is useful for gathering quick results and debugging, the performance characteristics of development and production builds can differ quite a bit.

## Glossary

- **scenario**: A testing scenario for a specific line of investigation. For example, if you wanted to compare the performance of different `Button` implementations you might create a "button-test" scenario for various targets.
- **targets**: Different implementation targets. These are URLs that can accept query parameters. For example "v8/stress-tree?r=button", "wc/stress-tree?r=button".
- **test cases**: Different test cases to run against a given scenario. For example, you might want to test mounting performance for a scenario.
- **renderers**: Simple components that can be plugged into targets allowing easy customization of the component under test.

## Development

You can run a development server to see what is going to be tested and debugging/investigating issues with it by running the following command:

```shell
$ yarn workspace @fluentui/stress-test stress-test dev
```

Please note that you'll need to add the correct modifiers to the localhost server so that you see the correct test you are trying to debug. If you do not add these modifiers you will most likely just get a page with the message `Cannot GET /`.

For example, if you want to test mount performance for v8 button with a medium-sized fixture you would need to go to add `/v8/stress-tree/?r=button&test=mount&fixtureName=l_1` after `localhost:9000` in the browser.

### Project layout

The project is laid out with folders for each supported version of Fluent (`v8`, `v9`, `wc`) with subfolders in each folder representing a test case. In general there should be corresponding cases between all three versions of Fluent.

The `shared` folder is for utilities that are shared across Fluent versions.

The `components` folder is also split by supported Fluent versions and is where components that can be shared across test cases live.

The `benchmarks` folder houses Tachometer configurations and test results; and helper scripts for generating configurations and processing results.

The `scripts` folder house the Stress Test CLI app that is used to run tests.

### Creating your own tests

There are a few way you can create your own tests depending on what you want to do.

#### Adding a new test with a renderer

The simplest thing to do is use an existing test page like "stress-tree" but with your own renderer. A renderer is just a function that renders a component to be rendered. Renderers are specific to the UI library being tested so a Web Component renderer is different from a React one but conceptually they are the same.

An example React renderer:

```tsx
// myButton.tsx
const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <Button>Button at index {index}</Button>;
};
```

> Note: renderers need to be saved in the appropriate `src/renderers` subfolder. `v8` for Fluent V8, `v9` for Fluent V9, `wc` for Fluent Web Components

In your test specify the renderer with the `r` query parameter:

```shell
yarn workspace @fluentui/stress-test stress-test run my-button-scenario --test-cases mount --targets v9/stress-tree?r=myButton
```

#### Adding new test fixtures

Test fixtures are used to drive tests. In the "stress-tree` page fixtures are used to control different sizes of DOM tree so tests can be run against "simple" to "complex" DOM trees.

Fixtures can be generated with the `build-fixture` command:

```shell
yarn workspace @fluentui/stress-test stress-test build-fixture --name my-fixture --option option1=value1 option2=value2
```

Fixtures are saved in the `src/fixtures` folder.

> Note: fixtures can become quite large so they are excluded from git. If you need others to be able to generate your fixture be sure to keep track of the options you use to create the fixture.

#### Adding a new test page

A page is a way to control the entire structure of your test. Currently, we ship a "stress-tree" page which loads a broad and deep DOM tree to simulate a complex real-world web application. If you need something different create a page to represent the situation you need to test. See `src/pages` for examples of how to create a page.
