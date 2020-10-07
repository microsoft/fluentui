import { customElement } from '@microsoft/fast-element';
import { Tab, TabTemplate as template } from '@microsoft/fast-foundation';
import { TabStyles as styles } from './tab.styles';

/**
 * The Fluent Tab Custom Element. Implements {@link @microsoft/fast-foundation#Tab},
 * {@link @microsoft/fast-foundation#TabTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tab\>
 */
@customElement({
  name: 'fluent-tab',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentTab extends Tab {}

/**
 * Styles for Tab
 * @public
 */
export const TabStyles = styles;
