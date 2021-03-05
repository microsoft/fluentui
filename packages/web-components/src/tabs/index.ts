import { customElement } from '@microsoft/fast-element';
import { Tabs, TabsTemplate as template } from '@microsoft/fast-foundation';
import { TabsStyles as styles } from './tabs.styles';

/**
 * The Fluent Tabs Custom Element. Implements {@link @microsoft/fast-foundation#Tabs},
 * {@link @microsoft/fast-foundation#TabsTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tabs\>
 */
@customElement({
  name: 'fluent-tabs',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentTabs extends Tabs {}
export * from './tab/';
export * from './tab-panel/';

/**
 * Styles for Tabs
 * @public
 */
export const TabsStyles = styles;
