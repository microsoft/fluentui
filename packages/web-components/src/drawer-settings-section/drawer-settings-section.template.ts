import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import { startSlotTemplate } from '@microsoft/fast-foundation';
import type { DrawerSettingsSection } from './drawer-settings-section.js';

/**
 * The template for the PaneSettingsItem component.
 * @public
 */

export function drawerSettingsSectionTemplate<T extends DrawerSettingsSection>(): ElementViewTemplate<T> {
  return html<T>`
    <template controls="${x => x.controls}">
      <div class="root">
        ${startSlotTemplate({})}
        <slot></slot>
        <div class="toggle">
          <fluent-switch
            @change="${(x, c) => x.handleSwitchChange()}"
            aria-controls="${x => x.controls}"
            size="small"
            ${ref('switch')}
          ></fluent-switch>
          ${startSlotTemplate({})}
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<DrawerSettingsSection> = drawerSettingsSectionTemplate();
