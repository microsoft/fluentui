import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation';
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
      ?open="${x => x.open}"
      ?compact="${x => x.compact}"
      ?modal="${x => x.modal}"
      control-size="${x => x.controlSize}"
      position="${x => x.position}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
      tabindex="${x => (x.expanded ? '0' : '-1')}"
    >
      <div
        class="drawer"
        part="drawer"
        aria-modal="${x => (x.modal ? 'true' : 'false')}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-label="${x => x.ariaLabel}"
      >
        <slot name="toolbar" part="toolbar"></slot>
        ${startSlotTemplate({})}
        <slot></slot>
        ${endSlotTemplate({})}
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
