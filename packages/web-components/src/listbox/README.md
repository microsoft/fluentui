---
id: listbox
title: fluent-listbox
sidebar_label: listbox
---

# fluent-listbox

An implementation of a [listbox](https://w3c.github.io/aria-practices/#Listbox). While any DOM content is permissible as a child of the listbox, only [`fluent-option`](/docs/components/listbox-option) elements, `option` elements, and slotted items with `role="option"` will be treated as options and receive keyboard support.

The `listbox` component has no internals related to form association. For a form-associated `listbox`, see the [`fluent-select` component](/docs/components/select).

## Setup

```ts
import { providefluentDesignSystem, fluentListbox, fluentOption } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentListbox(), fluentOption());
```

## Usage

```html live
<div>
  <label id="preferred-format">Preferred Format:</label><br />
  <fluent-listbox aria-labelledby="preferred-format" name="preferred-format">
    <fluent-option value="vinyl">Vinyl Record</fluent-option>
    <fluent-option value="casette">Casette</fluent-option>
    <fluent-option value="cd">Compact Disc</fluent-option>
    <fluent-option value="digital">Digital</fluent-option>
  </fluent-listbox>
</div>
```

## Create your own design

### Listbox

```ts
import { Listbox, listboxTemplate as template } from '@microsoft/fast-foundation';
import { listboxStyles as styles } from './my-listbox.styles';

export const myListbox = Listbox.compose({
  baseName: 'listbox',
  template,
  styles,
});
```

### Option

See [listbox-option](/docs/components/listbox-option) for more information.

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-listbox)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox/listbox.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#Listbox)
