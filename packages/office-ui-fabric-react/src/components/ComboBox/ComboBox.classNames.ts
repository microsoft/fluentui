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
  optionsContainerWrapper: string;
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
    ),
    label: mergeStyles(
      styles.label
    ),
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
    ),
    input: mergeStyles(
      'ms-ComboBox-Input',
      styles.input,
      disabled && styles.inputDisabled
    ),
    errorMessage: mergeStyles(
      styles.errorMessage
    ),
    callout: mergeStyles(
      'ms-ComboBox-callout',
      styles.callout
    ),
    optionsContainerWrapper: mergeStyles(
      'ms-ComboBox-optionsContainerWrapper',
      styles.optionsContainerWrapper
    ),
    optionsContainer: mergeStyles(
      'ms-ComboBox-optionsContainer',
      styles.optionsContainer
    ),
    header: mergeStyles(
      'ms-ComboBox-header',
      styles.header
    ),
    divider: mergeStyles(
      'ms-ComboBox-divider',
      styles.divider
    ),
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
    ),
  };
});
