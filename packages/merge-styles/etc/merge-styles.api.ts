// @public
declare function concatStyleSets<TStyleSet extends IStyleSet<TStyleSet>>(styleSet: TStyleSet | false | null | undefined): IConcatenatedStyleSet<TStyleSet>;

// @public
declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2>;

// @public
declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;

// @public
declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet3 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;

// @public
declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;

// @public
declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>, TStyleSet5 extends IStyleSet<TStyleSet5>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined, styleSet5: TStyleSet5 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4 & TStyleSet5>;

// @public
declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>, TStyleSet5 extends IStyleSet<TStyleSet5>, TStyleSet6 extends IStyleSet<TStyleSet6>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined, styleSet5: TStyleSet5 | false | null | undefined, styleSet6: TStyleSet6 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4 & TStyleSet5 & TStyleSet6>;

// @public
declare function concatStyleSets(...styleSets: (IStyleSet<any> | false | null | undefined)[]): IConcatenatedStyleSet<any>;

// @public
declare function fontFace(font: IFontFace): void;

// @public
declare type IConcatenatedStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
    [P in keyof Omit<TStyleSet, 'subComponentStyles'>]: IStyle;
} & {
    // (undocumented)
    subComponentStyles?: {
        [P in keyof TStyleSet['subComponentStyles']]: IStyleFunction<any, IStyleSet<any>>;
    };
};

// @public
interface IFontFace extends IRawFontStyle {
    fontFeatureSettings?: string;
    src?: string;
    unicodeRange?: ICSSRule | string;
}

// @public (undocumented)
declare type IFontWeight = ICSSRule | 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | 100 | '200' | 200 | '300' | 300 | '400' | 400 | '500' | 500 | '600' | 600 | '700' | 700 | '800' | 800 | '900' | 900;

// @public (undocumented)
declare const InjectionMode: {
    // (undocumented)
    none: 0;
    // (undocumented)
    insertNode: 1;
    // (undocumented)
    appendChild: 2;
};

// @public (undocumented)
declare type InjectionMode = typeof InjectionMode[keyof typeof InjectionMode];

// @public
declare type IProcessedStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
    [P in keyof Omit<TStyleSet, 'subComponentStyles'>]: string;
} & {
    // (undocumented)
    subComponentStyles: {
        [P in keyof TStyleSet['subComponentStyles']]: __MapToFunctionType<TStyleSet['subComponentStyles'][P]>;
    };
};

// @public
interface IRawStyle extends IRawStyleBase {
    displayName?: string;
    selectors?: {
        // (undocumented)
        [key: string]: IStyle;
    };
}

// @public
declare type IStyle = IStyleBase | IStyleBaseArray;

// @public
declare type IStyleFunction<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = (props: TStylesProps) => Partial<TStyleSet>;

// @public
declare type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = IStyleFunction<TStylesProps, TStyleSet> | Partial<TStyleSet>;

// @public
declare type IStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
    [P in keyof Omit<TStyleSet, 'subComponentStyles'>]: IStyle;
} & {
    // (undocumented)
    subComponentStyles?: {
        [P in keyof TStyleSet['subComponentStyles']]: IStyleFunctionOrObject<any, IStyleSet<any>>;
    };
};

// @public
interface IStyleSheetConfig {
    defaultPrefix?: string;
    injectionMode?: InjectionMode;
    namespace?: string;
    onInsertRule?: (rule: string) => void;
}

// @public
declare function keyframes(timeline: {
    // (undocumented)
    [key: string]: {};
}): string;

// @public
declare function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string;

// @public
declare function mergeStyleSets<TStyleSet extends IStyleSet<TStyleSet>>(styleSet: TStyleSet | false | null | undefined): IProcessedStyleSet<TStyleSet>;

// @public
declare function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined): IProcessedStyleSet<TStyleSet1 & TStyleSet2>;

// @public
declare function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;

// @public
declare function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;

// @public
declare function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any>;

// @public
declare function setRTL(isRTL: boolean): void;

// @public
declare class Stylesheet {
    // (undocumented)
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


// (No @packageDocumentation comment for this package)
