import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { TabPanel } from './tab-panel.js';

export function tabPanelTemplate<T extends TabPanel>(): ElementViewTemplate<T> {
  return html<T>`
    <template slot="tabpanel" role="tabpanel">
      <slot></slot>
    </template>
  `;
}

export const template = tabPanelTemplate();
