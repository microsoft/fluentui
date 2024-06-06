import { children, elements, ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { Field } from './field.js';

/**
 * Template for the Field component
 * @public
 */
export const template: ElementViewTemplate = html<Field>`
  <template
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    @change="${(x, c) => x.changeHandler(c.event as InputEvent)}"
    @focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
    ${children({
      property: 'slottedInputs',
      attributes: true,
      attributeFilter: ['disabled', 'required', 'readonly'],
      subtree: true,
      selector: '[slot="input"]',
      filter: elements(),
    })}
  >
    <slot name="label" part="label"></slot>
    <slot name="input" part="input"></slot>
    <slot name="message" part="message" ${slotted({ property: 'messageSlot', filter: elements('[flag]') })}></slot>
  </template>
`;
