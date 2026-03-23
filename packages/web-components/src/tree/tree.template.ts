import { html, ref } from '@microsoft/fast-element';
import type { Tree } from './tree.js';

export const template = html<Tree>`
  <template
    focusgroup="menu nowrap nomemory"
    @click="${(x, c) => x.clickHandler(c.event)}"
    @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    @change="${(x, c) => x.changeHandler(c.event)}"
  >
    <slot ${ref('defaultSlot')} @slotchange="${x => x.handleDefaultSlotChange()}"></slot>
  </template>
`;
