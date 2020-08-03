import { customElement } from '@microsoft/fast-element';
import { TabPanel, TabPanelTemplate as template } from '@microsoft/fast-foundation';
import { TabPanelStyles as styles } from './tab-panel.styles';

/**
 * The FAST Tab Panel Custom Element. Implements {@link @microsoft/fast-foundation#TabPanel},
 * {@link @microsoft/fast-foundation#TabPanelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tab-panel\>
 */
@customElement({
  name: 'fast-tab-panel',
  template,
  styles,
})
export class FASTTabPanel extends TabPanel {}

/**
 * Styles for TabPanel
 * @public
 */
export const TabPanelStyles = styles;
