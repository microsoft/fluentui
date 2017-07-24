export interface IIconSubset {
  fontFace: IFontFace;
  icons: {
    [key: string]: string;
  };
  style?: IRawStyle;
}
