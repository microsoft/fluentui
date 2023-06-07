import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the Drawer component.
 * @public
 */
export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="complementary"
      ?open="${x => x.open}"
      position="${x => x.position}"
      focus-target="${x => x.focusTarget}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-hidden="${x => (x.open ? 'false' : 'true')}"
      aria-label="${x => x.ariaLabel}"
      trap-focus="${x => x.trapFocus}"
      tabindex="${x => (x.open ? '0' : '-1')}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
    >
      <div class="root" part="root">
        <div
          class="drawer"
          part="drawer"
          aria-modal="${x => (x.modal ? 'true' : 'false')}"
          aria-describedby="${x => x.ariaDescribedby}"
          aria-labelledby="${x => x.ariaLabelledby}"
          aria-label="${x => x.ariaLabel}"
          ${ref('drawer')}
        >
          ${when(
            x => x.toolbar,
            html<T>`
              <div class="toolbar" part="toolbar">
                <slot name="toolbar"></slot>
              </div>
            `,
          )}
          <div class="header" part="header">
            <slot name="header"></slot>
          </div>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <div class="actions" part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
        ${when(x => x.modal && x.open, html<T>` <div class="overlay" part="overlay" role="presentation"></div> `)}
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
