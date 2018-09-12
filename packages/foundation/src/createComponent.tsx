import * as React from 'react';
import { assign } from './utilities';

/**
 * Props contract for themed components.
 */
export interface IThemedComponent<TTheme> {
  theme: TTheme;
}

/**
 * Styles can be a function or an object taking in TViewProps for processing.
 */
export type IStyleFunction<TViewProps, TStyleSet> = (props: TViewProps) => Partial<TStyleSet>;

export type IStylesProp<TViewProps, TStyleSet> = IStyleFunction<TViewProps, TStyleSet> | Partial<TStyleSet>;

/**
 * Foundation interface for styleable components.
 */
export interface IStyleableComponentProps<TProps, TStyleSet, TTheme> {
  styles?: IStylesProp<TProps, TStyleSet>;
  theme?: TTheme;
}

export type IStyleableComponentCombinedProps<TProps extends {}, TStyleSet, TTheme> = TProps &
  IStyleableComponentProps<TProps, TStyleSet, TTheme>;

/**
 * Enforce props contract on state components, including the view prop and its shape.
 */
export type IStateComponentProps<TComponentProps, TViewProps> = TComponentProps & {
  // TOOD: when this function is called by state components, TypeScript does not error
  //        on any prop names that are not part of TViewProps (contravariance, bivariance, etc.)
  renderView: (props: TViewProps) => JSX.Element;
};

/**
 * Imposed state component props contract with styling props as well as a renderView
 * prop that the StateComponent should make use of in its render output (and should be its only render output.)
 */
export type IStateComponent<
  TComponentProps,
  TViewProps extends IViewComponent<TViewProps, TProcessedStyleSet>,
  TProcessedStyleSet
> = React.ComponentType<IStateComponentProps<TComponentProps, TViewProps>>;

/**
 * The extended view interface provided to views, including the component's children
 * and processed style.
 */
export type IViewComponent<TViewProps, TProcessedStyleSet> = React.Props<TViewProps> & {
  classNames: TProcessedStyleSet;
};
export type IViewComponentProps<TViewProps, TProcessedStyledSet> = TViewProps & IViewComponent<TViewProps, TProcessedStyledSet>;

/**
 * Component options used by foundation to tie elements together.
 * @param {IComponentOptions} displayName Display name to identify component in React hierarchy.
 * @param {IStylesProp<TViewProps, TStyleSet>} styles Styles prop to pass into component.
 * @param {IStateComponent} view Functional React view component.
 * @param {TStatics} statics Optional static object to pass into constructed component.
 */
export interface IComponentOptions<TViewProps, TStyleSet, TProcessedStyledSet, TTheme, TStatics> {
  displayName: string;
  styles: IStylesProp<TViewProps, TStyleSet>;
  view: (props: IViewComponentProps<TViewProps, TProcessedStyledSet>) => JSX.Element;
  statics?: TStatics;
}

/**
 * Providers used by createComponent to process and apply styling.
 */
export interface IStylingProviders<TViewProps, TStyleSet, TProcessedStyleSet, TContext, TTheme> {
  mergeStyleSets: (...styles: (Partial<TStyleSet> | undefined)[]) => TProcessedStyleSet;
  getCustomizations: (scope: string, context: TContext) => IStyleableComponentCombinedProps<TViewProps, TStyleSet, TTheme>;
  CustomizerContext: React.Context<TContext>;
}

/**
 * Assembles a higher order component based on the following: styles, theme, view, and state.
 * Imposes a separation of concern and centralizes styling processing to increase ease of use and robustness
 * in how components use and apply styling and theming.
 *
 * Automatically merges and applies themes and styles with theme / styleprops having the highest priority.
 * State component, if provided, is passed in props for processing. Props from state / user are automatically processed
 * and styled before finally being passed to view.
 *
 * State components should contain all stateful behavior and should not generate any JSX, but rather simply call the view prop.
 * Views should simply be stateless pure functions that receive all props needed for rendering their output.
 * State component is optional. If state not provided, created component is essentially a functional stateless component.
 *
 * TComponentProps: A styleable props interface for the created component.
 * TViewProps: The props specific to the view, including processed properties outputted by optional state component. If state
 * component is not provided, TComponentProps is the same as TViewProps.
 * TStyleSet: The type for styles properties.
 * TProcessedStyleSet: The type provided by mergeStyleSets provider after processing TStyleSet and provided to views.
 * TTheme: The type for theme properties as well as the getTheme provider.
 *
 * @param {IComponentOptions} options
 * @param {IStylingProviders} providers
 * @param {IStateComponent} StateComponent
 *
 * If your package has common types for any of the type arguments, such as TTheme and TProcessedStyleSet, it is strongly
 * recommended to make an interface file for your package that reduces the number of types individual components need
 * to provide. For example:
 * @example
 * export type IViewProps<TProps, TStyleSet extends IStyleSet<TStyleSet>> = IViewProps<TProps, IProcessedStyleSet<TStyleSet>>;
 * export type IStyleableComponent<TProps, TStyleSet> = IStyleableComponent<TProps, TStyleSet, ITheme>;
 *
 */
// TODO: Combine these functions into one once conditional types (TS 2.8) can be used. This will allow us to define
//        TComponentProps as being the same as TViewProps when StateComponent is not provided.
// TODO: use theming prop when provided and reconcile with global theme
// TODO: should userProps have higher priority over processedProps? or vice versa? tradeoff between styles priority and controlled values
//        if user props take priority, this could cause some subtle issues like overriding callbacks that state component uses.
// TODO: remove requirement of IStyleableComponent
export function createComponent<
  TComponentProps extends IStyleableComponentProps<TViewProps, TStyleSet, TTheme>,
  TViewProps,
  TStyleSet,
  TProcessedStyleSet,
  TContext,
  TTheme,
  TStatics
>(
  options: IComponentOptions<TViewProps, TStyleSet, TProcessedStyleSet, TTheme, TStatics>,
  providers: IStylingProviders<TViewProps, TStyleSet, TProcessedStyleSet, TContext, TTheme>,
  StateComponent: IStateComponent<TComponentProps, TViewProps & IViewComponent<TViewProps, TProcessedStyleSet>, TProcessedStyleSet>
): React.StatelessComponent<TComponentProps> & TStatics {
  const { CustomizerContext } = providers;
  const result: React.StatelessComponent<TComponentProps> = (userProps: TComponentProps) => {
    // Theming and styling values are provided by state component and createComponent
    type TProcessedProps = TViewProps & IStyleableComponentProps<TViewProps, TStyleSet, TTheme>;

    return (
      <CustomizerContext.Consumer>
        {(context: TContext) => {
          const settings = providers.getCustomizations(options.displayName, context);
          const { styles: contextStyles, ...rest } = settings as IStyleableComponentProps<TViewProps, TStyleSet, TTheme>;

          const content = (processedProps: TProcessedProps) => {
            // The approach here is to allow state components to provide only the props they care about, automatically
            //    merging user props and processed props together. This ensures all props are passed properly to view,
            //    including children and styles.
            // TODO: Should 'rest' props from customizations pass onto view? They are not currently.
            //          (items like theme seem like they shouldn't)
            const propStyles = processedProps.styles || userProps.styles;
            const styleProps: TProcessedProps = { ...rest, ...(processedProps as any), ...(userProps as any) };
            const viewProps: IViewComponentProps<TProcessedProps, TProcessedStyleSet> = {
              ...(processedProps as any),
              ...(userProps as any),
              ...{
                classNames: providers.mergeStyleSets(
                  _evaluateStyle(styleProps, options.styles),
                  _evaluateStyle(styleProps, contextStyles),
                  _evaluateStyle(styleProps, propStyles)
                )
              }
            };

            // TODO: consider rendering view as JSX component with display name in debug mode to aid in debugging
            return options.view(viewProps);
          };
          return <StateComponent {...userProps} renderView={content} />;
        }}
      </CustomizerContext.Consumer>
    );
  };

  result.displayName = options.displayName;

  assign(result, options.statics);

  // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
  return result as React.StatelessComponent<TComponentProps> & TStatics;
}

/**
 * This is essentially the same as createComponent. The primary differences are that TComponentProps and TViewProps
 * are equivalent and there is no state component argument.
 *
 * @see {@link createComponent} for more information.
 */
export function createStatelessComponent<
  TComponentProps extends IStyleableComponentProps<TComponentProps, TStyleSet, TTheme>,
  TStyleSet,
  TProcessedStyleSet,
  TContext,
  TTheme,
  TStatics
>(
  options: IComponentOptions<TComponentProps, TStyleSet, TProcessedStyleSet, TTheme, TStatics>,
  providers: IStylingProviders<TComponentProps, TStyleSet, TProcessedStyleSet, TContext, TTheme>
): React.StatelessComponent<TComponentProps> & TStatics {
  const result: React.StatelessComponent<TComponentProps> = (userProps: TComponentProps) => {
    // Theming and styling values are provided by state component and createComponent
    const { CustomizerContext } = providers;
    type TProcessedProps = TComponentProps & IStyleableComponentProps<TComponentProps, TStyleSet, TTheme>;

    return (
      <CustomizerContext.Consumer>
        {(context: TContext) => {
          const settings = providers.getCustomizations(options.displayName, context);
          const { styles: contextStyles, ...rest } = settings as IStyleableComponentProps<TComponentProps, TStyleSet, TTheme>;

          const content = (processedProps: TProcessedProps) => {
            // TODO: Should 'rest' props from customizations pass onto view? They are not currently.
            //          (items like theme seem like they shouldn't)
            const { styles: propStyles } = processedProps;
            const styleProps: TProcessedProps = { ...rest, ...(processedProps as any) };
            const viewProps: IViewComponentProps<TProcessedProps, TProcessedStyleSet> = {
              ...(processedProps as any),
              ...{
                classNames: providers.mergeStyleSets(
                  _evaluateStyle(styleProps, options.styles),
                  _evaluateStyle(styleProps, contextStyles),
                  _evaluateStyle(styleProps, propStyles)
                )
              }
            };

            // TODO: consider rendering view as JSX component with display name in debug mode to aid in debugging
            return options.view(viewProps);
          };

          return content(userProps);
        }}
      </CustomizerContext.Consumer>
    );
  };

  result.displayName = options.displayName;

  assign(result, options.statics);

  // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
  return result as React.StatelessComponent<TComponentProps> & TStatics;
}

/**
 * Evaluate styles based on type to return consistent TStyleSet.
 */
function _evaluateStyle<TViewProps, TStyleSet>(
  props: TViewProps,
  styles?: IStylesProp<TViewProps, TStyleSet>
): Partial<TStyleSet> | undefined {
  if (typeof styles === 'function') {
    return styles(props);
  }

  return styles;
}
