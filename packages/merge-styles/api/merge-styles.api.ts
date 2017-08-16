// @public
export function concatStyleSets < T extends {} >(...args: (T | false | null | undefined)[]): T;

// @public
export function fontFace(font: IFontFace): void;

// @public
interface IExtendedRawStyle extends IRawStyle {
  // (undocumented)
  displayName?: string;
  // (undocumented)
  selectors?: {
    [ key: string ]: IStyle;
  }
}

// @public (undocumented)
interface IFontFace extends IRawFontStyle {
  // (undocumented)
  fontFeatureSettings?: string;
  src?: string;
  unicodeRange?: ICSSRule | string;
}

// @public (undocumented)
interface IRawStyle extends IRawFontStyle {
  alignContent?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  alignItems?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignmentAdjust?: ICSSRule | string;
  // (undocumented)
  alignmentBaseline?: ICSSRule | string;
  alignSelf?: ICSSRule | 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  animationDelay?: ICSSRule | string;
  animationDirection?: ICSSRule | string;
  animationDuration?: ICSSRule | string;
  // (undocumented)
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
  // (undocumented)
  backgroundComposite?: ICSSRule | string;
  backgroundImage?: ICSSRule | string;
  backgroundOrigin?: ICSSRule | string;
  backgroundPosition?: ICSSRule | string;
  backgroundRepeat?: ICSSRule | string;
  baselineShift?: ICSSRule | string;
  behavior?: ICSSRule | string;
  border?: ICSSRule | 0 | string;
  borderBottom?: ICSSRule | number | string;
  borderBottomColor?: ICSSRule | string;
  borderBottomLeftRadius?: ICSSRule | string;
  borderBottomRightRadius?: ICSSRule | string;
  borderBottomStyle?: ICSSRule | string;
  borderBottomWidth?: ICSSRule | string;
  borderCollapse?: ICSSRule | string;
  borderColor?: ICSSRule | string;
  borderCornerShape?: ICSSRule | string;
  borderImageSource?: ICSSRule | string;
  borderImageWidth?: ICSSRule | string;
  borderLeft?: ICSSRule | number | string;
  borderLeftColor?: ICSSRule | string;
  borderLeftStyle?: ICSSRule | string;
  borderLeftWidth?: ICSSRule | string;
  borderRadius?: ICSSRule | string;
  borderRight?: ICSSRule | number | string;
  borderRightColor?: ICSSRule | string;
  borderRightStyle?: ICSSRule | string;
  borderRightWidth?: ICSSRule | string;
  borderSpacing?: ICSSRule | string;
  borderStyle?: ICSSRule | string;
  borderTop?: ICSSRule | number | string;
  borderTopColor?: ICSSRule | string;
  borderTopLeftRadius?: ICSSRule | string;
  borderTopRightRadius?: ICSSRule | string;
  borderTopStyle?: ICSSRule | string;
  borderTopWidth?: ICSSRule | string;
  borderWidth?: ICSSRule | number | string;
  bottom?: ICSSRule | number | string;
  // (undocumented)
  boxAlign?: ICSSRule | string;
  boxDecorationBreak?: ICSSRule | string;
  // (undocumented)
  boxDirection?: ICSSRule | string;
  boxFlex?: ICSSRule | number;
  boxFlexGroup?: ICSSRule | number;
  boxLineProgression?: ICSSRule | string;
  boxLines?: ICSSRule | string;
  boxOrdinalGroup?: ICSSRule | string;
  boxShadow?: ICSSRule | string;
  boxSizing?: ICSSRule | 'border-box' | 'content-box';
  breakAfter?: ICSSRule | string;
  breakBefore?: ICSSRule | string;
  breakInside?: ICSSRule | string;
  clear?: ICSSRule | string;
  clip?: ICSSRule | string;
  clipRule?: ICSSRule | string;
  color?: ICSSRule | string;
  columnCount?: ICSSRule | number | 'auto';
  columnFill?: ICSSRule | string;
  columnGap?: ICSSRule | string;
  columnRule?: ICSSRule | string;
  columnRuleColor?: ICSSRule | string;
  columnRuleWidth?: ICSSRule | string;
  columns?: ICSSRule | string;
  columnSpan?: ICSSRule | string;
  columnWidth?: ICSSRule | string;
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
  flex?: ICSSRule | number | string;
  flexAlign?: ICSSRule | string;
  flexBasis?: ICSSRule | string;
  flexDirection?: ICSSRule | 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexFlow?: ICSSRule | string;
  flexGrow?: ICSSRule | number;
  flexItemAlign?: ICSSRule | string;
  flexLinePack?: ICSSRule | string;
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
  // (undocumented)
  gridRowSpan?: ICSSRule | string;
  gridTemplateAreas?: ICSSRule | string;
  gridTemplateColumns?: ICSSRule | string;
  gridTemplateRows?: ICSSRule | string;
  height?: ICSSRule | string;
  hyphenateLimitChars?: ICSSRule | string;
  hyphenateLimitLines?: ICSSRule | string;
  hyphenateLimitZone?: ICSSRule | string;
  hyphens?: ICSSRule | string;
  // (undocumented)
  imeMode?: ICSSRule | string;
  justifyContent?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  // (undocumented)
  layoutGrid?: ICSSRule | string;
  // (undocumented)
  layoutGridChar?: ICSSRule | string;
  // (undocumented)
  layoutGridLine?: ICSSRule | string;
  // (undocumented)
  layoutGridMode?: ICSSRule | string;
  // (undocumented)
  layoutGridType?: ICSSRule | string;
  left?: ICSSRule | number | string;
  letterSpacing?: ICSSRule | string;
  lineBreak?: ICSSRule | string;
  // (undocumented)
  lineClamp?: ICSSRule | number;
  lineHeight?: ICSSRule | 'normal' | number | ICSSLengthRule | ICSSPercentageRule;
  listStyle?: ICSSRule | string;
  listStyleImage?: ICSSRule | string;
  listStylePosition?: ICSSRule | string;
  listStyleType?: ICSSRule | string;
  margin?: ICSSRule | number | string;
  marginBottom?: ICSSRule | number | string;
  marginLeft?: ICSSRule | number | string;
  marginRight?: ICSSRule | number | string;
  marginTop?: ICSSRule | number | string;
  marqueeDirection?: ICSSRule | string;
  marqueeStyle?: ICSSRule | string;
  mask?: ICSSRule | string;
  maskBorder?: ICSSRule | string;
  maskBorderRepeat?: ICSSRule | string;
  maskBorderSlice?: ICSSRule | string;
  maskBorderSource?: ICSSRule | string;
  maskBorderWidth?: ICSSRule | string;
  maskClip?: ICSSRule | string;
  maskOrigin?: ICSSRule | string;
  maxFontSize?: ICSSRule | string;
  maxHeight?: ICSSRule | string;
  maxWidth?: ICSSRule | string;
  minHeight?: ICSSRule | string;
  minWidth?: ICSSRule | string;
  MozFontSmoothing?: string;
  opacity?: ICSSRule | number;
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
  padding?: ICSSRule | number | string;
  paddingBottom?: ICSSRule | number | string;
  paddingLeft?: ICSSRule | number | string;
  paddingRight?: ICSSRule | number | string;
  paddingTop?: ICSSRule | number | string;
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
  punctuationTrim?: ICSSRule | string;
  quotes?: ICSSRule | string;
  regionFragment?: ICSSRule | string;
  restAfter?: ICSSRule | string;
  restBefore?: ICSSRule | string;
  right?: ICSSRule | number | string;
  // (undocumented)
  rubyAlign?: ICSSRule | string;
  // (undocumented)
  rubyPosition?: ICSSRule | string;
  shapeImageThreshold?: ICSSRule | string;
  shapeInside?: ICSSRule | string;
  shapeMargin?: ICSSRule | string;
  shapeOutside?: ICSSRule | string;
  speak?: ICSSRule | string;
  speakAs?: ICSSRule | string;
  strokeOpacity?: ICSSRule | number;
  strokeWidth?: ICSSRule | ICSSPercentageRule | ICSSLengthRule;
  tableLayout?: ICSSRule | string;
  tabSize?: ICSSRule | string;
  textAlign?: ICSSRule | string;
  textAlignLast?: ICSSRule | string;
  textDecoration?: ICSSRule | string;
  textDecorationColor?: ICSSRule | string;
  textDecorationLine?: ICSSRule | string;
  // (undocumented)
  textDecorationLineThrough?: ICSSRule | string;
  // (undocumented)
  textDecorationNone?: ICSSRule | string;
  // (undocumented)
  textDecorationOverline?: ICSSRule | string;
  textDecorationSkip?: ICSSRule | string;
  textDecorationStyle?: ICSSRule | string;
  // (undocumented)
  textDecorationUnderline?: ICSSRule | string;
  textEmphasis?: ICSSRule | string;
  textEmphasisColor?: ICSSRule | string;
  textEmphasisStyle?: ICSSRule | string;
  textHeight?: ICSSRule | string;
  textIndent?: ICSSRule | string;
  // (undocumented)
  textJustifyTrim?: ICSSRule | string;
  // (undocumented)
  textKashidaSpace?: ICSSRule | string;
  textLineThrough?: ICSSRule | string;
  textLineThroughColor?: ICSSRule | string;
  textLineThroughMode?: ICSSRule | string;
  textLineThroughStyle?: ICSSRule | string;
  textLineThroughWidth?: ICSSRule | string;
  textOverflow?: ICSSRule | string;
  textOverline?: ICSSRule | string;
  textOverlineColor?: ICSSRule | string;
  textOverlineMode?: ICSSRule | string;
  textOverlineStyle?: ICSSRule | string;
  textOverlineWidth?: ICSSRule | string;
  textRendering?: ICSSRule | string;
  textScript?: ICSSRule | string;
  textShadow?: ICSSRule | string;
  textTransform?: ICSSRule | string;
  textUnderlinePosition?: ICSSRule | string;
  textUnderlineStyle?: ICSSRule | string;
  top?: ICSSRule | number | string;
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
  whiteSpaceTreatment?: ICSSRule | string;
  widows?: ICSSRule | number;
  width?: ICSSRule | string;
  wordBreak?: ICSSRule | string;
  wordSpacing?: ICSSRule | string;
  wordWrap?: ICSSRule | string;
  wrapFlow?: ICSSRule | string;
  wrapMargin?: ICSSRule | string;
  wrapOption?: ICSSRule | string;
  writingMode?: ICSSRule | string;
  zIndex?: ICSSRule | 'auto' | number;
  zoom?: ICSSRule | 'auto' | number | ICSSPercentageRule;
}

// @public (undocumented)
export function keyframes(timeline: { [key: string]: {} }): string;

// @public
export function mergeStyles(...args: (IStyle | IStyle[])[]): string;

// @public
export function mergeStyleSets < T extends {} >(...cssSets: T[]): {[P in keyof T]?: string };

// @public (undocumented)
class Stylesheet {
  // WARNING: The type "IStyleSheetConfig" needs to be exported by the package (e.g. added to index.ts)
  constructor(config?: IStyleSheetConfig);
  // (undocumented)
  public argsFromClassName(className: string): IStyle[] | undefined;
  // (undocumented)
  public cacheClassName(className: string, key: string, args: IStyle[]): void;
  // (undocumented)
  public classNameFromKey(key: string): string | undefined;
  // (undocumented)
  public getClassName(displayName?: string): string;
  // (undocumented)
  public static getInstance(): Stylesheet;
  // (undocumented)
  public getRules(): string;
  // (undocumented)
  public insertRule(rule: string,
      forceSync: boolean = false): void;
  // (undocumented)
  public reset(): void;
  // WARNING: The type "IStyleSheetConfig" needs to be exported by the package (e.g. added to index.ts)
  // (undocumented)
  public setConfig(config?: IStyleSheetConfig): void;
}

// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IFontWeight
// (No packageDescription for this package)
