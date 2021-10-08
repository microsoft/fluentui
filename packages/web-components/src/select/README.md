---
id: select
title: fluent-select
sidebar_label: select
---

# fluent-select

An implementation of an [HTML select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) as a form-connected web-component.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentSelect, fluentOption } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentSelect(), fluentOption());
```

### Customizing the Indicator

```ts
import { providefluentDesignSystem, fluentSelect, fluentOption } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentSelect({
    indicator: `...your indicator...`,
  }),
  fluentOption(),
);
```

## Usage

```html live
<fluent-select id="shirt-size">
  <fluent-option value="s">Small</fluent-option>
  <fluent-option value="m">Medium</fluent-option>
  <fluent-option value="l">Large</fluent-option>
  <fluent-option value="xl">Extra Large</fluent-option>
</fluent-select>
```

## Create your own design

### Select

```ts
import { Select, SelectOptions, selectTemplate as template } from '@microsoft/fast-foundation';
import { selectStyles as styles } from './my-select.styles';

export const mySelect = Select.compose<SelectOptions>({
  baseName: 'select',
  template,
  styles,
  indicator: `...default indicator...`,
});
```

### Option

See [listbox-option](/docs/components/listbox-option) for more information.

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-select)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/select/select.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)
- [Open UI Analysis](https://open-ui.org/components/select.research)
- [Open UI Proposal](https://open-ui.org/components/select)
