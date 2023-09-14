import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the Drawer component.
 * @public
 */
export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <template ?inert="${x => !x.open}" ?open="${x => x.open}" size="${x => x.size}" position="${x => x.position}">
      ${when(
        x => x.modal,
        html<T>`
          <div
            class="overlay"
            part="overlay"
            role="presentation"
            ?hidden="${x => !x.open}"
            @click="${x => x.hide()}"
          ></div>
        `,
      )}
      <div
        class="drawer"
        part="drawer"
        role="${x => (x.modal ? 'dialog' : 'complementary')}"
        tabindex="${x => (x.open ? '0' : '-1')}"
        aria-label="${x => x.ariaLabel}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-modal="${x => (x.modal ? 'true' : 'false')}"
        @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
        ${ref('drawer')}
      >
        <slot name="start"></slot>
        <div class="header">
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
