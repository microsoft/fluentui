---
id: number-field
title: fluent-number-field
sidebar_label: number-field
---

An implementation of a [text field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/text) as a form-connected web-component. The `fluent-number-field` supports two visual appearances, outline and filled, with the control defaulting to the outline appearance.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentNumberField } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentNumberField());
```

### Customizing Glyphs

```ts
import { providefluentDesignSystem, fluentNumberField } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentNumberField({
    stepDownGlyph: `...your step down glyph...`,
    stepUpGlyph: `...your setup up glyph...`,
  }),
);
```

## Usage

```html live
<fluent-number-field appearance="filled" min="0" max="10"></fluent-number-field>
```

## Create your own design

```ts
import { NumberField, NumberFieldOptions, numberFieldTemplate as template } from '@microsoft/fast-foundation';
import { numberFieldStyles as styles } from './my-number-field.styles';

export const myNumberField = NumberField.compose<NumberFieldOptions>({
  baseName: 'number-field',
  styles,
  template,
  shadowOptions: {
    delegatesFocus: true,
  },
  stepDownGlyph: `...default step down glyph...`,
  stepUpGlyph: `...default setup up glyph...`,
});
```

:::note
This component is built with the expectation that focus is delegated to the input element rendered into the shadow DOM.
:::

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-number-field)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/number-field/number-field.spec.md)
