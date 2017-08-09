import { IFontFace } from './IFontFace';
import { IRawStyle } from './IRawStyle';

export interface IIconSubset {
  fontFace: IFontFace;
  icons: {
    [key: string]: string;
  };
  style?: IRawStyle;
}
