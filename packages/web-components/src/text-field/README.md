---
id: text-field
title: fluent-text-field
sidebar_label: text-field
---

An implementation of a [text field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/text) as a form-connected web-component. The `fluent-text-field` supports two visual appearances, outline and filled, with the control defaulting to the outline appearance.

:::note
This component filters out slotted _text_ nodes that are only white space to properly hide the label when the label is not in use.
:::

## Setup

```ts
import { providefluentDesignSystem, fluentTextField } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentTextField());
```

## Usage

```html live
<fluent-text-field appearance="filled" placeholder="user@email.com">Email</fluent-text-field>
```

## Create your own design

```ts
import { TextField, textFieldTemplate as template } from '@microsoft/fast-foundation';
import { textFieldStyles as styles } from './my-text-field.styles';

export const myTextField = TextField.compose({
  baseName: 'text-field',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
```

:::note
This component is built with the expectation that focus is delegated to the input element rendered into the shadow DOM.
:::

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-text-field)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/text-field/text-field.spec.md)
