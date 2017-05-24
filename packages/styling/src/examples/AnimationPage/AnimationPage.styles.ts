import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IAnimationPageStyles {
  grid?: IStyle;
  blue?: IStyle;
  tile?: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IAnimationPageStyles {
  return {
    grid: mergeStyles({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'stretch',
      margin: '-8px'
    }),

    blue: mergeStyles({
      background: theme.palette.themeSecondary
    }),

    tile: mergeStyles({
      flexGrow: 1,
      minWidth: '200px',
      maxWidth: '400px',
      padding: '8px'
    })
  };
}
