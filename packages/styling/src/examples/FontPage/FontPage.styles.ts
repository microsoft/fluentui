import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IFontPageRules {
  row: IStyle;
  cell: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IFontPageRules {
  return {
    row: mergeStyles({
      paddingBottom: '10px',
      borderBottom: '1px solid ' + theme.palette.themeLighterAlt,
      userSelect: 'none'
    }),
    cell: mergeStyles(
      theme.fonts.small,
      {
        paddingRight: '20px'
      })
  };
}
