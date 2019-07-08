import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus, hasInput, underlined } = props;
  const { effects, semanticColors } = theme;

  return {
    root: [
      {
        borderRadius: effects.roundedCorner2,
        borderColor: semanticColors.inputBorder,
        paddingTop: 0,
        paddingBottom: 0,
        selectors: {
          ':hover ': {
            borderColor: semanticColors.inputBorderHovered
          },
          ':active': {
            borderColor: semanticColors.inputFocusBorderAlt
          }
        }
      },
      !hasFocus &&
        hasInput && {
          selectors: {
            '.ms-SearchBox-iconContainer': {
              width: 4
            },
            '.ms-SearchBox-icon': {
              opacity: 0
            }
          }
        },
      hasInput && {
        borderColor: semanticColors.smallInputBorder
      },
      hasFocus && {
        borderColor: semanticColors.inputFocusBorderAlt
      },
      underlined && {
        borderRadius: 0
      }
    ],
    iconContainer: {
      color: semanticColors.inputBackgroundCheckedHovered
    },
    field: {
      paddingLeft: 6
    },
    clearButton: {
      padding: 0,
      selectors: {
        '&:hover .ms-Button': {
          backgroundColor: semanticColors.buttonBackground
        },
        '&:hover .ms-Button-icon': {
          color: semanticColors.buttonText
        },
        '.ms-Button-icon': {
          color: semanticColors.inputPlaceholderText
        }
      }
    }
  };
};
