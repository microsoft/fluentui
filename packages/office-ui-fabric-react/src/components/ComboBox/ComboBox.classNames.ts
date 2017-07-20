import { IComboBoxStyles } from './ComboBox.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyles,
} from '../../Styling';

export interface IComboBoxClassNames {
  container: string;
  root: string;
  input: string;
  caretDown: string;
  errorMessage: string;
  callout: string;
  items: string;
  item: string;
  itemSelected: string;
  itemDisabled: string;
  header: string;
  divider: string;
  optionText: string;
}

export const getClassNames = memoizeFunction((
  styles: IComboBoxStyles,
  className: string,
  isOpen: boolean,
  disabled: boolean,
  required: boolean,
  focused: boolean,
  readOnly: boolean,
  hasErrorMessage: boolean
): IComboBoxClassNames => {
  return {
    container: mergeStyles(
      'ms-ComboBox-container',
      styles.container,
    ) as string,
    root: mergeStyles(
      'ms-ComboBox',
      isOpen && 'is-open',
      disabled && 'is-disabled',
      required && 'is-required',
      className,
      styles.root,
      disabled && styles.rootDisabled,
      !disabled && focused && styles.rootHoveredOrFocused,
      !disabled && {
        ':hover': styles.rootHoveredOrFocused
      },
      readOnly && styles.rootReadOnly,
      hasErrorMessage && styles.rootError
    ) as string,
    input: mergeStyles(
      'ms-ComboBox-Input',
      styles.input,
      disabled && styles.inputDisabled
    ) as string,
    caretDown: mergeStyles(
      'ms-ComboBox-Button',
      styles.caretDown,
      !readOnly && {
        ':hover': styles.caretDownHovered,
        ':active': styles.caretDownActive,
      },
      disabled && styles.caretDownDisabled,
      readOnly && styles.caretDownReadOnly,
    ) as string,
    errorMessage: mergeStyles(
      styles.errorMessage
    ) as string,
    callout: mergeStyles(
      'ms-ComboBox-callout',
      styles.callout
    ) as string,
    items: mergeStyles(
      'ms-ComboBox-items',
      styles.items
    ) as string,
    item: mergeStyles(
      'ms-ComboBox-item',
      styles.item,
    ) as string,
    itemSelected: mergeStyles(
      'ms-ComboBox-item',
      'is-selected',
      styles.item,
      styles.itemSelected,
    ) as string,
    itemDisabled: mergeStyles(
      'ms-ComboBox-item',
      'is-disabled',
      styles.item,
      styles.itemDisabled,
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