import { IStyle, IStyleSet, ITheme } from '@uifabric/styling';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// TODO: Known TypeScript issue is widening return type checks when using function type declarations.
//        Effect is that mistyped property keys on returned style objects will not generate errors.
//        This affects lookup types used as functional decorations on IComponent and IStatelessComponent, e.g.:
//        export const styles: IStackComponent['styles'] = props => {
//        Existing issue: https://github.com/Microsoft/TypeScript/issues/241

/**
 * Helper type defining style sections, one for each component slot.
 */
export type IComponentStyles<TSlots> = { [key in keyof TSlots]?: IStyle };

/**
 * Function declaration for component styles functions.
 */
export type IStylesFunction<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> = (
  props: TViewProps,
  theme: ITheme,
  tokens: TTokens
) => TStyleSet;

/**
 * Composite type for component styles functions and objects.
 */
export type IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStylesFunction<TViewProps, TTokens, TStyleSet>
  | TStyleSet;

/**
 * Tokens can be defined as an object, function, or an array of objects and functions.
 */
export type IToken<TViewProps, TTokens> = ITokenBase<TViewProps, TTokens> | ITokenBaseArray<TViewProps, TTokens>;

/**
 * Function declaration for component token functions.
 */
export type ITokenFunction<TViewProps, TTokens> = (props: TViewProps, theme: ITheme) => IToken<TViewProps, TTokens>;

/**
 * Composite type for component token functions and objects.
 */
export type ITokenFunctionOrObject<TViewProps, TTokens> = ITokenFunction<TViewProps, TTokens> | TTokens;

/**
 * Composite base type that includes all possible resolutions of token functions in an array.
 */
export type ITokenBase<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens> | false | null | undefined;

/**
 * Composite token base array type allowing for token objects, functions, and function resolutions.
 */
export interface ITokenBaseArray<TViewProps, TTokens> extends Array<IToken<TViewProps, TTokens>> {}

/**
 * Optional props for styleable components. If these props are present, they will automatically be
 * used by Foundation when applying theming and styling.
 */
export interface IStyleableComponentProps<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> {
  className?: string;
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>;
  theme?: ITheme;
  tokens?: ITokenFunctionOrObject<TViewProps, TTokens>;
}

export type ICustomizationProps<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> = IStyleableComponentProps<
  TViewProps,
  TTokens,
  TStyleSet
> &
  Required<Pick<IStyleableComponentProps<TViewProps, TTokens, TStyleSet>, 'theme'>>;

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
 * Component used by foundation to tie elements together.
 * @see createComponent for generic type documentation.
 */
export interface IComponent<TComponentProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>, TViewProps = TComponentProps, TStatics = {}> {
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
   * React view component.
   */
  view: React.ComponentType<TViewProps>;
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
