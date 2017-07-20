import { IComboBoxOption, IComboBoxProps, IComboBoxStyles } from './ComboBox.Props';
import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  mergeStyles,
} from '../../Styling';

export interface IComboBoxClassNames {
  container: string;
  root: string;
  input: string;
  caretButton: string;
  errorMessage: string;
  callout: string;
  items: string;
  item: string;
  itemSelected: string;
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
  allowFreeform: boolean
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
      focused && styles.rootFocused,
      !allowFreeform && styles.rootReadOnly,
    ) as string,
    input: mergeStyles(
      'ms-ComboBox-Input',
      styles.input,
    ) as string,
    caretButton: mergeStyles(
      'ms-ComboBox-Button',
      styles.caretButton
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
      disabled && 'is-disabled',
      styles.item,
      disabled && styles.itemDisabled,
    ) as string,
    itemSelected: mergeStyles(
      'is-selected',
      styles.itemSelected,
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