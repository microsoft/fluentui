import { children, elements, html } from '@microsoft/fast-element';
import type { Tree } from './tree.js';

export const template = html<Tree>`
  <template
    tabindex="0"
    @click="${(x, c) => x.handleClick(c.event)}"
    @focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
    @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    @change="${(x, c) => x.handleSelectedChange(c.event)}"
    ${children({
      property: 'childTreeItems',
      filter: elements(),
    })}
  >
    <slot></slot>
  </template>
`;
