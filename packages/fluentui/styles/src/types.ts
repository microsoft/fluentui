import * as CSS from 'csstype';

// ========================================================
// Debug
// ========================================================

export type DebugData = {
  componentName: string;
  siteVariables: Object[];
  componentVariables: Object[];
  componentStyles: Record<string, Object[]>;
};

// ========================================================
// Utility types
// ========================================================

export type Extendable<T, V = any> = T & {
  [key: string]: V;
};

export type ObjectOrFunc<TResult, TArg = {}> = ((arg: TArg) => TResult) | TResult;

// ========================================================
// CSS in JS
// ========================================================

export type AnimationKeyFrame = Record<'from' | 'to' | string, CSSCustom>;

export interface AnimationName<P = Record<string, any>> {
  keyframe?: AnimationKeyFrame | ((params: P) => AnimationKeyFrame);
  params?: P;
}

type CSSProperties = Omit<CSS.Properties<number | string>, 'animationName'> & {
  // missing React.CSSProperties
  speak?: CSS.Globals | 'none' | 'normal' | 'spell-out';

  // TODO Questionable: unsupported by autoprefixer, one-off vendors
  // we could expand these ourselves so that "font-smoothing" works, but which values?
  WebkitFontSmoothing?: CSS.Globals | 'auto' | 'none' | 'antialiased' | 'subpixel-antialiased';
  MozOsxFontSmoothing?: CSS.Globals | 'auto' | 'grayscale';

  // To be compatible with Emotion KebabCased rules should be used
  // I.e. "'-webkit-box-orient'" => "WebkitBoxOrient"
  '-webkit-appearance'?: never;
  '-webkit-box-orient'?: never;
  '-webkit-font-smoothing'?: never;
  '-webkit-line-clamp'?: never;
  '-webkit-text-fill-color'?: never;
  // It would be nice to reuse there template literal types, but they are not supported as indexes yet
  // https://github.com/microsoft/TypeScript/pull/26797
};

type CSSObject = CSSProperties &
  CSSPseudos & { animationName?: AnimationName<any> | AnimationKeyFrame | string | 'none' };

type CSSCustom = { [prop: string]: number | string | ICSSInJSStyle };
type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject & { content?: string } };

export type ICSSInJSStyle = CSSObject | CSSCustom;

export interface ThemeAnimation<KP = {}> {
  keyframe: ((kp: KP) => object) | object | string;
  delay?: string;
  direction?: string;
  duration?: string;
  fillMode?: string;
  iterationCount?: string;
  playState?: string;
  timingFunction?: string;
  keyframeParams?: KP;
}

// ========================================================
// Fonts
// ========================================================

export interface FontFaceProps {
  fontStretch?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: number;
  localAlias?: string | string[];
  unicodeRange?: string;
}

export interface FontFace {
  name: string;
  paths: string[];
  props: FontFaceProps;
}

export type FontFaces = FontFace[];

// ========================================================
// Site Variables
// ========================================================

export interface SiteVariablesInput extends Record<string, any> {}

export interface SiteVariablesPrepared extends SiteVariablesInput {
  fontSizes: Record<string, string>;
}

// ========================================================
// Component Variables
// ========================================================

export type ComponentVariablesObject = any;

// TODO: Make this generic
export type ComponentVariablesInput = ComponentVariablesObject | ComponentVariablesPrepared;

export type ComponentVariablesPrepared = (siteVariables?: SiteVariablesPrepared) => ComponentVariablesObject;

// ========================================================
// Component Style Props
// ========================================================

export type ComponentSlotStyle<TProps = {}, TVars = {}> = ComponentSlotStyleFunction<TProps, TVars> | ICSSInJSStyle;

export type PropsWithVarsAndStyles = Extendable<{
  variables?: ComponentVariablesInput;
  styles?: ComponentSlotStyle;
}>;

// ========================================================
// Component Styles
// ========================================================

export interface ComponentSlotStylesInput<TProps = {}, TVars = {}>
  extends Record<string, ComponentSlotStyle<TProps, TVars>> {}

export interface ComponentSlotStylesPrepared<TProps = {}, TVars = {}>
  extends Record<string, ComponentSlotStyleFunction<TProps, TVars>> {}

export interface ComponentSlotStylesResolved extends Record<string, ICSSInJSStyle> {}

export interface ComponentStyleFunctionParam<
  TProps extends PropsWithVarsAndStyles = PropsWithVarsAndStyles,
  TVars extends ComponentVariablesObject = ComponentVariablesObject
> {
  props: TProps;
  variables: TVars;
  theme: ThemePrepared;
  rtl: boolean;
  disableAnimations: boolean;
}

export type ComponentSlotStyleFunction<TProps = {}, TVars = {}> = (
  styleParam: ComponentStyleFunctionParam<TProps, TVars>,
) => ICSSInJSStyle;

export interface ComponentSlotStylesPrepared<TProps = {}, TVars = {}>
  extends Record<string, ComponentSlotStyleFunction<TProps, TVars>> {}

// ========================================================
// Static Styles
// ========================================================

export type StaticStyleObject = Record<string, ICSSInJSStyle>;

export type StaticStyleRenderable = string | StaticStyleObject;

export type StaticStyleFunction = (siteVariables?: SiteVariablesPrepared) => StaticStyleObject;

export type StaticStyle = StaticStyleRenderable | StaticStyleFunction;

export type StaticStyles = StaticStyle[];

// ========================================================
// TODO: Theme typings that have no sense
// ========================================================

export type ThemeComponentVariablesInput<ThemeStylesProps = any> = {
  [K in keyof ThemeStylesProps]?: ComponentVariablesInput;
} &
  Record<string, any>;

export type ThemeComponentVariablesPrepared<ThemeStylesProps = any> = {
  [K in keyof ThemeStylesProps]?: ComponentVariablesPrepared;
} &
  Record<string, any>;

export type ThemeComponentStylesInput<ThemeStylesProps = any> = {
  [K in keyof ThemeStylesProps]?: ComponentSlotStylesInput<ThemeStylesProps[K]>;
} &
  Record<string, ComponentSlotStylesInput | undefined>;

export type ThemeComponentStylesPrepared<ThemeStylesProps = any> = {
  [K in keyof ThemeStylesProps]?: ComponentSlotStylesPrepared<ThemeStylesProps[K]>;
} &
  Record<string, ComponentSlotStylesPrepared | undefined>;

// ========================================================
// Theme
// ========================================================

export interface ThemeInput<ThemeStylesProps extends Record<string, any> = any> {
  siteVariables?: SiteVariablesInput;
  componentVariables?: ThemeComponentVariablesInput<ThemeStylesProps>;
  componentStyles?: ThemeComponentStylesInput<ThemeStylesProps>;
  fontFaces?: FontFaces;
  staticStyles?: StaticStyles;
  animations?: { [key: string]: ThemeAnimation };
}

// Component variables and styles must be resolved by the component after
// all cascading is complete, not by any Provider in the middle of the tree.
// This ensures the final site variables are used in the component's variables
// and styles. Resolving component variables/styles in the Provider would mean
// the latest site variables might not be applied to the component.
//
// As a theme cascades down the tree and is merged with the previous theme on
// context, the resulting theme takes this shape.
export interface ThemePrepared<ThemeStylesProps extends Record<string, any> = any> {
  siteVariables: SiteVariablesPrepared;
  componentVariables: ThemeComponentVariablesPrepared<ThemeStylesProps>;
  componentStyles: ThemeComponentStylesPrepared<ThemeStylesProps>;
  fontFaces: FontFaces;
  staticStyles: StaticStyles;
  animations: Record<string, ThemeAnimation>;
}
