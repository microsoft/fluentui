# @fluentui/react-jsx-runtime

**React JSX runtime for [Fluent UI React](https://react.fluentui.dev/)**

[Fluent UI React](https://react.fluentui.dev/) requires the usage of a custom JSX runtime to support the [slots API](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--docs)

## Usage

> [!NOTE]
> This custom JSX pragma should only be used in cases where you are trying to use the internal Fluent UI React **slot API in conjunction with `assertSlots()`**.
>
> If you are not using the internal slot API, don't use it.

In case you want to re-compose a component and redeclare its render method then this API will be necessary, learn more on [Rendering a component with slots](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--docs#rendering-components-with-slots)

To properly render a component with slots, our custom `createElement` method needs to be used instead of default `React.createElement`:

> NOTE: It works with both `automatic` or `classic` jsxRuntime configuration.

### React 17+

> infers `@jsxRuntime automatic`

```tsx
/** @jsxImportSource @fluentui/react-jsx-runtime */

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

### React 16

> infers `@jsxRuntime classic`

```tsx
/** @jsx createElement */

// in order to apply our custom `createElement` factory to jsx transforms, to support slot creation, we need to import it physically
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
