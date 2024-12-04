import { children, elements, html } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import type { TreeView } from './tree-view.js';

export const template = html<TreeView>`
  <template
    tabindex="0"
    @click="${(x, c) => x.handleClick(c.event)}"
    @focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
    @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    @selected-change="${(x, c) => x.handleSelectedChange(c.event)}"
    ${children({
  property: 'childTreeItems',
  filter: elements(`${FluentDesignSystem.prefix}-tree-item`),
})}
  >
    <slot></slot>
  </template>
`;
