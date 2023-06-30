import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { PaneSettingsItem } from './pane-settings-items.js';

/**
 * The template for the PaneSettingsItem component.
 * @public
 */

export function paneSettingsItemTemplate<T extends PaneSettingsItem>(): ElementViewTemplate<T> {
  return html<T>`
    <template bind-id="${x => x.bindID}">
      <div class="root">
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <div class="content">
          <slot name="header"></slot>
          <slot name="body"></slot>
        </div>
        <div class="toggle">
          <fluent-switch
            @change="${(x, c) => x.handleSwitchChange()}"
            bind-id="${x => x.bindID}"
            size="small"
          ></fluent-switch>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<PaneSettingsItem> = paneSettingsItemTemplate();
