import { html, ref } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { SliderOptions } from './slider.options.js';
import type { Slider } from './slider.js';

export function sliderTemplate<T extends Slider>(options: SliderOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      @pointerdown="${(x, c) => x.handlePointerDown(c.event as PointerEvent)}"
      @keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
    >
      <div ${ref('track')} part="track-container" class="track" style="${x => x.position}"></div>
      <div
        ${ref('thumb')}
        part="thumb-container"
        class="thumb-container"
        style="${x => x.position}"
        @pointerdown="${(x, c) => x.handleThumbPointerDown(c.event as PointerEvent)}"
      >
        <slot name="thumb">${staticallyCompose(options.thumb)}</slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Slider> = sliderTemplate({
  thumb: `<div class="thumb"></div>`,
});
