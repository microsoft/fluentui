import { html, slotted } from '@microsoft/fast-element';
import type { Tablist } from './tablist.js';

/**
 * @public
 */
export const template = html<Tablist>`
  <template role="tablist">
    <slot name="tab" ${slotted('slottedTabs')}></slot>
  </template>
`;
