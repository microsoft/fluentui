import { elements, html, slotted } from '@microsoft/fast-element';
import type { Accordion } from './accordion';

/**
 * The template for the Accordion component.
 * @public
 */
export const accordionTemplate = html<Accordion>`
  <template>
    <slot ${slotted({ property: 'accordionItems', filter: elements() })}></slot>
    <slot name="item" part="item" ${slotted('accordionItems')}></slot>
  </template>
`;
