import { IRawStyle, getTheme, getFocusStyle } from '@fluentui/react/lib/Styling';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';
import { IHeaderStyleProps, IHeaderStyles } from './Header.types';
import { IIconStyles } from '@fluentui/react';

const globalClassNames = {
  root: 'Header',
  title: 'Header-title',
  button: 'Header-button',
  buttons: 'Header-buttons',
};

export const getStyles: IStyleFunction<IHeaderStyleProps, IHeaderStyles> = props => {
  const { theme = getTheme(), isLargeDown } = props;

  const commonStyles: IRawStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    color: theme.palette.white,
    borderRadius: 0,
  };

  const iconStyles: IIconStyles = { root: { fontSize: 18 } };

  return {
    root: [
      {
        height: 50,
        lineHeight: 50,
        padding: isLargeDown ? 0 : '0 20px',
        backgroundColor: '#272630',
        overflow: 'hidden',
        whiteSpace: 'no-wrap',
        userSelect: 'none',
        color: 'white',
      },
      globalClassNames.root,
    ],
    title: [
      commonStyles,
      theme.fonts.medium,
      {
        lineHeight: 48,
      },
      globalClassNames.title,
    ],
    button: [
      commonStyles,
      getFocusStyle(theme, { inset: 1, borderColor: theme.palette.themeLight, outlineColor: 'transparent' }),
      {
        position: 'relative',
        textDecoration: 'none',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0 10px',
        minWidth: 50,
        lineHeight: 50,
        margin: isLargeDown ? 0 : '0 5px',
        textTransform: 'uppercase',
        display: 'inline-block',
        verticalAlign: 'top',
        boxSizing: 'border-box',
        selectors: {
          '&:hover': {
            background: isLargeDown ? 'inherit' : theme.palette.themePrimary,
          },
        },
      },
      globalClassNames.button,
    ],
    buttons: [
      commonStyles,
      {
        float: 'right',
      },
      globalClassNames.buttons,
    ],
    subComponentStyles: {
      icons: iconStyles,
    },
  };
};
