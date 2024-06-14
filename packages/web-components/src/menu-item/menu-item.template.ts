import type { ElementViewTemplate } from '@microsoft/fast-element';
import { elements, html, slotted, when } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import { MenuItemRole } from './menu-item.js';
import type { MenuItem, MenuItemOptions } from './menu-item.js';

const Checkmark16Filled = html.partial(
  `<svg fill="currentColor" class="___12fm75w f1w7gpdv fez10in fg4l7m0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 014.9 12L2.22 9.28a.75.75 0 111.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 011.06.04z" fill="currentColor"></path></svg>`,
);
const chevronRight16Filled = html.partial(
  `<svg fill="currentColor" class="___12fm75w f1w7gpdv fez10in fg4l7m0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.74 3.2a.75.75 0 00-.04 1.06L9.23 8 5.7 11.74a.75.75 0 101.1 1.02l4-4.25a.75.75 0 000-1.02l-4-4.25a.75.75 0 00-1.06-.04z" fill="currentColor"></path></svg>`,
);

export function menuItemTemplate<T extends MenuItem>(options: MenuItemOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      aria-haspopup="${x => (!!x.submenu ? 'menu' : void 0)}"
      aria-checked="${x => (x.role !== MenuItemRole.menuitem ? x.checked : void 0)}"
      aria-disabled="${x => x.disabled}"
      aria-expanded="${x => (!!x.submenu ? 'false' : void 0)}"
      @keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
      @click="${(x, c) => x.handleMenuItemClick(c.event as MouseEvent)}"
      @mouseover="${(x, c) => x.handleMouseOver(c.event as MouseEvent)}"
      @mouseout="${(x, c) => x.handleMouseOut(c.event as MouseEvent)}"
      @toggle="${(x, c) => x.toggleHandler(c.event as ToggleEvent)}"
    >
      ${when(
        x => x.role === MenuItemRole.menuitemcheckbox,
        html<MenuItem>`
          <span part="checkbox" class="checkbox">
            <slot name="checkbox-indicator"> ${staticallyCompose(options.checkboxIndicator)} </slot>
          </span>
        `,
      )}
      ${when(
        x => x.role === MenuItemRole.menuitemradio,
        html<MenuItem>`
          <span part="radio" class="radio">
            <slot name="radio-indicator"> ${staticallyCompose(options.radioIndicator)} </slot>
          </span>
        `,
      )}
      ${startSlotTemplate(options)}
      <div part="content" class="content">
        <slot></slot>
      </div
      ${endSlotTemplate(options)}
      ${when(
        x => !!x.submenu,
        html<T>`
          <div part="expand-collapse-glyph-container" class="expand-collapse-glyph-container">
            <slot name="expand-collapse-indicator"> ${staticallyCompose(options.expandCollapseGlyph)} </slot>
          </div>
        `,
      )}

        <slot
          name="submenu"
          ${slotted({
            property: 'slottedSubmenu',
            filter: elements("[role='menu']"),
          })}
        ></slot>

    </template>
  `;
}

export const template: ElementViewTemplate<MenuItem> = menuItemTemplate({
  checkboxIndicator: Checkmark16Filled,
  expandCollapseGlyph: chevronRight16Filled,
  radioIndicator: Checkmark16Filled,
});
