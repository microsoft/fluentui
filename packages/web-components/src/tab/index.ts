import { customElement } from '@microsoft/fast-element';
import { Tab } from './tab';
import { tabTemplate as template } from './tab.template';
import { tabStyles as styles } from './tab.styles';

/**
 * THe Tab component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-tab>`
 */
@customElement({
  name: 'fluent-tab',
  template,
  styles,
})
export class FluentTab extends Tab {}
