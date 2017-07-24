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
  caretDown: string;
  errorMessage: string;
  callout: string;
  optionsContainer: string;
}

export interface IComboBoxOptionClassNames {
  header: string;
  divider: string;
  option: string;
  optionSelected: string;
  optionDisabled: string;
  optionText: string;
}

export const getClassNames = memoizeFunction((
  styles: IComboBoxStyles,
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
      !disabled && focused && styles.rootHoveredOrFocused,
      !disabled && {
        ':hover': styles.rootHoveredOrFocused
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
    caretDown: mergeStyles(
      'ms-ComboBox-CaretDown-button',
      styles.caretDown,
      !disabled && allowFreeForm && {
        ':hover': styles.caretDownHovered,
        ':active': styles.caretDownActive,
      },
      !allowFreeForm && styles.caretDownDisallowFreeForm,
      disabled && styles.caretDownDisabled,
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
  };
});

export const getComboBoxOptionClassNames = memoizeFunction((
  styles: IComboBoxOptionStyles,
): IComboBoxOptionClassNames => {
  return {
    option: mergeStyles(
      'ms-ComboBox-option',
      styles.option,
      {
        ':hover': styles.optionHovered,
        ':focus': styles.optionFocused,
        ':active': styles.optionActive
      },
    ) as string,
    optionSelected: mergeStyles(
      'is-selected',
      styles.optionSelected,
      {
        ':hover': styles.optionSelectedHovered
      },
    ) as string,
    optionDisabled: mergeStyles(
      'is-disabled',
      styles.optionDisabled,
    ) as string,
    header: mergeStyles(
      'ms-ComboBox-header',
      styles.header
    ) as string,
    divider: mergeStyles(
      'ms-ComboBox-divider',
      styles.divider
    ) as string,
    optionText: mergeStyles(
      'ms-ComboBox-optionText',
      styles.optionText
    ) as string,
  };
});