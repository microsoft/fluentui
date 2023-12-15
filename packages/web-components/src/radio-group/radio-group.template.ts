import { elements, html, slotted } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import type { RadioGroup } from './radio-group.js';
import { RadioGroupOrientation } from './radio-group.options.js';

export function radioGroupTemplate<T extends RadioGroup>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="radiogroup"
      tabindex="${x => (x.disabled ? -1 : void 0)}"
      aria-disabled="${x => x.disabled}"
      aria-readonly="${x => x.readOnly}"
      aria-orientation="${x => x.orientation}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @mousedown="${(x, c) => x.handleDisabledClick(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @focusout="${(x, c) => x.focusOutHandler(c.event as FocusEvent)}"
    >
      <slot name="label"></slot>
      <div
        class="positioning-region ${x =>
          x.orientation === RadioGroupOrientation.horizontal ? 'horizontal' : 'vertical'}"
        part="positioning-region"
      >
        <slot
          ${slotted({
            property: 'slottedRadioButtons',
            filter: elements('[role=radio]'),
          })}
        ></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<RadioGroup> = radioGroupTemplate();
