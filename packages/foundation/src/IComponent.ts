import { IProcessedStyleSet, IStyle, IStyleSet, ITheme } from '@uifabric/styling';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// TODO: call out token naming, arguments for/against:
//  Token:
//  + new concept implying usage across platforms
//  + Micah likes
//  - does not have style naming, is closely related to "styles" but name does not imply it
//  - does not seem to match "standard" def, which seems to imply tokens are more like semanticColors
//  StyleVars:
//  + implies association with existing "styles", which is true because both complement each other
//  + consistent with stardust
//  - Micah no likes

// TODO: update or move to IStyleFunction.ts? is the naming confusing?
// TOOO: move all types out, into IComponent.ts?
// TODO: call out impacts of these new types.
//        obviates IStyleFunctionOrObject
//        now have theme as separate arg for both tokens and styles functions
// TODO: if this type is kept with tokens as separate arg, it should be erased out of props arg to make sure people don't use wrong tokens
export type IStylesFunction<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> = (
  props: TViewProps,
  theme: ITheme,
  tokens: TTokens
) => Partial<TStyleSet>;

export type IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStylesFunction<TViewProps, TTokens, TStyleSet>
  | Partial<TStyleSet>;

// export type ITokenBase<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens> | ITokenBaseArray<TViewProps, TTokens>;
// export type ITokenBase<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens>;
export type ITokenBase<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens> | false | null | undefined;

// export interface ITokenBaseArray<TViewProps, TTokens> extends Array<ITokenFunctionOrObject<TViewProps, TTokens>> { }
// export interface ITokenBaseArray<TViewProps, TTokens> extends Array<ITokenBase<TViewProps, TTokens>> { }
export interface ITokenBaseArray<TViewProps, TTokens> extends Array<IToken<TViewProps, TTokens>> {}

// export type IToken<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens> | ITokenBaseArray<TViewProps, TTokens>;
export type IToken<TViewProps, TTokens> = ITokenBase<TViewProps, TTokens> | ITokenBaseArray<TViewProps, TTokens>;

export type ITokenFunction<TViewProps, TTokens> = (props: TViewProps, theme: ITheme) => IToken<TViewProps, TTokens>;

export type ITokenFunctionOrObject<TViewProps, TTokens> = ITokenFunction<TViewProps, TTokens> | TTokens;

/**
 * Optional props for styleable components. If these props are present, they will automatically be
 * used by Foundation when applying theming and styling.
 */
export interface IStyleableComponentProps<TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens = {}> {
  className?: string;
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>;
  theme?: ITheme;
  tokens?: ITokenFunctionOrObject<TViewProps, TTokens>;
}

export type ICustomizationProps<TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens> = IStyleableComponentProps<
  TViewProps,
  TStyleSet,
  TTokens
> &
  Required<Pick<IStyleableComponentProps<TViewProps, TStyleSet, TTokens>, 'theme'>>;

/**
 * Props added by Foundation for styles functions.
 */
// export interface IStyledProps<TTheme> {
//   theme: TTheme;
// }

/**
 * Enforce props contract on state components, including the view prop and its shape.
 */
export type IStateComponentProps<TComponentProps, TViewProps> = TComponentProps & {
  renderView: React.StatelessComponent<TViewProps>;
};

/**
 * Imposed state component props contract with styling props as well as a renderView
 * prop that the StateComponent should make use of in its render output (and should be its only render output.)
 */
export type IStateComponentType<TComponentProps, TViewProps> = React.ComponentType<IStateComponentProps<TComponentProps, TViewProps>>;

/**
 * The props that get passed to view components.
 */
// TODO: remove?
// export type IViewComponentProps<TViewProps, TProcessedStyleSet> = TViewProps & {
//   classNames: TProcessedStyleSet;
// };

/**
 * A helper type for defining view components, including its properties.
 */
// export type IViewComponent<TViewProps, TProcessedStyleSet> =
//    React.StatelessComponent<IViewComponentProps<TViewProps, TProcessedStyleSet>>;
export type IViewComponent<TViewProps, TProcessedStyleSet> = React.StatelessComponent<TViewProps>;

/**
 * Component used by foundation to tie elements together.
 * @see createComponent for generic type documentation.
 */
// TODO: Should Tokens be an optional member/type like state?
// TODO: Should take in TSlots instead of TStyleSet? (force stylset to be derived from slots?)
export interface IComponentOptions<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens = {}, TStatics = {}> {
  /**
   * Display name to identify component in React hierarchy.
   */
  displayName: string;
  /**
   * List of fields which can be customized.
   */
  fields?: string[];
  /**
   * Styles prop to pass into component.
   */
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>;
  /**
   * React view stateless component.
   */
  view: IViewComponent<TViewProps, IProcessedStyleSet<TStyleSet>>;
  /**
   * Optional state component that processes TComponentProps into TViewProps.
   */
  state?: IStateComponentType<TComponentProps, TViewProps>;
  /**
   * Optional static object to assign to constructed component.
   */
  statics?: TStatics;
  /**
   * Tokens prop to pass into component.
   */
  tokens?: ITokenFunctionOrObject<TViewProps, TTokens>;
}

// TODO: Known TypeScript issue is widening return type checks when using function type declarations.
//        Effect is that mistyped property keys on returned style objects will not generate errors.
//        This affects lookup types used as functional decorations on IComponent and IStatelessComponent, e.g.:
//        export const styles: IStackComponent['styles'] = props => {
//        Existing issue: https://github.com/Microsoft/TypeScript/issues/241

/**
 * Variant of IComponentOptions for stateful components with appropriate typing and required properties.
 */
export type IComponent<
  TComponentProps,
  TViewProps,
  TStyleSet extends IStyleSet<TStyleSet>,
  TTokens = {},
  TStatics = {}
> = IComponentOptions<TComponentProps, TViewProps, TStyleSet, TTokens, TStatics> &
  Required<Pick<IComponentOptions<TComponentProps, TComponentProps, TStyleSet, TTokens, TStatics>, 'state'>>;

/**
 * Variant of IComponentOptions for stateless components with appropriate typing and required properties.
 */
export type IStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens = {}, TStatics = {}> = Omit<
  IComponentOptions<TComponentProps, TComponentProps, TStyleSet, TTokens, TStatics>,
  'state'
>;

// TODO: Is this type really needed? Particularly if styles can be derived from slots in IComponentOptions?
// TODO: Is IStyle the right type here? This should probably be a map of keys to Slot component styles prop instead.
export type IComponentStyles<TSlots> = { [key in keyof TSlots]?: IStyle };
