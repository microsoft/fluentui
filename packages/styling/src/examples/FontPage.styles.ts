import { ITheme, getTheme } from '@uifabric/styling';
import { CSSProperties, css } from 'glamor';

export function getStyles(theme: ITheme = getTheme): CSSProperties {
  return {
    row: css({
      paddingBottom: '10px',
      borderBottom: '1px solid ' + theme.colors.themeLighterAlt,
      userSelect: 'none'
    }),
    cell: css(
      theme.fonts.small,
      {
        paddingRight: '20px'
      })
  };
}
