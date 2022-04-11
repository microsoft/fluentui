import { html } from '@microsoft/fast-element';
import type { TabPanel } from './tab-panel';
/**
 * The template for the Tab Panel component.
 * @public
 */
export const tabPanelTemplate = html<TabPanel>`
  <template slot="tabpanel" role="tabpanel">
    <slot></slot>
  </template>
`;
