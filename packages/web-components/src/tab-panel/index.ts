import { customElement } from '@microsoft/fast-element';
import { TabPanel } from './tab-panel';
import { tabPanelTemplate as template } from './tab-panel.template';
import { tabPanelStyles as styles } from './tab-panel.styles';

/**
 * THe Tab Panel component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-tab-panel>`
 */
@customElement({
  name: 'fluent-tab-panel',
  template,
  styles,
})
export class FluentTabPanel extends TabPanel {}
