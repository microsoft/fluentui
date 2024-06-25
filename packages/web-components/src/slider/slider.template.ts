import { html, ref } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import { SliderOptions } from './slider.options.js';
import { Slider } from './slider.js';

export function sliderTemplate<T extends Slider>(options: SliderOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      tabindex="${x => (x.disabled ? null : 0)}"
    >
      <div
        ${ref('track')}
        part="track-container"
        class="track"
        style="${x => x.position}"
        @mousedown="${(x, c) => x.handlePointerDown(c.event as PointerEvent)}"
      ></div>
      <div
        ${ref('thumb')}
        part="thumb-container"
        class="thumb-container"
        style="${x => x.position}"
        @mousedown="${(x, c) => x.handleThumbPointerDown(c.event as PointerEvent)}"
        @touchstart="${(x, c) => x.handleThumbPointerDown(c.event as PointerEvent)}"
      >
        <slot name="thumb">${staticallyCompose(options.thumb)}</slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Slider> = sliderTemplate({
  thumb: `<div class="thumb"></div>`,
});
