import { ScreenWidthMaxLarge, IRawStyle, DefaultFontStyles, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IHeaderStyleProps, IHeaderStyles } from './Header.types';

const globalClassNames = {
  root: 'Header',
  title: 'Header-title',
  button: 'Header-button',
  buttons: 'Header-buttons'
};

const lgDown = `@media (max-width: ${ScreenWidthMaxLarge}px)`;

export const getStyles: IStyleFunction<IHeaderStyleProps, IHeaderStyles> = props => {
  const theme = getTheme();
  const commonStyles: IRawStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    color: theme.palette.white,
    borderRadius: 0
  };

  return {
    root: [
      {
        height: 50,
        lineHeight: 50,
        padding: '0 20px',
        backgroundColor: '#272630',
        overflow: 'hidden',
        whiteSpace: 'no-wrap',
        userSelect: 'none',
        color: 'white',
        selectors: {
          [lgDown]: {
            padding: 0
          }
        }
      },
      globalClassNames.root
    ],
    title: [
      commonStyles,
      DefaultFontStyles.large,
      {
        lineHeight: 48
      },
      globalClassNames.title
    ],
    button: [
      commonStyles,
      getFocusStyle(theme, 1, 'relative', undefined, theme.palette.themeLight, 'transparent'),
      {
        position: 'relative',
        textDecoration: 'none',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0 10px',
        minWidth: 50,
        lineHeight: 50,
        margin: '0 5px',
        textTransform: 'uppercase',
        display: 'inline-block',
        verticalAlign: 'top',
        boxSizing: 'border-box',
        selectors: {
          '&:hover': {
            background: theme.palette.themePrimary
          },
          [lgDown]: {
            margin: 0,
            selectors: { '&:hover': { background: 'inherit' } }
          }
        }
      },
      globalClassNames.button
    ],
    buttons: [
      commonStyles,
      {
        float: 'right'
      },
      globalClassNames.buttons
    ]
  };
};
