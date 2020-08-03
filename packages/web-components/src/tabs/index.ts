import { customElement } from '@microsoft/fast-element';
import { Tabs, TabsTemplate as template } from '@microsoft/fast-foundation';
import { TabsStyles as styles } from './tabs.styles';

/**
 * The FAST Tabs Custom Element. Implements {@link @microsoft/fast-foundation#Tabs},
 * {@link @microsoft/fast-foundation#TabsTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tabs\>
 */
@customElement({
  name: 'fast-tabs',
  template,
  styles,
})
export class FASTTabs extends Tabs {}
export * from './tab/';
export * from './tab-panel/';
