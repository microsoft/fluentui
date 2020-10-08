import { customElement } from '@microsoft/fast-element';
import { Divider, DividerTemplate as template } from '@microsoft/fast-foundation';
import { DividerStyles as styles } from './divider.styles';

/**
 * The Fluent Divider Element. Implements {@link @microsoft/fast-foundation#Divider},
 * {@link @microsoft/fast-foundation#DividerTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-divider\>
 */
@customElement({
  name: 'fluent-divider',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentDivider extends Divider {}

/**
 * Styles for Divider
 * @public
 */
export const DividerStyles = styles;
