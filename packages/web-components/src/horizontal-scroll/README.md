---
id: horizontal-scroll
title: fluent-horizontal-scroll
sidebar_label: horizontal-scroll
---

An implementation of a content scroller as a web-component.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentHorizontalScroll, fluentFlipper } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentHorizontalScroll(), fluentFlipper());
```

### Customizing Flippers

```ts
import { html } from '@microsoft/fluent-element';
import { providefluentDesignSystem, fluentHorizontalScroll } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentHorizontalScroll({
    nextFlipper: html<HorizontalScroll>`
      <fluent-flipper @click="${x => x.scrollToNext()}" aria-hidden="${x => x.flippersHiddenFromAT}"></fluent-flipper>
    `,
    previousFlipper: html<HorizontalScroll>`
      <fluent-flipper
        @click="${x => x.scrollToPrevious()}"
        direction="previous"
        aria-hidden="${x => x.flippersHiddenFromAT}"
      ></fluent-flipper>
    `,
  }),
);
```

## Usage

```html
<fluent-horizontal-scroll>
  <fluent-card>
    Card number 1
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 2
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 3
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 4
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 5
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 6
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 7
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 8
    <fluent-button>A button</fluent-button>
  </fluent-card>
</fluent-horizontal-scroll>
```

## Create your own design

```ts
import { html } from '@microsoft/fluent-element';
import {
  HorizontalScroll,
  HorizontalScrollOptions,
  horizontalScrollTemplate as template,
} from '@microsoft/fast-foundation';
import { horizontalScrollStyles as styles } from './my-horizontal-scroll.styles';

export const myHorizontalScroll = HorizontalScroll.compose<HorizontalScrollOptions>({
  baseName: 'horizontal-scroll',
  template,
  styles,
  nextFlipper: html`
    <fluent-flipper @click="${x => x.scrollToNext()}" aria-hidden="${x => x.flippersHiddenFromAT}"></fluent-flipper>
  `,
  previousFlipper: html`
    <fluent-flipper
      @click="${x => x.scrollToPrevious()}"
      direction="previous"
      aria-hidden="${x => x.flippersHiddenFromAT}"
    ></fluent-flipper>
  `,
});
```
