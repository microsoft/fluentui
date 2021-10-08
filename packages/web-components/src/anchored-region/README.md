---
id: anchored-region
title: fluent-anchored-region
sidebar_label: anchored-region
---

An _anchored region_ is a container component which enables authors to create layouts where the contents of the anchored region can be positioned relative to another "anchor" element. Additionally, the _anchored region_ can react to the available space between the anchor and a parent ["viewport"](https://developer.mozilla.org/en-US/docs/Glossary/viewport) element such that the region is placed on the side of the anchor with the most available space, or even resize itself based on that space.

## Setup

```ts
import { providefluentDesignSystem, fluentAnchoredRegion } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentAnchoredRegion());
```

## Usage

A region that always renders above the anchor element.

```html live
<div id="viewport">
  <button id="anchor">Button is an anchor</button>
  <fluent-anchored-region anchor="anchor" vertical-positioning-mode="locktodefault" vertical-default-position="top">
    This shows up above the button
  </fluent-anchored-region>
</div>
```

## Create your own design

```ts
import { AnchoredRegion, anchoredRegionTemplate as template } from '@microsoft/fast-foundation';
import { anchoredRegionStyles as styles } from './my-anchored-region.styles';

export const myAnchoredRegion = AnchoredRegion.compose({
  baseName: 'anchored-region',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-anchored-region)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/anchored-region/anchored-region.spec.md)
