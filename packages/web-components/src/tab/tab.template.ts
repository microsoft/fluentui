import { html } from '@microsoft/fast-element';
import type { Tab } from './tab';

/**
 * The template for the Tab component.
 * @public
 */
export const tabTemplate = html<Tab>`
  <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
    <slot name="start"></slot>
    <slot></slot>
    <slot name="end"></slot>
  </template>
`;
