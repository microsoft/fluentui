import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IIconPageStyles {
  container?: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IIconPageStyles {
  return {
    container: mergeStyles({
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    })
  };
}
