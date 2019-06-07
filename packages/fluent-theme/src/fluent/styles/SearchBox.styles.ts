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
        'is-underlined',
        {
          borderRadius: '0px'
        }
      ]
    ],
    iconContainer: [
      'ms-SearchBox-iconContainer',
      {
        color: palette.themeDarkAlt
      }
    ],
    clearButton: [
      'ms-SearchBox-clearButton',
      {
        selectors: {
          '.ms-Button:hover': {
            backgroundColor: 'transparent'
          },
          '.ms-Button-icon': {
            color: palette.neutralSecondary,
            selectors: {
              ':hover': {
                color: palette.black
              }
            }
          }
        }
      }
    ]
  };
};
