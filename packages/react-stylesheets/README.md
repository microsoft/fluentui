# @fluentui/react-stylesheets

A library for contextually rendering css stylesheets to a particular target as components are used.

**Stylesheet providing utilities for [Fluent UI React](https://dev.microsoft.com/fluentui)**

Typically when you use traditional webpack loaders to load css stylesheets, they often register
styles into the document on component mount. This creates a few problems:

1. **Child window scenarios.** A child window is often rendered from the parent. When components render within the child window context, they need a contextual way to render their stylesheet within the parent.

2. **Server side rendering.** A component hierarchy is dynamically rendered on the server in a node session. Only stylesheets which are needed for the scenario should return.

This package contains utilities for rendering stylesheets to a given target using a contextual stylesheet provider. This allows us to render on demand when needed.

## Usage

### Installation

```bash
npm install @fluentui/react-stylesheets
```

### Component/stylesheet usage

In a component, provide stylesheets:

```tsx
// Use a styling solution which allows you to pull the stylesheet as a string.
const stylesheet = `
  .ms-Foo {
    background: red;
  }
`;

const Foo = () => {
  useStylesheet(stylesheet);

  return <div className="ms-Foo">I am foo</div>;
};
```

By default, the stylesheet will be rendered to the document head on component initialization. However, this allows style rendering to be finely controlled by a provider.

### Scenario: Rendering styles to a child window

Use the `target` prop of `StylesheetProvider` to target a different document.

```tsx
const childDocument = window.open().document;
const rootElement = childDocument.body.appendChild(childWindow.document.createElement('div'));

ReactDOM.render(
  <StylesheetProvider target={childDocument}>
    <App />
  </StylesheetProvider>,
  rootElement,
);
```

### Scenario: Rendering styles to a string for SSR or testing

Use the `renderStyles` prop on the `StylesheetProvider` to provide an alternative function to render
styles.

```tsx
getPage = () => {
  const allStyles = [];
  const renderStyles = styles => allStyles.push(...styles);

  const html = React.renderToString(
    <StylesheetProvider renderStyles={renderStyles}>
      <Foo />
    <StylesheetProvider>
  );

  return `
    <html>
      <head>
        <title>Example</title>
        <style>${allStyles.join('')}</style>
      <head>
      <body>
        ${html}
      </body>
    </html>
  `;
}
```

## Edge cases covered

### Order of stylesheet registration

Typical webpack `style-loader` style registration approach would dictate that styles would be
registered in module import order. This means leaf nodes end up registering styles first, then root elements.

Because React renders components root to child, stylesheet ordering gets reversed.
