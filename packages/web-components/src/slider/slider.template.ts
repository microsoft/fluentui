import type { ElementViewTemplate } from '@microsoft/fast-element';
import { FASTSlider, sliderTemplate } from '@microsoft/fast-foundation';

export const template: ElementViewTemplate<FASTSlider> = sliderTemplate({
  thumb: `<div class="thumb-cursor" tabindex="0"></div>`,
});
