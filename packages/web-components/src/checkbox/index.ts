import { Checkbox, CheckboxOptions, checkboxTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentCheckbox = Checkbox.compose<CheckboxOptions>({
  baseName: 'checkbox',
  template,
  styles,
  checkedIndicator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.86 3.66a.5.5 0 01-.02.7l-7.93 7.48a.6.6 0 01-.84-.02L2.4 9.1a.5.5 0 01.72-.7l2.4 2.44 7.65-7.2a.5.5 0 01.7.02z"/>
    </svg>
  `,
  indeterminateIndicator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8c0-.28.22-.5.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 8z"/>
    </svg>
  `,
});

/**
 * Styles for Checkbox
 * @public
 */
export const checkboxStyles = styles;
