import { customElement } from '@microsoft/fast-element';
import { TabPanel, TabPanelTemplate as template } from '@microsoft/fast-foundation';
import { TabPanelStyles as styles } from './tab-panel.styles';

/**
 * The Fluent Tab Panel Custom Element. Implements {@link @microsoft/fast-foundation#TabPanel},
 * {@link @microsoft/fast-foundation#TabPanelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tab-panel\>
 */
@customElement({
  name: 'fluent-tab-panel',
  template,
  styles,
})
export class FluentTabPanel extends TabPanel {}

/**
 * Styles for TabPanel
 * @public
 */
export const TabPanelStyles = styles;
