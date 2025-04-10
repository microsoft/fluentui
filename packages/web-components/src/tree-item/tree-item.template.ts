import { children, html } from '@microsoft/fast-element';
import type { TreeItem } from './tree-item.js';
import { isTreeItem } from './tree-item.options.js';

const chevronIcon = html`
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path
      d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"
    ></path>
  </svg>
`;

export const template = html<TreeItem>`
  <template
    tabindex="-1"
    slot="${x => (x.isNestedItem ? 'item' : void 0)}"
    @focusin="${(x, c) => x.focusHandler(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.blurHandler(c.event as FocusEvent)}"
    ${children({
      property: 'childTreeItems',
      filter: node => isTreeItem(node),
    })}
  >
    <div class="positioning-region" part="positioning-region">
      <div class="content" part="content">
        <span class="chevron" part="chevron">
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
      <slot name="item"></slot>
    </div>
  </template>
`;
