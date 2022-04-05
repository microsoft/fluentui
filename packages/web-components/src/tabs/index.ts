import { Tabs, tabsTemplate as template } from '@microsoft/fast-foundation';
import { tabsStyles as styles } from './tabs.styles';

/**
 * The Fluent Tabs Custom Element. Implements {@link @microsoft/fast-foundation#Tabs},
 * {@link @microsoft/fast-foundation#tabsTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tabs\>
 */
export const fluentTabs = Tabs.compose({
  baseName: 'tabs',
  template,
  styles,
});

export * from './tab';
export * from './tab-panel';

/**
 * Styles for Tabs
 * @public
 */
export const tabsStyles = styles;

/**
 * Tabs base class
 * @public
 */
export { Tabs };
