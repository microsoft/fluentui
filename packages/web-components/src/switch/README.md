---
id: switch
title: fluent-switch
sidebar_label: switch
---

# fluent-switch

An implementation of a [switch](https://w3c.github.io/aria/#switch) as a form-connected web-component.

## Setup

### Basic setup

```ts
import { providefluentDesignSystem, fluentSwitch } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentSwitch());
```

### Customizing the Indicator

```ts
import { providefluentDesignSystem, fluentSwitch } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentSwitch({
    switch: `...your switch indicator...`,
  }),
);
```

## Usage

```html live
<fluent-switch>
  Theme
  <span slot="checked-message">Dark</span>
  <span slot="unchecked-message">Light</span>
</fluent-switch>
```

## Create your own design

```ts
import { Switch, SwitchOptions, switchTemplate as template } from '@microsoft/fast-foundation';
import { switchStyles as styles } from './my-switch.styles';

export const mySwitch = Switch.compose<SwitchOptions>({
  baseName: 'switch',
  template,
  styles,
  switch: `...default switch indicator...`,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-switch)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/switch/switch.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria/#switch)
- [Open UI Analysis](https://open-ui.org/components/switch)
