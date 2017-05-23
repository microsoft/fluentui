import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IPageHeaderStyles {
  root?: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IPageHeaderStyles {
  return {
    root: mergeStyles(
      theme.fonts.xLarge,
      {
        paddingBottom: '20px'
      }
    )
  };
}