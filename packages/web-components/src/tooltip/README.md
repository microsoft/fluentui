---
id: tooltip
title: fluent-tooltip
sidebar_label: tooltip
---

The `fluent-tooltip` component is used provide extra information about another element when it is hovered.

## Setup

```ts
import { providefluentDesignSystem, fluentTooltip } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentTooltip());
```

## Usage

```html
<div>
  <fluent-button id="anchor">Hover me</fluent-button>
  <fluent-tooltip anchor="anchor">Tooltip text</fluent-tooltip>
</div>
```

## Create your own design

```ts
import { tooltipTemplate as template, Tooltip } from '@microsoft/fast-foundation';
import { tooltipStyles as styles } from './my-tooltip.styles';

export const myTooltip = Tooltip.compose({
  baseName: 'tooltip',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-tooltip)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/tooltip/tooltip.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#tooltip)
- [Open UI Analysis](https://open-ui.org/components/tooltip.research)
