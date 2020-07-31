import { customElement } from '@microsoft/fast-element';
import { Tab, TabTemplate as template } from '@microsoft/fast-foundation';
import { TabStyles as styles } from './tab.styles';

/**
 * The FAST Tab Custom Element. Implements {@link @microsoft/fast-foundation#Tab},
 * {@link @microsoft/fast-foundation#TabTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tab\>
 */
@customElement({
  name: 'fast-tab',
  template,
  styles,
})
export class FASTTab extends Tab {}
