import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import * as StyleConstants from '../Constants';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus } = props;
  const { semanticColors } = theme;

  return {
    root: [
      {
        border: `${StyleConstants.borderWidth} solid ${semanticColors.textFieldBorder} !important`,
        selectors: {
          '&:hover': {
            border: `${StyleConstants.borderWidth} solid ${semanticColors.textFieldBorderHover} !important`,
          },
          '::after': {
            borderColor: semanticColors.textFieldBorderActiveFocus,
          },
        },
      },
      hasFocus && {
        border: `${StyleConstants.borderWidth} solid ${semanticColors.textFieldBorderActiveFocus} !important`,
      },
      !hasFocus && {
        borderColor: semanticColors.inputBorder,
        selectors: {
          '&:hover': {
            borderColor: semanticColors.inputBorderHovered,
          },
        },
      },
    ],
    clearButton: {
      selectors: {
        '.ms-Button': {
          color: semanticColors.inputText,
          selectors: {
            ':hover': {
              color: semanticColors.inputText,
            },
            ':active': {
              color: semanticColors.inputText,
            },
          },
        },
      },
    },
    field: {
      color: semanticColors.inputText,
    },
    icon: {
      color: semanticColors.focusBorder,
    },
  };
};
