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
    <svg
        aria-hidden="true"
        part="checked-indicator"
        class="checked-indicator"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
        />
    </svg>
  `,
  indeterminateIndicator: `
    <div part="indeterminate-indicator" class="indeterminate-indicator"></div>
  `,
});

/**
 * Styles for Checkbox
 * @public
 */
export const checkboxStyles = styles;
