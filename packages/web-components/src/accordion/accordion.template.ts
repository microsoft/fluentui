import { elements, ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { Accordion } from './accordion.js';

/**
 * @public
 */
export function accordionTemplate<T extends Accordion>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <slot ${slotted({ property: 'slottedAccordionItems', filter: elements() })}></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<Accordion> = accordionTemplate();
