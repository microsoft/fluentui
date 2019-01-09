import { IStyle, IStyleSet, ITheme } from '@uifabric/styling';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// TODO: Known TypeScript issue is widening return type checks when using function type declarations.
//        Effect is that mistyped property keys on returned style objects will not generate errors.
//        This affects lookup types used as functional decorations on IComponent and IStatelessComponent, e.g.:
//        export const styles: IStackComponent['styles'] = props => {
//        Existing issue: https://github.com/Microsoft/TypeScript/issues/241

export type IStylesFunction<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> = (
  props: TViewProps,
  theme: ITheme,
  tokens: TTokens
) => TStyleSet;

export type IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStylesFunction<TViewProps, TTokens, TStyleSet>
  | TStyleSet;

export type ITokenBase<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens> | false | null | undefined;

export interface ITokenBaseArray<TViewProps, TTokens> extends Array<IToken<TViewProps, TTokens>> {}

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
// TODO: Should take in TSlots instead of TStyleSet? (force styleset to be derived from slots?)
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
  view: React.StatelessComponent<TViewProps>;
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
export type IComponentStyles<TSlots> = { [key in keyof TSlots]?: IStyle };
