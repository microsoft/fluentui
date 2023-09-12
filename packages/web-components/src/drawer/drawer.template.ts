import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the Drawer component.
 * @public
 */

export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      ?open="${x => x.open}"
      ?modal="${x => x.modal}"
      size="${x => x.size}"
      position="${x => x.position}"
      role="${x => (x.modal ? 'dialog' : 'complementary')}"
      tabindex="${x => (x.open ? '0' : '-1')}"
      aria-hidden="${x => (x.open ? 'false' : 'true')}"
      aria-label="${x => x.ariaLabel}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
      @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    >
      <div
        class="overlay"
        part="overlay"
        ?hidden="${x => !x.modal || !x.open}"
        aria-hidden="${x => !x.modal || !x.open}"
        role="presentation"
      ></div>
      <div class="root" part="root" ${ref('root')}>
        <slot name="start"></slot>
        <div class="header-container">
          <slot name="navigation"></slot>
          <slot name="header"></slot>
        </div>
        <div class="content" part="content" ${ref('content')}>
          <slot></slot>
        </div>
        <slot name="footer"></slot>
        <slot name="end"></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
