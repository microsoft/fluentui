import {
  AnimationStyles,
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IIconTileStyles {
  iconTile: IStyle;
  icon: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IIconTileStyles {
  return {
    iconTile: mergeStyles(
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
          border: '1px solid ' + theme.palette.themePrimary,
        },

        ':focus': {
          ...AnimationStyles.fadeIn500,
          color: theme.palette.themePrimary,
          opacity: 1,
          background: theme.palette.themeLighterAlt
        },
        ':hover': {
          opacity: 1,
          background: theme.palette.themeLighterAlt
        },
        ':focus:hover': {
          background: theme.palette.themeLight
        }
      }),

    icon: mergeStyles(
      theme.fonts.icon,
      {
        fontSize: '36px',
        paddingBottom: '8px'
      })
  };
}
