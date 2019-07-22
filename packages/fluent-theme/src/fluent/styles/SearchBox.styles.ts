import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, hasFocus, hasInput, underlined, disabled } = props;
  const { effects, palette, semanticColors } = theme;

  const inputIcon = palette.themeDarkAlt;
  const inputIconAlt = palette.neutralSecondary;
  const inputIconAltHovered = palette.neutralPrimary;
  const inputIconDisabled = palette.neutralTertiary;
  const inputBorderHasInput = palette.neutralSecondary;
  const inputBackgroundHovered = palette.neutralLighter;

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
        borderColor: inputBorderHasInput
      },
      hasFocus && {
        borderColor: semanticColors.inputFocusBorderAlt
      },
      underlined && {
        borderRadius: 0
      }
    ],
    iconContainer: [
      {
        color: inputIcon
      },
      disabled && {
        color: inputIconDisabled
      }
    ],
    field: {
      paddingLeft: 6
    },
    clearButton: {
      padding: 0,
      selectors: {
        '&:hover .ms-Button': {
          backgroundColor: inputBackgroundHovered
        },
        '&:hover .ms-Button-icon': {
          color: inputIconAltHovered
        },
        '.ms-Button-icon': {
          color: inputIconAlt
        }
      }
    }
  };
};
