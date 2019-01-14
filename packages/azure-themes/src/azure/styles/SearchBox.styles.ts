import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus } = props;
  const { semanticColors } = theme;

  return {
    root: [
      hasFocus && {
        borderColor: semanticColors.focusBorder
      },
      !hasFocus && {
        borderColor: semanticColors.inputBorder,
        selectors: {
          '&:hover': {
            borderColor: semanticColors.inputBorderHovered
          }
        }
      }
    ],
    field: {
      color: semanticColors.inputText
    }
  };
};
