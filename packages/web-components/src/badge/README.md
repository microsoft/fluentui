---
id: badge
title: fluent-badge
sidebar_label: badge
---

The `fluent-badge` component is used to highlight an item and attract attention or flag status.

## Setup

```ts
import { providefluentDesignSystem, fluentBadge } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentBadge());
```

## Usage

The `fill` and `color` attributes of the _badge_ create CSS custom properties which can be used to style the control.

```css
fluent-badge {
  --badge-fill-primary: #00ff00;
  --badge-fill-danger: #ff0000;
  --badge-color-light: #ffffff;
  --badge-color-dark: #000000;
}
```

```html live
<fluent-badge fill="danger" color="dark">Danger</fluent-badge>
```

:::note
In addition to the color map support detailed above, the `fluent-badge` from the Microsoft component implementation (`@fluentui/web-components`) includes an attribute to set default appearances which ensure WCAG 2.1 AA contrast requirements.
:::

## Create your own design

```ts
import { Badge, badgeTemplate as template } from '@microsoft/fast-foundation';
import { badgeStyles as styles } from './my-badge.styles';

export const myBadge = Badge.compose({
  baseName: 'badge',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-badge)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/badge/badge.spec.md)
- [Open UI Analysis](https://open-ui.org/components/badge.research)
