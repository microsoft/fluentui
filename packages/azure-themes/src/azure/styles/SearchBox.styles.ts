import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus } = props;
  const { semanticColors } = theme;

  return {
    root: [
      hasFocus && {
        borderColor: semanticColors.focusBorder,
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
