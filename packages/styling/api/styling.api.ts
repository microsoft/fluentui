export function getTheme(): ITheme;

interface IAnimations {
  // (undocumented)
  fadeIn100: CSSProperties;
  // (undocumented)
  fadeIn200: CSSProperties;
  // (undocumented)
  fadeIn400: CSSProperties;
  // (undocumented)
  fadeIn500: CSSProperties;
  // (undocumented)
  fadeOut100: CSSProperties;
  // (undocumented)
  fadeOut200: CSSProperties;
  // (undocumented)
  fadeOut400: CSSProperties;
  // (undocumented)
  fadeOut500: CSSProperties;
  // (undocumented)
  rotate90deg: CSSProperties;
  // (undocumented)
  rotateN90deg: CSSProperties;
  // (undocumented)
  scaleDownIn100: CSSProperties;
  // (undocumented)
  scaleDownOut98: CSSProperties;
  // (undocumented)
  scaleUpIn100: CSSProperties;
  // (undocumented)
  scaleUpOut103: CSSProperties;
  // (undocumented)
  slideDownIn10: CSSProperties;
  // (undocumented)
  slideDownIn20: CSSProperties;
  // (undocumented)
  slideDownOut10: CSSProperties;
  // (undocumented)
  slideDownOut20: CSSProperties;
  // (undocumented)
  slideLeftIn10: CSSProperties;
  // (undocumented)
  slideLeftIn20: CSSProperties;
  // (undocumented)
  slideLeftIn40: CSSProperties;
  // (undocumented)
  slideLeftIn400: CSSProperties;
  // (undocumented)
  slideLeftOut10: CSSProperties;
  // (undocumented)
  slideLeftOut20: CSSProperties;
  // (undocumented)
  slideLeftOut40: CSSProperties;
  // (undocumented)
  slideLeftOut400: CSSProperties;
  // (undocumented)
  slideRightIn10: CSSProperties;
  // (undocumented)
  slideRightIn20: CSSProperties;
  // (undocumented)
  slideRightIn40: CSSProperties;
  // (undocumented)
  slideRightIn400: CSSProperties;
  // (undocumented)
  slideRightOut10: CSSProperties;
  // (undocumented)
  slideRightOut20: CSSProperties;
  // (undocumented)
  slideRightOut40: CSSProperties;
  // (undocumented)
  slideRightOut400: CSSProperties;
  // (undocumented)
  slideUpIn10: CSSProperties;
  // (undocumented)
  slideUpIn20: CSSProperties;
  // (undocumented)
  slideUpOut10: CSSProperties;
  // (undocumented)
  slideUpOut20: CSSProperties;
}

// (undocumented)
interface IClassNames {
  // (undocumented)
  animations: IAnimationClassNames;
  // (undocumented)
  colors: IColorClassNames;
  // (undocumented)
  fonts: IFontClassNames;
  // (undocumented)
  iconFont: string;
  // (undocumented)
  icons: IIconClassNames;
}

// (undocumented)
interface ITheme {
  // (undocumented)
  colors?: IColors;
  // (undocumented)
  fonts?: IFonts;
}

export function setTheme(theme: ITheme): void;

// WARNING: Unsupported export: classNames
// WARNING: Unsupported export: animations
// (No packageDescription for this package)
