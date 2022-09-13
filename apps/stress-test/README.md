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

> NOTE: `build:local` is much slower, but is required the first time you're building the application or if you've pulled in lots of changes. Use `build:app` if you don't need to build dependencies like `@fluentui/react` as it's much faster.

### Examples

```shell
# Run the "simple-stress" scenario with the "mount" and "prop-update" test cases against Firefox with small sizes and low sample size
$ yarn workspace @fluentui/stress-test stress-test run --scenario simple-stress --sample-size 2 --test-cases mount prop-update --browsers firefox --sizes xs s

# Run the "simple-stress" scenario with the "mount" and "prop-update" test cases against the default browsers at the default sizes and sample size
$ yarn workspace @fluentui/stress-test stress-test run --scenario simple-stress --test-cases mount prop-update
```

> NOTE: Tests should be run against production builds. While tests can be run against development builds, and this is useful for gathering quick results and debugging, the performance characteristics of development and production builds can differ quite a bit.

## Glossary

- **scenario**: A testing scenario for a specific line of investigation. For example, if you wanted to compare the performance of different `Button` implementations you might create a "button-test" scenario for various targets.
- **targets**: Different implementation targets. For example: "v8" for Fluent UI v8, "v9" for Fluent UI v9, "wc" for Fluent UI Web Components.
- **test cases**: Different test cases to run against a given scenario. For example, you might want to test mounting performance for a scenario.

## Development

```shell
# Run a development server. Useful for building new tests and debugging/investigating issues.
$ yarn workspace @fluentui/stress-test stress-test dev
```

### Project layout

The project is laid out with folders for each supported version of Fluent (`v8`, `v9`, `wc`) with subfolders in each folder representing a test case. In general there should be corresponding cases between all three versions of Fluent.

The `shared` folder is for utilities that are shared across Fluent versions.

The `components` folder is also split by supported Fluent versions and is where components that can be shared across test cases live.

The `benchmarks` folder houses Tachometer configurations and test results; and helper scripts for generating configurations and processing results.

The `scripts` folder house the Stress Test CLI app that is used to run tests.

### Adding test cases

Add tests cases to the appropriate `src/pages` sub-folder. For example to create a new test, "my test" for Fluent v9 add it to `src/pages/v9/my-test`. Use an existing page as a guide for the files you need to add. Pages are automatically picked up by Webpack when the dev server is started.
