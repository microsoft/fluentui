import { customElement } from '@microsoft/fast-element';
import { Tabs } from './tabs';
import { tabsTemplate as template } from './tabs.template';
import { tabsStyles as styles } from './tabs.styles';

/**
 * THe Tabs component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-tabs>`
 */
@customElement({
  name: 'fluent-tabs',
  template,
  styles,
})
export class FluentTabs extends Tabs {}
