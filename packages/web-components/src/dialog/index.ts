import { customElement } from '@microsoft/fast-element';
import { Dialog, DialogTemplate as template } from '@microsoft/fast-foundation';
import { DialogStyles as styles } from './dialog.styles';

/**
 * The Fluent Dialog Element. Implements {@link @microsoft/fast-foundation#Dialog},
 * {@link @microsoft/fast-foundation#DialogTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dialog\>
 */
@customElement({
  name: 'fluent-dialog',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentDialog extends Dialog {}

/**
 * Styles for Dialog
 * @public
 */
export const DialogStyles = styles;
