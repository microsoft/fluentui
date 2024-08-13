# @fluentui/react-jsx-runtime

**React JSX runtime for [Fluent UI React](https://react.fluentui.dev/)**

[Fluent UI React](https://react.fluentui.dev/) requires the usage of a custom JSX runtime to support the [slots API](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--page)

## Usage

This library should only be used in the case where you are trying to use the internal slot API of Fluent UI React. If you are not using the internal slot API, you should not need to use this library.

In case you want to re-compose a component and redeclare its render method then this API will be necessary, here's our documentation on [Rendering a component with slots](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--page#rendering-components-with-slots)

To properly render a component with slots the `createElement` method of `@fluentui/react-jsx-runtime` can be used as a replacement for `React.createElement`:

```tsx
/** @jsxRuntime classic */
/** @jsx createElement */

// createElement custom JSX pragma is required to support slot creation
import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';

const renderButton_unstable = (state: ButtonState) => {
  const { iconOnly, iconPosition } = state;

  assertSlots<ButtonSlots>(state);

  return (
    <state.root>
      {iconPosition !== 'after' && state.icon && <state.icon />}
      {!iconOnly && state.root.children}
      {iconPosition === 'after' && state.icon && <state.icon />}
    </state.root>
  );
};
```

In case you're using typescript or any modern javascript transpiler, you can use [JSX import source](https://www.typescriptlang.org/tsconfig#jsxImportSource) feature instead of depending on declaring the runtime on every file

In TSC case you can simply add this do `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@fluentui/react-jsx-runtime"
  }
}
```
