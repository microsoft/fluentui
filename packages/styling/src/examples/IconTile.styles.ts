import {
  StyleAttribute,
  ITheme,
  css,
  getTheme
} from '@uifabric/styling';

export interface IIconTileStyles {
  iconTile: StyleAttribute;
  icon: StyleAttribute;
}

export function getStyles(theme: ITheme = getTheme()): IIconTileStyles {
  return {
    iconTile: css(
      theme.fonts.small,
      {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px',
        width: 150,
        height: 80,
        opacity: .6,
        cursor: 'default',
        outline: 'none',
        position: 'relative',

        ':focus:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          border: '1px solid ' + theme.colors.themePrimary,
        },

        ':focus': {
          color: theme.colors.themePrimary,
          opacity: 1,
          background: theme.colors.themeLighterAlt
        },
        ':hover': {
          opacity: 1,
          background: theme.colors.themeLighterAlt
        },
        ':focus:hover': {
          background: theme.colors.themeLight
        }
      }),

    icon: css(
      theme.fonts.icon,
      {
        fontSize: '36px',
        paddingBottom: '8px'
      })
  };
}
