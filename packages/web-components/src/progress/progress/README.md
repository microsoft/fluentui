---
id: progress
title: fluent-progress
sidebar_label: progress
---

# fluent-progress

_Progress_ and _progress ring_ are used to display the length of time a process will take or to visualize percentage value (referred to as a **determinate** state) and to represent an unspecified wait time (referred to as an **indeterminate** state). _Progress_ components are typically visually represented by a circular or linear animation. When the `value` attribute is passed the state is **determinate**, otherwise it is **indeterminate**.

For progress components which have a linear visual appearance, use `fluent-progress`. For progress implementations which are circular, use `fluent-progress-ring`.

## Setup

### Basic Setup

```ts
import { provideFluentDesignSystem, fluentProgress, fluentProgressRing } from '@fluent/web-components';

provideFluentDesignSystem().register(fluentProgress(), fluentProgressRing());
```

### Customizing Indicators

```ts
import { provideFASTDesignSystem, fastProgress, fastProgressRing } from '@microsoft/fast-components';

provideFASTDesignSystem().register(
  fastProgress({
    indeterminateIndicator1: `...your indeterminate indicator...`,
    indeterminateIndicator2: `...your indeterminate indicator...`,
  }),
  fastProgressRing({
    indeterminateIndicator: `...your indeterminate indicator...`,
  }),
);
```

## Usage

### fluent-progress

```html live
<fluent-progress min="0" max="100" value="75"></fluent-progress>
```

### fluent-progress-ring

```html live
<fluent-progress-ring min="0" max="100" value="75"></fluent-progress-ring>
```

## Create your own design

### Progress

```ts
import { BaseProgress as Progress, ProgressOptions, progressTemplate as template } from '@microsoft/fast-foundation';
import { progressStyles as styles } from './my-progress.styles';

export const myProgress = Progress.compose<ProgressOptions>({
  baseName: 'progress',
  template,
  styles,
  indeterminateIndicator1: `...default indeterminate indicator...`,
  indeterminateIndicator2: `...default indeterminate indicator...`,
});
```

### ProgressRing

```ts
import {
  BaseProgress as ProgressRing,
  ProgressRingOptions,
  progressRingTemplate as template,
} from '@microsoft/fast-foundation';
import { progressRingStyles as styles } from './my-progress-ring.styles';

export const myProgressRing = ProgressRing.compose<ProgressRingOptions>({
  baseName: 'progress-ring',
  template,
  styles,
  indeterminateIndicator: `...default indeterminate indicator...`,
});
```

## Additional resources

- [Component explorer examples for `progress`](https://explore.fast.design/components/fast-progress)
- [Component explorer examples for `progress-ring`](https://explore.fast.design/components/fast-progress-ring)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/progress/progress.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria/#progressbar)
