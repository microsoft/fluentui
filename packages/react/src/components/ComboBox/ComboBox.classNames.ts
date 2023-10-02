import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import type { IComboBoxStyles, IComboBoxOptionStyles } from './ComboBox.types';

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
  screenReaderText: string;
}

export interface IComboBoxOptionClassNames {
  optionText: string;
  root: string;
  optionTextWrapper: string;
}

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
    // const mergeStyles = mergeStylesShadow(styles.__shadowConfig__);

    return {
      container: mergeStyles(styles.__shadowConfig__, 'ms-ComboBox-container', className, styles.container),
      label: mergeStyles(styles.__shadowConfig__, styles.label, disabled && styles.labelDisabled),
      root: mergeStyles(
        styles.__shadowConfig__,
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
      input: mergeStyles(styles.__shadowConfig__, 'ms-ComboBox-Input', styles.input, disabled && styles.inputDisabled),
      errorMessage: mergeStyles(styles.__shadowConfig__, styles.errorMessage),
      callout: mergeStyles(styles.__shadowConfig__, 'ms-ComboBox-callout', styles.callout),
      optionsContainerWrapper: mergeStyles(
        styles.__shadowConfig__,
        'ms-ComboBox-optionsContainerWrapper',
        styles.optionsContainerWrapper,
      ),
      optionsContainer: mergeStyles(styles.__shadowConfig__, 'ms-ComboBox-optionsContainer', styles.optionsContainer),
      header: mergeStyles(styles.__shadowConfig__, 'ms-ComboBox-header', styles.header),
      divider: mergeStyles(styles.__shadowConfig__, 'ms-ComboBox-divider', styles.divider),
      screenReaderText: mergeStyles(styles.__shadowConfig__, styles.screenReaderText),
    };
  },
);

export const getComboBoxOptionClassNames = memoizeFunction(
  (styles: Partial<IComboBoxOptionStyles>): IComboBoxOptionClassNames => {
    // const mergeStyles = mergeStylesShadow(styles.__shadowConfig__);
    return {
      optionText: mergeStyles('ms-ComboBox-optionText', styles.optionText),
      root: mergeStyles('ms-ComboBox-option', styles.root, {
        selectors: {
          ':hover': styles.rootHovered,
          ':focus': styles.rootFocused,
          ':active': styles.rootPressed,
        },
      }),
      optionTextWrapper: mergeStyles(styles.__shadowConfig__, styles.optionTextWrapper),
    };
  },
);
