import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { DrawerSettingsSection } from './drawer-settings-section.js';

/**
 * The template for the PaneSettingsItem component.
 * @public
 */

export function drawerSettingsSectionTemplate<T extends DrawerSettingsSection>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div class="root">
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <div class="content">
          <div class="header">
            <slot name="header"></slot>
          </div>
          <div class="body">
            <slot name="body"></slot>
          </div>
        </div>
        <div class="toggle">
          <fluent-switch @change="${(x, c) => x.handleSwitchChange()}" size="small" ${ref('switch')}></fluent-switch>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<DrawerSettingsSection> = drawerSettingsSectionTemplate();
