# public-docsite-v9

This app is official documentation for Fluentui react-components published to https://react.fluentui.dev

**Fluent UI V9 React Components**

Fluent UI is a collection of projects that represent the Fluent design language in code. This website helps document the components and styles that make up Fluent UI.

## Start the website

Run `yarn workspace @fluentui/public-docsite-v9 start`

## Build the website

Run `yarn nx run public-docsite-v9:build-storybook` to build the production Storybook and generate LLM documentation.
Nx builds `storybook-llms-extractor` before running the documentation generation step.

The chart and headless docsites also build the extractor before generating LLM documentation, for both their
`build-storybook` and `build-storybook:docsite` targets. The v9 `build-storybook:docsite` target depends on these builds
and the v9 `build-storybook` target.

## Notes

- `Open in CodeSandbox` button is located in different [repo](https://github.com/microsoft/fluentui-storybook-addons).
