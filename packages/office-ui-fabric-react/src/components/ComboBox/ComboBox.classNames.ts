import {
  IComboBoxStyles,
  IComboBoxOptionStyles,
  IComboBoxClassNames,
  IComboBoxOptionClassNames,
} from './ComboBox.types';
import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';

export const getClassNames = memoizeFunction(
  (
    styles: Partial<IComboBoxStyles>,
    className: string,
    isOpen: boolean,
    disabled: boolean,
    required: boolean,
    focused: boolean,
    allowFreeForm: boolean,
    hasErrorMessage: boolean,
  ): IComboBoxClassNames => {
    return {
      container: mergeStyles('ms-ComboBox-container', className, styles.container),
      label: mergeStyles(styles.label, disabled && styles.labelDisabled),
      root: mergeStyles(
        'ms-ComboBox',
        hasErrorMessage ? styles.rootError : isOpen && 'is-open',
        required && 'is-required',
        styles.root,
        !allowFreeForm && styles.rootDisallowFreeForm,
        hasErrorMessage && !focused ? styles.rootError : !disabled && focused && styles.rootFocused,
        !disabled && {
          selectors: {
            ':hover': hasErrorMessage ? styles.rootError : !isOpen && !focused && styles.rootHovered,
            ':active': hasErrorMessage ? styles.rootError : styles.rootPressed,
            ':focus': hasErrorMessage ? styles.rootError : styles.rootFocused,
          },
        },
        disabled && ['is-disabled', styles.rootDisabled],
      ),
      input: mergeStyles('ms-ComboBox-Input', styles.input, disabled && styles.inputDisabled),
      errorMessage: mergeStyles(styles.errorMessage),
      callout: mergeStyles('ms-ComboBox-callout', styles.callout),
      optionsContainerWrapper: mergeStyles('ms-ComboBox-optionsContainerWrapper', styles.optionsContainerWrapper),
      optionsContainer: mergeStyles('ms-ComboBox-optionsContainer', styles.optionsContainer),
      header: mergeStyles('ms-ComboBox-header', styles.header),
      divider: mergeStyles('ms-ComboBox-divider', styles.divider),
      screenReaderText: mergeStyles(styles.screenReaderText),
    };
  },
);

export const getComboBoxOptionClassNames = memoizeFunction(
  (styles: Partial<IComboBoxOptionStyles>): IComboBoxOptionClassNames => {
    return {
      optionText: mergeStyles('ms-ComboBox-optionText', styles.optionText),
      root: mergeStyles('ms-ComboBox-option', styles.root, {
        selectors: {
          ':hover': styles.rootHovered,
          ':focus': styles.rootFocused,
          ':active': styles.rootPressed,
        },
      }),
      optionTextWrapper: mergeStyles(styles.optionTextWrapper),
    };
  },
);
