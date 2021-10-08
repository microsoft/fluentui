---
id: divider
title: fluent-divider
sidebar_label: divider
---

A web component implementation of a [horizontal rule](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr).

## Setup

```ts
import { providefluentDesignSystem, fluentDivider } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentDivider());
```

## Usage

```html live
<fluent-divider></fluent-divider>
```

## Create your own design

```ts
import { Divider, dividerTemplate as template } from '@microsoft/fast-foundation';
import { dividerStyles as styles } from './my-divider.styles';

export const myDivider = Divider.compose({
  baseName: 'divider',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-divider)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/divider/divider.spec.md)
