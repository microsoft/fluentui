# [Fluent UI V9 website](https://react.fluentui.dev/)

**Fluent UI V9 React Components**

Fluent UI is a collection of projects that represent the Fluent design language in code. This website helps document the components and styles that make up Fluent UI.

## Build the website

1. In `fluentui` folder run `yarn`.
2. Run `yarn lage build --to @fluentui/public-docsite-v9 --no-cache`
3. Run `yarn workspace @fluentui/public-docsite-v9 start`

## If you want to show full code in "Show Code" area

Inside `YouComponentName.stories.tsx` add the following code:

```jsx
YouComponentName.parameters = {
  docs: {
    source: {
      code: `[Insert here your code...]`,
    },
  },
};
```
