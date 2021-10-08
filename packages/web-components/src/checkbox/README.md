---
id: checkbox
title: fluent-checkbox
sidebar_label: checkbox
---

# fluent-checkbox

An implementation of a [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox) as a form-connected web-component.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentCheckbox } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentCheckbox());
```

### Customizing Indicators

```ts
import { providefluentDesignSystem, fluentCheckbox } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentCheckbox({
    checkedIndicator: `...your checked indicator...`,
    indeterminateIndicator: `...your indeterminate indicator...`,
  }),
);
```

## Usage

```html live
<fieldset>
  <legend>Fruits</legend>
  <fluent-checkbox checked>Apple</fluent-checkbox>
  <fluent-checkbox checked>Banana</fluent-checkbox>
  <fluent-checkbox>Honeydew</fluent-checkbox>
  <fluent-checkbox checked>Mango</fluent-checkbox>
</fieldset>
```

## Create your own design

```ts
import { Checkbox, CheckboxOptions, checkboxTemplate as template } from '@microsoft/fast-foundation';
import { checkboxStyles as styles } from './my-checkbox.styles';

export const myCheckbox = Checkbox.compose<CheckboxOptions>({
  baseName: 'checkbox',
  template,
  styles,
  checkedIndicator: `...default checked indicator...`,
  indeterminateIndicator: `...default indeterminate indicator...`,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-checkbox)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/checkbox/checkbox.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#checkbox)
- [Open UI Analysis](https://open-ui.org/components/checkbox.research)
- [Open UI Proposal](https://open-ui.org/components/checkbox)
