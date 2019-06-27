import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus, hasInput, underlined } = props;
  const { effects, palette } = theme;

  return {
    root: [
      {
        borderRadius: effects.roundedCorner2,
        borderColor: palette.neutralTertiary,
        paddingTop: 0,
        paddingBottom: 0,
        selectors: {
          ':hover ': {
            borderColor: palette.neutralPrimary
          },
          ':active': {
            borderColor: palette.themePrimary
          }
        }
      },
      !hasFocus &&
        hasInput && {
          selectors: {
            '.ms-SearchBox-iconContainer': {
              width: 0
            },
            '.ms-SearchBox-icon': {
              opacity: 0
            }
          }
        },
      hasInput && {
        borderColor: palette.neutralSecondary
      },
      hasFocus && {
        borderColor: palette.themePrimary
      },
      underlined && {
        borderRadius: 0
      }
    ],
    iconContainer: {
      color: palette.themeDarkAlt
    },
    field: {
      paddingLeft: 6
    },
    clearButton: {
      padding: 0,
      selectors: {
        '&:hover .ms-Button': {
          backgroundColor: palette.neutralLighter
        },
        '&:hover .ms-Button-icon': {
          color: palette.neutralPrimary
        },
        '.ms-Button-icon': {
          color: palette.neutralSecondary
        }
      }
    }
  };
};
