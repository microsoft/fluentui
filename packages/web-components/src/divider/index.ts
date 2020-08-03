import { customElement } from '@microsoft/fast-element';
import { Divider, DividerTemplate as template } from '@microsoft/fast-foundation';
import { DividerStyles as styles } from './divider.styles';

/**
 * The FAST Divider Element. Implements {@link @microsoft/fast-foundation#Divider},
 * {@link @microsoft/fast-foundation#DividerTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-divider\>
 */
@customElement({
  name: 'fast-divider',
  template,
  styles,
})
export class FASTDivider extends Divider {}

/**
 * Styles for Divider
 * @public
 */
export const DividerStyles = styles;
