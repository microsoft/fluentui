import type { ElementViewTemplate } from '@microsoft/fast-element';
import { children, html } from '@microsoft/fast-element';
import { Radio } from '../radio/radio.js';
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
      ${children({
        property: 'radios',
        filter: x => x instanceof Radio,
        selector: '*',
        subtree: true,
      })}
    >
      <slot></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<RadioGroup> = radioGroupTemplate();
