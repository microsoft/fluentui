---
id: radio
title: fluent-radio
sidebar_label: radio
---

An implementation of a [radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) as a form-connected web-component.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentRadio } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentRadio());
```

### Customizing the indicator

```ts
import { providefluentDesignSystem, fluentRadio } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentRadio({
    checkedIndicator: `...your checked indicator...`,
  }),
);
```

## Usage

```html live
<div role="radiogroup" aria-labelledby="fruit" name="favorite-fruit">
  <h3 id="fruit">Favorite fruit:</h3>
  <fluent-radio value="apple">Apple</fluent-radio>
  <fluent-radio value="mango">Mango</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</div>
```

:::note

For a more ergonomic usage of radios in groups, see [the `fluent-radio-group` documentation](/docs/components/radio-group).

:::

## Create your own design

```ts
import { Radio, RadioOptions, radioTemplate as template } from '@microsoft/fast-foundation';
import { radioStyles as styles } from './my-radio.styles';

export const myRadio = Radio.compose<RadioOptions>({
  baseName: 'radio',
  template,
  styles,
  checkedIndicator: `...default checked indicator...`,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-radio)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/radio/radio.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria/#radio)
- [Open UI Analysis](https://open-ui.org/components/radio-button.research)
