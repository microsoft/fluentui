import { getGlobalClassNames, getTheme, IStyle } from '@uifabric/styling';

export interface IUnifiedPickerStyleProps {}

export interface IUnifiedPickerStyles {
  pickerText: IStyle;
  pickerInput: IStyle;
  pickerDiv: IStyle;
}

const GlobalClassNames = {
  pickerText: 'ms-UnifiedPicker-text',
  pickerInput: 'ms-UnifiedPicker-input',
  pickerDiv: 'ms-UnifiedPicker-div',
};

export const getStyles = (props: IUnifiedPickerStyleProps): IUnifiedPickerStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  // const { semanticColors } = theme;
  const { neutralTertiary, themeLight } = theme.palette;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    pickerText: [
      classNames.pickerText,
      {
        display: 'flex',
        flex: '1 1 auto',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxSizing: 'border-box',
        border: `1px solid ${neutralTertiary}`,
        minWidth: '180px',
        padding: '1px',
        minHeight: '32px',
        selectors: {
          '&:hover': {
            borderColor: themeLight,
          },
        },
      },
    ],
    pickerInput: [
      classNames.pickerInput,
      {
        display: 'flex',
        flex: '1 1 auto',
        height: '34px',
        border: 'none',
        flexGrow: '1',
        outline: 'none',
        padding: '0 6px 0px',
        margin: '1px',
        selectors: {
          '&::-ms-clear': {
            display: 'none',
          },
        },
      },
    ],
    pickerDiv: [
      classNames.pickerDiv,
      {
        display: 'flex',
        flex: '1 1 auto',
      },
    ],
  };
};
