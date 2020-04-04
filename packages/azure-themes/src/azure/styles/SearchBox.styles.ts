import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.textFieldBorder} !important`,
        selectors: {
          '&:hover': {
            border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.textFieldBorderHover} !important`,
          },
          '::after': {
            borderColor: extendedSemanticColors.textFieldBorderActiveFocus,
          },
        },
      },
      hasFocus && {
        border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.textFieldBorderActiveFocus} !important`,
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
