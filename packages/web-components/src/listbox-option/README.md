---
id: listbox-option
title: fluent-option
sidebar_label: option
---

An implementation of an [option](https://w3c.github.io/aria/#option). To avoid namespace collisions with the [Option() constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option), the component class is `ListboxOption`, and our implementation is named `fluent-option`.

The `<fluent-option>` component will only provide internals related to form association when used within a form-associated component such as [`fluent-select`](/docs/components/select) or [`fluent-combobox`](/docs/components/combobox). It will not provide these capabilities when used only with a [`fluent-listbox`](/docs/components/listbox).

## Setup

```ts
import { providefluentDesignSystem, fluentOption } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentOption());
```

## Usage

See [`fluent-select`](/docs/components/select), [`fluent-combobox`](/docs/components/combobox), or [`fluent-listbox`](/docs/components/listbox).

## Create your own design

```ts
import { ListboxOption, listboxOptionTemplate as template } from '@microsoft/fast-foundation';
import { optionStyles as styles } from './my-listbox-option.styles';

export const myOption = ListboxOption.compose({
  baseName: 'option',
  template,
  styles,
});
```

## Additional resources

- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox-option/listbox-option.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria/#option)
