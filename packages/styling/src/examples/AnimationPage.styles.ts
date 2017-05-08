import { CSSProperties, css } from 'glamor';
import { ITheme, getTheme } from '@uifabric/styling';

export function getStyles(theme: ITheme = getTheme()): CSSProperties {
  return {
    grid: css({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'stretch',
      margin: '-8px'
    }),

    blue: css({
      background: theme.colors.themeSecondary
    }),

    tile: css({
      flexGrow: 1,
      minWidth: '200px',
      maxWidth: '400px',
      padding: '8px'
    })
  };
}
