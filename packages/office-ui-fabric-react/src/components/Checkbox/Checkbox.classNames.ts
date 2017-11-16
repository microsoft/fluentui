import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { ICheckboxStyles } from './Checkbox.types';

export interface ICheckboxClassNames {
  root: string;
  label: string;
  checkbox: string;
  checkmark: string;
  text: string;
}

export const getClassNames = memoizeFunction((
  styles: ICheckboxStyles,
  disabled: boolean,
  isChecked: boolean,
  isReversed: boolean,
  className?: string
): ICheckboxClassNames => {
  return {
    root: mergeStyles(
      'ms-Checkbox',
      isReversed && 'reversed',
      isChecked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      className,
      styles.root,
      !disabled && [
        !isChecked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': styles.checkboxHovered,
            ':focus .ms-Checkbox-checkbox': styles.checkboxFocused
          }
        },
        isChecked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': styles.checkboxCheckedHovered,
            ':focus .ms-Checkbox-checkbox': styles.checkboxCheckedFocused
          }
        },
        {
          selectors: {
            ':hover .ms-Checkbox-text': styles.textHovered,
            ':focus .ms-Checkbox-text': styles.textFocused
          }
        }
      ]
    ),

    label: mergeStyles(
      'ms-Checkbox-label',
      styles.label,
      isReversed && styles.labelReversed,
      disabled && styles.labelDisabled
    ),

    checkbox: mergeStyles(
      'ms-Checkbox-checkbox',
      styles.checkbox,
      !disabled && isChecked && styles.checkboxChecked,
      disabled && !isChecked && styles.checkboxDisabled,
      disabled && isChecked && styles.checkboxCheckedDisabled,
    ),

    checkmark: mergeStyles(
      styles.checkmark,
      !disabled && isChecked && styles.checkmarkChecked,
      disabled && !isChecked && styles.checkmarkDisabled,
      disabled && isChecked && styles.checkmarkCheckedDisabled,
    ),

    text: mergeStyles(
      'ms-Checkbox-text',
      styles.text,
      disabled && styles.textDisabled
    ),
  };
});
