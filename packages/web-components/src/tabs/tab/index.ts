import { Tab, tabTemplate as template } from '@microsoft/fast-foundation';
import { tabStyles as styles } from './tab.styles';

/**
 * The Fluent Tab Custom Element. Implements {@link @microsoft/fast-foundation#Tab},
 * {@link @microsoft/fast-foundation#tabTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tab\>
 */
export const fluentTab = Tab.compose({
  baseName: 'tab',
  template,
  styles,
});

/**
 * Styles for Tab
 * @public
 */
export const tabStyles = styles;

/**
 * Tab base class
 * @public
 */
export { Tab };
