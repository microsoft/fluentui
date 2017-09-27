import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { ICheckboxStyles } from './Checkbox.Props';

export interface ICheckboxClassNames {
  root: string;
  label: string;
  checkbox: string;
  checkmark: string;
  text: string;
}

export const getClassNames = memoizeFunction((
  styles: ICheckboxStyles,
  className: string,
  disabled: boolean,
  isChecked: boolean,
  isReversed: boolean
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
            ':hover .ms-Checkbox-checkbox': styles.checkboxHovered
          }
        },
        isChecked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': styles.checkboxCheckedHovered
          }
        },
        {
          selectors: {
            ':hover .ms-Checkbox-text': styles.textHovered
          }
        }
      ]
    ) as string,

    label: mergeStyles(
      'ms-Checkbox-label',
      styles.label,
      isReversed && styles.labelReversed,
      disabled && styles.labelDisabled
    ) as string,

    checkbox: mergeStyles(
      'ms-Checkbox-checkbox',
      styles.checkbox,
      !disabled && isChecked && styles.checkboxChecked,
      disabled && !isChecked && styles.checkboxDisabled,
      disabled && isChecked && styles.checkboxCheckedDisabled,
    ) as string,

    checkmark: mergeStyles(
      styles.checkmark,
      !disabled && isChecked && styles.checkmarkChecked,
      disabled && !isChecked && styles.checkmarkDisabled,
      disabled && isChecked && styles.checkmarkCheckedDisabled,
    ) as string,

    text: mergeStyles(
      'ms-Checkbox-text',
      styles.text,
      disabled && styles.textDisabled
    ) as string,
  };
});
