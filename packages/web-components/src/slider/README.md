---
id: slider
title: fluent-slider
sidebar_label: slider
---

# fluent-slider

An implementation of a [range slider](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/range) as a form-connected web-component. Note that if the slider is in vertical orientation by default the component will get a height using the css var `--fluent-slider-height`, by default that equates to `(10px * var(--thumb-size))` or 160px. Inline styles will override that height.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentSlider, fluentSliderLabel } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentSlider(), fluentSliderLabel());
```

### Customizing the Thumb

```ts
import { providefluentDesignSystem, fluentSlider, fluentSliderLabel } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentSlider({
    thumb: `...your thumb...`,
  }),
  fluentSliderLabel(),
);
```

## Usage

```html live
<fluent-slider min="0" max="100" step="10" value="70">
  <fluent-slider-label position="0"> 0 </fluent-slider-label>
  <fluent-slider-label position="10"> 10 </fluent-slider-label>
  <fluent-slider-label position="90"> 90 </fluent-slider-label>
  <fluent-slider-label position="100"> 100 </fluent-slider-label>
</fluent-slider>
```

## Create your own design

### Slider

```ts
import { Slider, SliderOptions, sliderTemplate as template } from '@microsoft/fast-foundation';
import { sliderStyles as styles } from './my-slider.styles';

export const mySlider = Slider.compose<SliderOptions>({
  baseName: 'slider',
  template,
  styles,
  thumb: `...default thumb...`,
});
```

### SliderLabel

```ts
import { SliderLabel, sliderLabelTemplate as template } from '@microsoft/fast-foundation';
import { sliderLabelStyles as styles } from './my-slider-label.styles';

export const mySliderLabel = SliderLabel.compose({
  baseName: 'slider-label',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-slider)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/slider/slider.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#slider)
- [Open UI Analysis](https://open-ui.org/components/slider.research)
