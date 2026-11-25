import { html, ref } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { SliderOptions } from './slider.options.js';
import type { Slider } from './slider.js';

export function sliderTemplate<T extends Slider>(options: SliderOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}">
      <input
        ${ref('control')}
        class="control"
        type="range"
        tabindex="-1"
        aria-hidden="true"
        min="${x => x.min}"
        max="${x => x.controlMax}"
        step="${x => x.step}"
        :value="${x => x.value}"
        ?disabled="${x => x.controlDisabled}"
        @focus="${x => x.controlFocusHandler()}"
        @pointerdown="${(x, c) => x.controlPointerdownHandler(c.event as PointerEvent)}"
        @input="${(x, c) => x.controlInputHandler(c.event)}"
        @change="${(x, c) => x.controlChangeHandler(c.event)}"
      />
      <div ${ref('track')} part="track-container" class="track">
        <div ${ref('thumb')} part="thumb-container" class="thumb-container">
          <slot name="thumb">${staticallyCompose(options.thumb)}</slot>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Slider> = sliderTemplate({
  thumb: `<div class="thumb"></div>`,
});
