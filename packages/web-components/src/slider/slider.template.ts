import { html, ref } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import { SliderOptions } from './slider.options.js';
import { Slider } from './slider.js';

export function sliderTemplate<T extends Slider>(options: SliderOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="slider"
      tabindex="${x => (x.disabled ? null : 0)}"
      aria-valuetext="${x => x.valueTextFormatter(x.value)}"
      aria-valuenow="${x => x.value}"
      aria-valuemin="${x => x.min}"
      aria-valuemax="${x => x.max}"
      aria-disabled="${x => (x.disabled ? true : void 0)}"
      aria-readonly="${x => (x.readOnly ? true : void 0)}"
      aria-orientation="${x => x.orientation}"
      class="${x => x.orientation}"
    >
      <div part="positioning-region" class="positioning-region">
        <div ${ref('track')} part="track-container" class="track">
          <slot name="track"></slot>
          <div part="track-start" class="track-start" style="${x => x.position}">
            <slot name="track-start"></slot>
          </div>
        </div>
        <slot></slot>
        <div
          ${ref('thumb')}
          part="thumb-container"
          class="thumb-container"
          style="${x => x.position}"
          @mousedown="${(x, c) => x.handleThumbMouseDown(c.event as MouseEvent)}"
          @touchstart="${(x, c) => x.handleThumbMouseDown(c.event as MouseEvent)}"
        >
          <slot name="thumb">${staticallyCompose(options.thumb)}</slot>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Slider> = sliderTemplate({
  thumb: `<div class="thumb-cursor"></div>`,
});
