// @public
export function concatStyleSets < T extends object >(...args: (T | false | null | undefined)[]): T;

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
    [ key: string ]: IStyle;
  }
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
export function mergeStyleSets < T >(...cssSets: ({[P in keyof T]?: IStyle } | null | undefined)[]): T;

// @public
class Stylesheet {
  constructor(config?: IStyleSheetConfig);
  public argsFromClassName(className: string): IStyle[] | undefined;
  public cacheClassName(className: string,
      key: string,
      args: IStyle[],
      rules: string[]): void;
  public classNameFromKey(key: string): string | undefined;
  public getClassName(displayName?: string): string;
  public static getInstance(): Stylesheet;
  public getRules(): string;
  public insertedRulesFromClassName(className: string): string[] | undefined;
  public insertRule(rule: string): void;
  public reset(): void;
  public setConfig(config?: IStyleSheetConfig): void;
}

// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IStyleSet
// WARNING: Unsupported export: IFontWeight
// (No packageDescription for this package)
