---
id: flipper
title: fluent-flipper
sidebar_label: flipper
---

# fluent-flipper

The flipper component is most often used to page through blocks of content or collections of ui elements. As flippers are often a supplemental form of navigation, the flippers are hidden by default to avoid duplicate keyboard interaction. Passing an attribute of `aria-hidden="false"` will expose the flippers to assistive technology.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentFlipper } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentFlipper());
```

### Customizing Icons

```ts
import { providefluentDesignSystem, fluentFlipper } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentFlipper({
    next: `...your next icon...`,
    previous: `...your previous icon...`,
  }),
);
```

## Usage

### Previous

```html live
<fluent-flipper direction="previous"></fluent-flipper>
```

### Next

```html live
<fluent-flipper direction="next"></fluent-flipper>
```

## Create your own design

```ts
import { Flipper, FlipperOptions, flipperTemplate as template } from '@microsoft/fast-foundation';
import { flipperStyles as styles } from './my-flipper.styles';

export const myFlipper = Flipper.compose<FlipperOptions>({
  baseName: 'flipper',
  template,
  styles,
  next: `...default next icon...`,
  previous: `...default previous icon...`,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-flipper)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/flipper/flipper.spec.md)
