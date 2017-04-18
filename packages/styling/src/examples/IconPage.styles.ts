import { css, CSSProperties } from 'glamor';
import { fonts } from '../styles/fonts';

export function getStyles(): CSSProperties {
  return {

    row: css({
      paddingBottom: '10px',
      borderBottom: '1px solid #aaa',
      userSelect: 'none'
    }),

    cell: css(
      fonts.medium,
      { margin: '0 4px' }
    ),

    container: css({
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    })
  };
}
