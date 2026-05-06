import { html, slotted } from '@microsoft/fast-element';
import type { Tablist } from './tablist.js';

/**
 * @public
 */
export const template = html<Tablist>`
  <template
    role="tablist"
    focusgroup="tablist inline block"
    @focusin="${(x, c) => x.handleFocusIn(c.event as FocusEvent)}"
  >
    <slot name="tab" ${slotted('slottedTabs')}></slot>
  </template>
`;
