---
id: anchor
title: fluent-anchor
sidebar_label: anchor
---

As defined by the W3C:

> An anchor is a piece of text which marks the beginning and/or the end of a hypertext link.

`fluent-anchor` is a web component implementation of an [HTML anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). The `fluent-components` anchor supports the same visual appearances as the button component (accent, lightweight, neutral, outline, stealth) as well as a hypertext appearance for use inline with text.

## Setup

```ts
import { providefluentDesignSystem, fluentAnchor } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentAnchor());
```

## Usage

```html live
<fluent-anchor href="https://fast.design" appearance="hypertext">FAST</fluent-anchor>
```

## Create your own design

```ts
import { Anchor, anchorTemplate as template } from '@microsoft/fast-foundation';
import { anchorStyles as styles } from './my-anchor.styles';

export const myAnchor = Anchor.compose({
  baseName: 'anchor',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
```

:::note
This component is built with the expectation that focus is delegated to the anchor element rendered into the shadow DOM.
:::

## Additional resources

- [Component explorer examples](https://explore.fluent.design/components/fast-anchor)
