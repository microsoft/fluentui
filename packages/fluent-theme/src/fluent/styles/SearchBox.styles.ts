import { ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxStyles = (props: ISearchBoxStyleProps): Partial<ISearchBoxStyles> => {
  const { theme, underlined } = props;
  const { effects, palette } = theme;

  return {
    root: [
      {
        borderRadius: effects.roundedCorner2,
        borderColor: palette.neutralTertiary
      },
      underlined && [
        {
          borderRadius: '0px'
        }
      ]
    ],
    iconContainer: [
      {
        color: palette.themeDarkAlt
      }
    ],
    clearButton: [
      {
        selectors: {
          '&:hover': {
            selectors: {
              '.ms-Button': {
                backgroundColor: 'transparent'
              },
              '.ms-Button-icon': {
                color: palette.black
              }
            }
          },
          '.ms-Button-icon': {
            color: palette.neutralSecondary
          }
        }
      }
    ]
  };
};
