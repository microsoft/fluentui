---
id: button
title: fluent-button
sidebar_label: button
---

As defined by the [W3C](https://w3c.github.io/aria-practices/#button):

> A button is a widget that enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

`fluent-button` is a web component implementation of an [HTML button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button). The `fluent-components` button supports several visual appearances (accent, lightweight, neutral, outline, stealth).

## Setup

```ts
import { providefluentDesignSystem, fluentButton } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentButton());
```

## Usage

```html live
<fluent-button appearance="primary">Submit</fluent-button>
```

## Create your own design

```ts
import { Button, buttonTemplate as template } from '@microsoft/fast-foundation';
import { buttonStyles as styles } from './my-button.styles';

export const myButton = Button.compose({
  baseName: 'button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
```

:::note
This component is built with the expectation that focus is delegated to the button element rendered into the shadow DOM.
:::

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-button)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/button/button.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#button)
- [Open UI Analysis](https://open-ui.org/components/button)
