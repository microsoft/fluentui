import { html, ref } from '@microsoft/fast-element';
import type { TreeItem } from './tree-item.js';

const chevronIcon = html`
  <svg viewBox="0 0 12 12" fill="currentColor">
    <path
      d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"
    ></path>
  </svg>
`;

export const template = html<TreeItem>`
  <template slot="${x => (x.isNestedItem ? 'item' : void 0)}">
    <div class="positioning-region" part="positioning-region">
      <div class="content" part="content">
        <span class="chevron" part="chevron" aria-hidden="true">
          <slot name="chevron">${chevronIcon}</slot>
        </span>
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </div>
      <div class="aside" part="aside">
        <slot name="aside"></slot>
      </div>
    </div>
    <div role="group" class="items" part="items">
      <slot name="item" ${ref('itemSlot')} @slotchange="${x => x.handleItemSlotChange()}"></slot>
    </div>
  </template>
`;
