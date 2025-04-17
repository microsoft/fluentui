import { children, elements, html } from '@microsoft/fast-element';
import { isTreeItem } from '../tree-item/tree-item.options.js';
import type { Tree } from './tree.js';

export const template = html<Tree>`
  <template
    tabindex="0"
    @click="${(x, c) => x.clickHandler(c.event)}"
    @focusin="${(x, c) => x.focusHandler(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.blurHandler(c.event as FocusEvent)}"
    @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    @change="${(x, c) => x.changeHandler(c.event)}"
    ${children({
      property: 'childTreeItems',
      filter: node => isTreeItem(node),
    })}
  >
    <slot></slot>
  </template>
`;
