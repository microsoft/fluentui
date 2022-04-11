import { html, slotted } from '@microsoft/fast-element';
import type { Badge } from './badge';

/**
 * The template for the Badge component.
 * @public
 */
export const badgeTemplate = html<Badge>`
  <template>
    <slot name="start"></slot>
    <slot ${slotted('defaultSlottedContent')}></slot>
    <slot name="end"></slot>
  </template>
`;
