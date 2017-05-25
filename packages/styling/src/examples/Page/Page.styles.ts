import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IPageStyles {
  root?: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IPageStyles {
  return {
    root: mergeStyles(
      theme.fonts.medium,
      {
        padding: '20px'
      }
    )
  };
}
