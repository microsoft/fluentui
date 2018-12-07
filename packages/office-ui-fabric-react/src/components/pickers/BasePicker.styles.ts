import { getGlobalClassNames, hiddenContentStyle } from '../../Styling';
import { IBasePickerStyleProps, IBasePickerStyles } from './BasePicker.types';

const GlobalClassNames = {
  root: 'ms-BasePicker',
  text: 'ms-BasePicker-text',
  itemsWrapper: 'ms-BasePicker-itemsWrapper',
  input: 'ms-BasePicker-itemsWrapper'
};

export function getStyles<TItem>(props: IBasePickerStyleProps<TItem>): IBasePickerStyles {
  const { className, theme, isFocused, inputClassName } = props;

  if (!theme) {
    throw new Error('theme is undefined or null in base BasePicker getStyles function.');
  }

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, className],
    text: [classNames.text, {}],
    itemsWrapper: [classNames.itemsWrapper, {}],
    input: [classNames.input, {}, inputClassName],
    screenReaderText: hiddenContentStyle
  };
}
