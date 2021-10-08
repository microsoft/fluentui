---
id: toolbar
title: fluent-toolbar
sidebar_label: toolbar
---

As defined by the [W3C](https://w3c.github.io/aria-practices/#toolbar):

> A toolbar is a container for grouping a set of controls, such as buttons, menubuttons, or checkboxes.
>
> When a set of controls is visually presented as a group, the toolbar role can be used to communicate the presence and purpose of the grouping to screen reader users. Grouping controls into toolbars can also be an effective way of reducing the number of tab stops in the keyboard interface.

## Setup

```ts
import { providefluentDesignSystem, fluentToolbar } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentToolbar());
```

## Usage

```html live
<fluent-toolbar>
  <fluent-button>Button</fluent-button>
  <fluent-radio-group>
    <fluent-radio checked>One</fluent-radio>
    <fluent-radio>Two</fluent-radio>
    <fluent-radio>Three</fluent-radio>
  </fluent-radio-group>
  <fluent-combobox>
    <fluent-option>Please Please Me</fluent-option>
    <fluent-option>With The Beatles</fluent-option>
    <fluent-option>A Hard Day's Night</fluent-option>
    <fluent-option>Beatles for Sale</fluent-option>
    <fluent-option>Help!</fluent-option>
    <fluent-option>Rubber Soul</fluent-option>
    <fluent-option>Revolver</fluent-option>
    <fluent-option>Sgt. Pepper's Lonely Hearts Club Band</fluent-option>
    <fluent-option>Magical Mystery Tour</fluent-option>
    <fluent-option>The Beatles</fluent-option>
    <fluent-option>Yellow Submarine</fluent-option>
    <fluent-option>Abbey Road</fluent-option>
    <fluent-option>Let It Be</fluent-option>
  </fluent-combobox>
  <fluent-button>Button</fluent-button>
  <fluent-select>
    <fluent-option>Option 1</fluent-option>
    <fluent-option>Second option</fluent-option>
    <fluent-option>Option 3</fluent-option>
  </fluent-select>
</fluent-toolbar>
```

## Create your own design

```ts
import { Toolbar, toolbarTemplate as template } from '@microsoft/fast-foundation';
import { toolbarStyles as styles } from './my-toolbar.styles';

export const myToolbar = Toolbar.compose({
  baseName: 'toolbar',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-toolbar)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/toolbar/toolbar.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#toolbar)
