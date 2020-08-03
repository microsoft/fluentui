import { customElement } from '@microsoft/fast-element';
import { Dialog, DialogTemplate as template } from '@microsoft/fast-foundation';
import { DialogStyles as styles } from './dialog.styles';

/**
 * The FAST Dialog Element. Implements {@link @microsoft/fast-foundation#Dialog},
 * {@link @microsoft/fast-foundation#DialogTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-dialog\>
 */
@customElement({
  name: 'fast-dialog',
  template,
  styles,
})
export class FASTDialog extends Dialog {}

/**
 * Styles for Dialog
 * @public
 */
export const DialogStyles = styles;
