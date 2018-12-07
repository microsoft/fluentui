import { getGlobalClassNames, hiddenContentStyle } from '../../Styling';
import { IBasePickerStyleProps, IBasePickerStyles } from './BasePicker.types';

const GlobalClassNames = {
  root: 'ms-BasePicker',
  text: 'ms-BasePicker-text',
  itemsWrapper: 'ms-BasePicker-itemsWrapper',
  input: 'ms-BasePicker-input'
};

export function getStyles(props: IBasePickerStyleProps): IBasePickerStyles {
  const { className, theme, isFocused, inputClassName } = props;

  if (!theme) {
    throw new Error('theme is undefined or null in base BasePicker getStyles function.');
  }
  const { semanticColors } = theme;
  const { inputBorder, inputBorderHovered, inputFocusBorderAlt } = semanticColors;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, className],
    text: [
      classNames.text,
      {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxSizing: 'border-box',
        minWidth: 180,
        minHeight: 30,
        border: `1px solid ${inputBorder}`
      },
      !isFocused && {
        selectors: {
          ':hover': {
            borderColor: inputBorderHovered
          }
        }
      },
      isFocused && {
        borderColor: inputFocusBorderAlt
      }
    ],
    itemsWrapper: [
      classNames.itemsWrapper,
      {
        display: 'flex',
        flexWrap: 'wrap'
      }
    ],
    input: [
      classNames.input,
      {
        height: 34,
        border: 'none',
        flexGrow: 1,
        outline: 'none',
        padding: '0 6px 0',
        alignSelf: 'flex-end'
      },
      inputClassName
    ],
    screenReaderText: hiddenContentStyle
  };
}
