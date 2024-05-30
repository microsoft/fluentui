import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { Field } from './field.js';

/**
 * Template for the Field component
 * @public
 */
export const template: ElementViewTemplate = html<Field>`
  <template
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    @change="${(x, c) => x.handleChange(c.event.target)}"
    @focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
  >
    <slot name="label" part="label"></slot>
    <slot name="input" part="input" ${slotted({ property: 'inputSlot' })}></slot>
    <slot name="message" part="message" ${slotted({ property: 'messageSlot' })}></slot>
  </template>
`;
