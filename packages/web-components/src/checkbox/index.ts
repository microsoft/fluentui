import { Checkbox, checkboxTemplate as template } from '@microsoft/fast-foundation';
import { checkboxStyles as styles } from './checkbox.styles';

/**
 * The Fluent Checkbox Element. Implements {@link @microsoft/fast-foundation#Checkbox},
 * {@link @microsoft/fast-foundation#checkboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-checkbox\>
 */
export const fluentCheckbox = Checkbox.compose({
  baseName: 'checkbox',
  template,
  styles,
});

/**
 * Styles for Checkbox
 * @public
 */
export const checkboxStyles = styles;
