import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IColorPageStyles {
  swatch?: IStyle;
  cell?: IStyle;
  cellWithBorder?: IStyle;
  swatchText?: IStyle;
  example?: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IColorPageStyles {
  return {
    swatch: mergeStyles({
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 20,
      height: 20,
      borderRadius: '50%',
      marginRight: '8px'
    }),
    cell: mergeStyles(
      theme.fonts.small,
      {
        display: 'inline-block',
        verticalAlign: 'middle',
      }),
    cellWithBorder: mergeStyles({
      borderWidth: '1px',
      borderStyle: 'solid'
    }),
    swatchText: mergeStyles({
      display: 'inline-block',
      verticalAlign: 'middle',
    }),

    example: mergeStyles(theme.fonts.mediumPlus)
  };
}