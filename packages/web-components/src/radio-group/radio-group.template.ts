import { type ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { RadioGroup } from './radio-group.js';

export function radioGroupTemplate<T extends RadioGroup>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      @disabled="${(x, c) => x.disabledRadioHandler(c.event as CustomEvent)}"
      @change="${(x, c) => x.changeHandler(c.event as Event)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
      @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
      <slot ${slotted('slottedRadios')}></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<RadioGroup> = radioGroupTemplate();
