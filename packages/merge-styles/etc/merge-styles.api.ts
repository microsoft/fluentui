// @public
export function concatStyleSets(...styleSets: (IStyleSet<any> | false | null | undefined)[]): IConcatenatedStyleSet<any>;

// @public
export function fontFace(font: IFontFace): void;

// @public
interface IFontFace extends IRawFontStyle {
  fontFeatureSettings?: string;
  src?: string;
  unicodeRange?: ICSSRule | string;
}

// @public
enum InjectionMode {
  appendChild = 2,
  insertNode = 1,
  none = 0
}

// @public
interface IRawStyle extends IRawStyleBase {
  displayName?: string;
  selectors?: {
    [key: string]: IStyle;
  }
}

// @public
interface IStyleSheetConfig {
  defaultPrefix?: string;
  injectionMode?: InjectionMode;
  namespace?: string;
  onInsertRule?: (rule: string) => void;
}

// @public
export function keyframes(timeline: {
    [key: string]: {};
}): string;

// @public
export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string;

// @public
export function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any>;

// @public
export function setRTL(isRTL: boolean): void;

// @public
class Stylesheet {
  constructor(config?: IStyleSheetConfig);
  argsFromClassName(className: string): IStyle[] | undefined;
  cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void;
  classNameFromKey(key: string): string | undefined;
  getClassName(displayName?: string): string;
  static getInstance(): Stylesheet;
  getRules(includePreservedRules?: boolean): string;
  insertedRulesFromClassName(className: string): string[] | undefined;
  insertRule(rule: string, preserve?: boolean): void;
  onReset(callback: () => void): void;
  reset(): void;
  // (undocumented)
  resetKeys(): void;
  setConfig(config?: IStyleSheetConfig): void;
}

// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IStyleFunction
// WARNING: Unsupported export: IStyleFunctionOrObject
// WARNING: Unsupported export: IConcatenatedStyleSet
// WARNING: Unsupported export: IProcessedStyleSet
// WARNING: Unsupported export: IStyleSet
// WARNING: Unsupported export: IFontWeight
// (No @packagedocumentation comment for this package)
