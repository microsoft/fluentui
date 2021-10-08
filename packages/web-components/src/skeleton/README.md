---
id: skeleton
title: fluent-skeleton
sidebar_label: skeleton
---

# fluent-skeleton

The `skeleton` component is used as a visual placeholder for an element while it is in a loading state and usually presents itself as a simplified wireframe-like version of the UI it is representing.

## Setup

```ts
import { providefluentDesignSystem, fluentSkeleton } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentSkeleton());
```

## Usage

### Basic Usage

```html
<fluent-skeleton
  style="
        border-radius: 4px;
        width: 50px;
        height: 50px;
    "
  shape="circle"
></fluent-skeleton>
```

### Pattern

A URL for an image asset may be passed to the `pattern` attribute. In this mode, the `fluent-skeleton` component is used as a container for a transparent SVG that may express a more complex placeholder

```html
<fluent-skeleton
  style="
        border-radius: 4px;
        width: 500px;
        height: 250px;
    "
  shape="rect"
  pattern="https://static.fluent.design/assets/skeleton-test-pattern.svg"
></fluent-skeleton>
```

### Shimmer

The `shimmer` boolean attribute will activate the component's shimmer effect.

```html
<fluent-skeleton
  style="
        border-radius: 4px;
        width: 500px;
        height: 250px;
    "
  shape="rect"
  pattern="https://static.fluent.design/assets/skeleton-test-pattern.svg"
  shimmer
></fluent-skeleton>
```

### Custom SVG

An inline SVG can also be inserted into the slot of the `fluent-skeleton`.

```html
<fluent-skeleton
  style="
        border-radius: 4px;
        width: 500px;
        height: 250px;
    "
  shape="rect"
  shimmer
>
  <svg style="position: absolute; left: 0; top: 0;" id="pattern" width="100%" height="100%">
    <defs>
      <mask id="mask" x="0" y="0" width="100%" height="100%">
        <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
        <rect x="0" y="0" width="100%" height="45%" rx="4" />
        <rect x="25" y="55%" width="90%" height="15px" rx="4" />
        <rect x="25" y="65%" width="70%" height="15px" rx="4" />
        <rect x="25" y="80%" width="90px" height="30px" rx="4" />
      </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" mask="url(#mask)" fill="#ffffff" />
  </svg>
</fluent-skeleton>
```

### Further Customizations

The following CSS variables can be used to customize the appearance.

| CSS Variable                    | Expected value  |
| ------------------------------- | --------------- |
| `--skeleton-fill`               | Color           |
| `--skeleton-animation-fill`     | Color           |
| `--skeleton-animation-gradient` | Linear gradient |
| `--skeleton-animation-timing`   | Easing function |

## Create your own design

```ts
import { Skeleton, skeletonTemplate as template } from '@microsoft/fast-foundation';
import { skeletonStyles as styles } from './my-skeleton.styles';

export const mySkeleton = Skeleton.compose({
  baseName: 'skeleton',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-skeleton)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/skeleton/skeleton.spec.md)
- [Open UI Analysis](https://open-ui.org/components/skeleton.research)
