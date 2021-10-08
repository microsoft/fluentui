---
id: combobox
title: fluent-combobox
sidebar_label: combobox
---

# fluent-combobox

As defined by the [W3C](https://w3c.github.io/aria-practices/#combobox):

> A combobox is an input widget with an associated popup that enables users to select a value for the combobox from a collection of possible values. In some implementations, the popup presents allowed values, while in other implementations, the popup presents suggested values, and users may either select one of the suggestions or type a value. The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third optional element -- a graphical Open button adjacent to the combobox, which indicates availability of the popup. Activating the Open button displays the popup if suggestions are available.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentCombobox, fluentOption } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentCombobox(), fluentOption());
```

### Customizing the indicator

```ts
import { providefluentDesignSystem, fluentCombobox, fluentOption } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentCombobox({
    indicator: `...your indicator...`,
  }),
  fluentOption(),
);
```

## Usage

```html live
<fluent-combobox autocomplete="both">
  <fluent-option>Christopher Eccleston</fluent-option>
  <fluent-option>David Tenant</fluent-option>
  <fluent-option>Matt Smith</fluent-option>
  <fluent-option>Peter Capaldi</fluent-option>
  <fluent-option>Jodie Whittaker</fluent-option>
</fluent-combobox>
```

## Create your own design

### Combobox

```ts
import { Combobox, ComboboxOptions, comboboxTemplate as template } from '@microsoft/fast-foundation';
import { comboboxStyles as styles } from './my-combobox.styles';

export const myCombobox = Combobox.compose<ComboboxOptions>({
  baseName: 'combobox',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
  indicator: `...default indicator...`,
});
```

:::note
This component is built with the expectation that focus is delegated to the input element rendered into the shadow DOM.
:::

### Option

See [listbox-option](/docs/components/listbox-option) for more information.

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-combobox)
- [Component technical specification](https://github.com/microsoft/fast/tree/master/packages/web-components/fast-foundation/src/combobox)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#combobox)
