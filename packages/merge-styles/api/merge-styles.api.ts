// @public
export function concatStyleSets<T extends object>(...args: (T | false | null | undefined)[]): T;

// @public
export function fontFace(font: IFontFace): void;

// @public
interface IExtendedRawStyle extends IRawStyle {
  displayName?: string;
  selectors?: {
    [key: string]: IStyle;
  }
}

// @public
interface IFontFace extends IRawFontStyle {
  fontFeatureSettings?: string;
  src?: string;
  unicodeRange?: ICSSRule | string;
}

// @public
enum InjectionMode {
  insertNode = 1,
  none = 0
}

// @public
interface IRawStyle extends IRawFontStyle {
  alignContent?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  alignItems?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignmentAdjust?: ICSSRule | string;
  alignmentBaseline?: ICSSRule | string;
  alignSelf?: ICSSRule | 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  animationDelay?: ICSSRule | string;
  animationDirection?: ICSSRule | string;
  animationDuration?: ICSSRule | string;
  animationFillMode?: ICSSRule | 'none' | 'forwards' | 'backwards' | 'both';
  animationIterationCount?: ICSSRule | string;
  animationName?: ICSSRule | string;
  animationPlayState?: ICSSRule | string;
  animationTimingFunction?: ICSSRule | string;
  appearance?: ICSSRule | string;
  backfaceVisibility?: ICSSRule | string;
  background?: ICSSRule | string;
  backgroundAttachment?: ICSSRule | 'scroll' | 'fixed' | 'local';
  backgroundBlendMode?: ICSSRule | string;
  backgroundColor?: ICSSRule | string;
  backgroundComposite?: ICSSRule | string;
  backgroundImage?: ICSSRule | string;
  backgroundOrigin?: ICSSRule | string;
  backgroundPosition?: ICSSRule | string;
  backgroundRepeat?: ICSSRule | string;
  border?: ICSSRule | 0 | string;
  borderBottom?: ICSSRule | ICSSPixelUnitRule;
  borderBottomColor?: ICSSRule | string;
  borderBottomLeftRadius?: ICSSRule | string;
  borderBottomRightRadius?: ICSSRule | string;
  borderBottomStyle?: ICSSRule | string;
  borderBottomWidth?: ICSSRule | ICSSPixelUnitRule;
  borderCollapse?: ICSSRule | string;
  borderColor?: ICSSRule | string;
  borderCornerShape?: ICSSRule | string;
  borderImageSource?: ICSSRule | string;
  borderImageWidth?: ICSSRule | ICSSPixelUnitRule;
  borderLeft?: ICSSRule | ICSSPixelUnitRule;
  borderLeftColor?: ICSSRule | string;
  borderLeftStyle?: ICSSRule | string;
  borderLeftWidth?: ICSSRule | ICSSPixelUnitRule;
  borderRadius?: ICSSRule | ICSSPixelUnitRule;
  borderRight?: ICSSRule | ICSSPixelUnitRule;
  borderRightColor?: ICSSRule | string;
  borderRightStyle?: ICSSRule | string;
  borderRightWidth?: ICSSRule | ICSSPixelUnitRule;
  borderSpacing?: ICSSRule | string;
  borderStyle?: ICSSRule | string;
  borderTop?: ICSSRule | ICSSPixelUnitRule;
  borderTopColor?: ICSSRule | string;
  borderTopLeftRadius?: ICSSRule | string;
  borderTopRightRadius?: ICSSRule | string;
  borderTopStyle?: ICSSRule | string;
  borderTopWidth?: ICSSRule | ICSSPixelUnitRule;
  borderWidth?: ICSSRule | ICSSPixelUnitRule;
  bottom?: ICSSRule | ICSSPixelUnitRule;
  boxDecorationBreak?: ICSSRule | string;
  boxShadow?: ICSSRule | string;
  boxSizing?: ICSSRule | 'border-box' | 'content-box';
  breakAfter?: ICSSRule | string;
  breakBefore?: ICSSRule | string;
  breakInside?: ICSSRule | string;
  clear?: ICSSRule | string;
  clip?: void;
  clipRule?: ICSSRule | string;
  color?: ICSSRule | string;
  columnCount?: ICSSRule | number | 'auto';
  columnFill?: ICSSRule | string;
  columnGap?: ICSSRule | string;
  columnRule?: ICSSRule | string;
  columnRuleColor?: ICSSRule | string;
  columnRuleWidth?: ICSSRule | ICSSPixelUnitRule;
  columns?: ICSSRule | string;
  columnSpan?: ICSSRule | string;
  columnWidth?: ICSSRule | ICSSPixelUnitRule;
  content?: string;
  counterIncrement?: ICSSRule | string;
  counterReset?: ICSSRule | string;
  cue?: ICSSRule | string;
  cueAfter?: ICSSRule | string;
  cursor?: ICSSRule | string;
  direction?: ICSSRule | string;
  display?: ICSSRule | string;
  fill?: ICSSRule | string;
  fillOpacity?: ICSSRule | number;
  fillRule?: ICSSRule | string;
  filter?: ICSSRule | string;
  flex?: ICSSRule | ICSSPixelUnitRule;
  flexBasis?: ICSSRule | string;
  flexDirection?: ICSSRule | 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexFlow?: ICSSRule | string;
  flexGrow?: ICSSRule | number;
  flexOrder?: ICSSRule | string;
  flexShrink?: ICSSRule | number;
  flexWrap?: ICSSRule | 'nowrap' | 'wrap' | 'wrap-reverse';
  float?: ICSSRule | string;
  flowFrom?: ICSSRule | string;
  gridArea?: ICSSRule | string;
  gridColumn?: ICSSRule | string;
  gridColumnEnd?: ICSSRule | string;
  gridColumnStart?: ICSSRule | string;
  gridRow?: ICSSRule | string;
  gridRowEnd?: ICSSRule | string;
  gridRowPosition?: ICSSRule | string;
  gridTemplateAreas?: ICSSRule | string;
  gridTemplateColumns?: ICSSRule | string;
  gridTemplateRows?: ICSSRule | string;
  height?: ICSSRule | ICSSPixelUnitRule;
  hyphenateLimitChars?: ICSSRule | string;
  hyphenateLimitLines?: ICSSRule | string;
  hyphenateLimitZone?: ICSSRule | string;
  hyphens?: ICSSRule | string;
  justifyContent?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  left?: ICSSRule | ICSSPixelUnitRule;
  letterSpacing?: ICSSRule | string;
  lineHeight?: ICSSRule | 'normal' | number | ICSSPixelUnitRule | ICSSPercentageRule;
  listStyle?: ICSSRule | string;
  listStyleImage?: ICSSRule | string;
  listStylePosition?: ICSSRule | string;
  listStyleType?: ICSSRule | string;
  margin?: ICSSRule | ICSSPixelUnitRule;
  marginBottom?: ICSSRule | ICSSPixelUnitRule;
  marginLeft?: ICSSRule | ICSSPixelUnitRule;
  marginRight?: ICSSRule | ICSSPixelUnitRule;
  marginTop?: ICSSRule | ICSSPixelUnitRule;
  marqueeDirection?: ICSSRule | string;
  marqueeStyle?: ICSSRule | string;
  mask?: ICSSRule | string;
  maskBorder?: ICSSRule | string;
  maskBorderRepeat?: ICSSRule | string;
  maskBorderSlice?: ICSSRule | string;
  maskBorderSource?: ICSSRule | string;
  maskBorderWidth?: ICSSRule | ICSSPixelUnitRule;
  maskClip?: ICSSRule | string;
  maskOrigin?: ICSSRule | string;
  maxFontSize?: ICSSRule | ICSSPixelUnitRule;
  maxHeight?: ICSSRule | ICSSPixelUnitRule;
  maxWidth?: ICSSRule | ICSSPixelUnitRule;
  minHeight?: ICSSRule | ICSSPixelUnitRule;
  minWidth?: ICSSRule | ICSSPixelUnitRule;
  MozOsxFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased';
  opacity?: ICSSRule | number | string;
  order?: ICSSRule | number;
  orphans?: ICSSRule | number;
  outline?: ICSSRule | 0 | string;
  outlineColor?: ICSSRule | string;
  outlineOffset?: ICSSRule | string;
  overflow?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';
  overflowStyle?: ICSSRule | string;
  overflowWrap?: ICSSRule | 'normal' | 'break-word';
  overflowX?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';
  overflowY?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';
  padding?: ICSSRule | ICSSPixelUnitRule;
  paddingBottom?: ICSSRule | ICSSPixelUnitRule;
  paddingLeft?: ICSSRule | ICSSPixelUnitRule;
  paddingRight?: ICSSRule | ICSSPixelUnitRule;
  paddingTop?: ICSSRule | ICSSPixelUnitRule;
  pageBreakAfter?: ICSSRule | string;
  pageBreakBefore?: ICSSRule | string;
  pageBreakInside?: ICSSRule | string;
  pause?: ICSSRule | string;
  pauseAfter?: ICSSRule | string;
  pauseBefore?: ICSSRule | string;
  perspective?: ICSSRule | string;
  perspectiveOrigin?: ICSSRule | string;
  pointerEvents?: ICSSRule | string;
  position?: ICSSRule | 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  quotes?: ICSSRule | string;
  regionFragment?: ICSSRule | string;
  restAfter?: ICSSRule | string;
  restBefore?: ICSSRule | string;
  right?: ICSSRule | ICSSPixelUnitRule;
  shapeImageThreshold?: ICSSRule | string;
  shapeInside?: ICSSRule | string;
  shapeMargin?: ICSSRule | string;
  shapeOutside?: ICSSRule | string;
  speak?: ICSSRule | string;
  speakAs?: ICSSRule | string;
  strokeOpacity?: ICSSRule | number;
  strokeWidth?: ICSSRule | ICSSPixelUnitRule;
  tableLayout?: ICSSRule | string;
  tabSize?: ICSSRule | string;
  textAlign?: ICSSRule | string;
  textAlignLast?: ICSSRule | string;
  textDecoration?: ICSSRule | string;
  textDecorationColor?: ICSSRule | string;
  textDecorationLine?: ICSSRule | string;
  textDecorationSkip?: ICSSRule | string;
  textDecorationStyle?: ICSSRule | string;
  textEmphasis?: ICSSRule | string;
  textEmphasisColor?: ICSSRule | string;
  textEmphasisStyle?: ICSSRule | string;
  textHeight?: ICSSRule | string;
  textIndent?: ICSSRule | string;
  textOverflow?: ICSSRule | string;
  textOverline?: ICSSRule | string;
  textOverlineColor?: ICSSRule | string;
  textOverlineMode?: ICSSRule | string;
  textOverlineStyle?: ICSSRule | string;
  textOverlineWidth?: ICSSRule | ICSSPixelUnitRule;
  textRendering?: ICSSRule | string;
  textShadow?: ICSSRule | string;
  textTransform?: ICSSRule | string;
  textUnderlinePosition?: ICSSRule | string;
  textUnderlineStyle?: ICSSRule | string;
  top?: ICSSRule | ICSSPixelUnitRule;
  touchAction?: ICSSRule | string;
  transform?: ICSSRule | string;
  transformOrigin?: ICSSRule | string;
  transformOriginZ?: ICSSRule | string;
  transformStyle?: ICSSRule | string;
  transition?: ICSSRule | string;
  transitionDelay?: ICSSRule | string;
  transitionDuration?: ICSSRule | string;
  transitionProperty?: ICSSRule | string;
  transitionTimingFunction?: ICSSRule | string;
  unicodeBidi?: ICSSRule | string;
  userFocus?: ICSSRule | string;
  userInput?: ICSSRule | string;
  userSelect?: ICSSRule | 'none' | 'auto' | 'text' | 'all' | 'contain';
  verticalAlign?: ICSSRule | string;
  visibility?: ICSSRule | string;
  voiceBalance?: ICSSRule | string;
  voiceDuration?: ICSSRule | string;
  voiceFamily?: ICSSRule | string;
  voicePitch?: ICSSRule | string;
  voiceRange?: ICSSRule | string;
  voiceRate?: ICSSRule | string;
  voiceStress?: ICSSRule | string;
  voiceVolume?: ICSSRule | string;
  WebkitFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased';
  whiteSpace?: ICSSRule | string;
  widows?: ICSSRule | number;
  width?: ICSSRule | ICSSPixelUnitRule;
  wordBreak?: ICSSRule | string;
  wordSpacing?: ICSSRule | string;
  wordWrap?: ICSSRule | string;
  wrapFlow?: ICSSRule | string;
  wrapMargin?: ICSSRule | string;
  writingMode?: ICSSRule | string;
  zIndex?: ICSSRule | 'auto' | number;
  zoom?: ICSSRule | 'auto' | number | ICSSPercentageRule;
}

// @public
interface IStyleSheetConfig {
  injectionMode?: InjectionMode;
}

// @public
export function keyframes(timeline: { [key: string]: {} }): string;

// @public
export function mergeStyles(...args: (IStyle | IStyle[] | false | null | undefined)[]): string;

// @public
export function mergeStyleSets<T extends object>(...cssSets: (T | false | null | undefined)[]): {[P in keyof T]?: string };

// @public
class Stylesheet {
  constructor(config?: IStyleSheetConfig);
  public argsFromClassName(className: string): IStyle[] | undefined;
  public cacheClassName(className: string, key: string, args: IStyle[]): void;
  public classNameFromKey(key: string): string | undefined;
  public getClassName(displayName?: string): string;
  public static getInstance(): Stylesheet;
  public getRules(): string;
  public insertRule(rule: string): void;
  public reset(): void;
  public setConfig(config?: IStyleSheetConfig): void;
}

// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IStyleSet
// WARNING: Unsupported export: IFontWeight
// (No packageDescription for this package)
