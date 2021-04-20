import { TabPanel, tabPanelTemplate as template } from '@microsoft/fast-foundation';
import { tabPanelStyles as styles } from './tab-panel.styles';

/**
 * The FAST Tab Panel Custom Element. Implements {@link @microsoft/fast-foundation#TabPanel},
 * {@link @microsoft/fast-foundation#tabPanelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tab-panel\>
 */
export const fluentTabPanel = TabPanel.compose({
  baseName: 'tab-panel',
  template,
  styles,
});

/**
 * Styles for TabPanel
 * @public
 */
export const tabPanelStyles = styles;
