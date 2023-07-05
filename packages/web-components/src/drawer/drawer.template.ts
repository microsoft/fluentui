import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the {@link @microsoft/fast-foundation#FASTTabPanel} component.
 * @public
 */
export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      slot="drawer"
      role="${x => (x.modal ? 'dialog' : 'complementary')}"
      ?compact="${x => x.compact}"
      ?modal="${x => x.modal}"
      control-size="${x => x.controlSize}"
      position="${x => x.position}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
    >
      <div
        class="drawer"
        part="drawer"
        aria-modal="${x => (x.modal ? 'true' : 'false')}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-label="${x => x.ariaLabel}"
      >
        <div class="header-container">
          <div class="header">
            <slot name="header"></slot>
          </div>
          <div class="close">
            <fluent-button tabindex="${x => (x.open ? '0' : '-1')}" appearance="transparent" icon-only>
              <slot name="close-icon"></slot>
            </fluent-button>
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
