import { IComboBoxStyles, IComboBoxOptionStyles } from './ComboBox.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyles,
} from '../../Styling';

export interface IComboBoxClassNames {
  container: string;
  label: string;
  root: string;
  input: string;
  errorMessage: string;
  callout: string;
  optionsContainer: string;
  header: string;
  divider: string;
}

export interface IComboBoxOptionClassNames {
  optionText: string;
}

export const getClassNames = memoizeFunction((
  styles: Partial<IComboBoxStyles>,
  className: string,
  isOpen: boolean,
  disabled: boolean,
  required: boolean,
  focused: boolean,
  allowFreeForm: boolean,
  hasErrorMessage: boolean
): IComboBoxClassNames => {
  return {
    container: mergeStyles(
      'ms-ComboBox-container',
      className,
      styles.container,
    ) as string,
    label: mergeStyles(
      styles.label
    ) as string,
    root: mergeStyles(
      'ms-ComboBox',
      isOpen && 'is-open',
      required && 'is-required',
      styles.root,
      !allowFreeForm && styles.rootDisallowFreeForm,
      hasErrorMessage && styles.rootError,
      !disabled && focused && styles.rootFocused,
      !disabled && {
        selectors: {
          ':hover': styles.rootHovered
        }
      },
      disabled && [
        'is-disabled', styles.rootDisabled
      ],
    ) as string,
    input: mergeStyles(
      'ms-ComboBox-Input',
      styles.input,
      disabled && styles.inputDisabled
    ) as string,
    errorMessage: mergeStyles(
      styles.errorMessage
    ) as string,
    callout: mergeStyles(
      'ms-ComboBox-callout',
      styles.callout
    ) as string,
    optionsContainer: mergeStyles(
      'ms-ComboBox-optionsContainer',
      styles.optionsContainer
    ) as string,
    header: mergeStyles(
      'ms-ComboBox-header',
      styles.header
    ) as string,
    divider: mergeStyles(
      'ms-ComboBox-divider',
      styles.divider
    ) as string,
  };
});

export const getComboBoxOptionClassNames = memoizeFunction((
  styles: IComboBoxOptionStyles,
  optionIsSelected: boolean,
  disabled: boolean,
): IComboBoxOptionClassNames => {
  return {
    optionText: mergeStyles(
      'ms-ComboBox-optionText',
      styles.optionText
    ) as string,
  };
});