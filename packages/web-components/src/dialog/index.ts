import { Dialog, dialogTemplate as template } from '@microsoft/fast-foundation';
import { dialogStyles as styles } from './dialog.styles';

/**
 * The Fluent Dialog Element. Implements {@link @microsoft/fast-foundation#Dialog},
 * {@link @microsoft/fast-foundation#dialogTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dialog\>
 */
export const fluentDialog = Dialog.compose({
  baseName: 'dialog',
  template,
  styles,
});

/**
 * Styles for Dialog
 * @public
 */
export const dialogStyles = styles;

/**
 * Base Dialog Class
 * @public
 */
export { Dialog };
