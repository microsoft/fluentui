import { css, CSSProperties } from 'glamor';
import { getTheme, ITheme } from '@uifabric/styling';

export function getStyles(theme: ITheme = getTheme()): CSSProperties {
  return {

    row: css({
      paddingBottom: '10px',
      borderBottom: '1px solid #aaa',
      userSelect: 'none'
    }),

    cell: css(
      theme.fonts.medium,
      { margin: '0 4px' }
    ),

    container: css({
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    })
  };
}
