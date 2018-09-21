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
export interface IStyleableComponentProps<TProps, TStyleSet, TTheme, TScheme> {
  styles?: IStylesProp<TProps, TStyleSet>;
  theme?: TTheme;
  /**
   * Optional scheme to apply to contextual theme. Specifying this prop
   * will modify context and affect all children.
   */
  scheme?: TScheme;
}

export type IStyleableComponentCombinedProps<TProps extends {}, TStyleSet, TTheme, TScheme> = TProps &
  IStyleableComponentProps<TProps, TStyleSet, TTheme, TScheme>;

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
export interface IComponentOptions<TComponentProps, TViewProps, TStyleSet, TProcessedStyleSet, TTheme, TStatics> {
  displayName: string;
  styles: IStylesProp<TViewProps, TStyleSet>;
  view: (props: IViewComponentProps<TViewProps, TProcessedStyleSet>) => JSX.Element;
  state?: IStateComponent<TComponentProps, TViewProps & IViewComponent<TViewProps, TProcessedStyleSet>, TProcessedStyleSet>;
  statics?: TStatics;
}

/**
 * Providers used by createComponent to process and apply styling.
 */
export interface IStylingProviders<TViewProps, TStyleSet, TProcessedStyleSet, TContext, TTheme, TScheme> {
  /**
   * A required provider that merges multiple TStyleSets to create a TProcessedStyleSet that will be passed onto views components.
   */
  mergeStyleSets: (...styles: (Partial<TStyleSet> | undefined)[]) => TProcessedStyleSet;
  /**
   * A required provider for accessing global customizations as a fallback for contextual customizations.
   */
  getCustomizations: (scope: string, context: TContext) => IStyleableComponentProps<TViewProps, TStyleSet, TTheme, TScheme>;
  /**
   * A provider that allows consumer to change context based on component's view props. If returned value is defined,
   * foundation assumes context has changed and will automatically instantiate a CustomizerContext.Provider to provide new context.
   */
  getContextFromProps: (
    props: IStyleableComponentProps<TViewProps, TStyleSet, TTheme, TScheme>,
    context: TContext,
    settings: IStyleableComponentProps<TViewProps, TStyleSet, TTheme, TScheme>
  ) => TContext | undefined;
  /**
   * React context provider based on TContext.
   */
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
export function createComponent<TComponentProps, TViewProps, TStyleSet, TProcessedStyleSet, TContext, TTheme, TScheme, TStatics>(
  options: IComponentOptions<TComponentProps, TViewProps, TStyleSet, TProcessedStyleSet, TTheme, TStatics>,
  providers: IStylingProviders<TViewProps, TStyleSet, TProcessedStyleSet, TContext, TTheme, TScheme>
): React.StatelessComponent<TComponentProps> & TStatics {
  const { CustomizerContext } = providers;
  const result: React.StatelessComponent<TComponentProps> = (userProps: TComponentProps) => {
    // Theming and styling values are provided by state component and createComponent
    type TProcessedProps = IStyleableComponentCombinedProps<TViewProps, TStyleSet, TTheme, TScheme>;

    return (
      <CustomizerContext.Consumer>
        {(context: TContext) => {
          let settings: IStyleableComponentProps<TViewProps, TStyleSet, TTheme, TScheme> = providers.getCustomizations(
            options.displayName,
            context
          );

          const renderView = (processedProps: TProcessedProps) => {
            // The approach here is to allow state components to provide only the props they care about, automatically
            //    merging user props and processed props together. This ensures all props are passed properly to view,
            //    including children and styles.
            // TODO: userProps should only override processedProps for controlled props (and also schemes, styles, theme?)
            //    for all other props, such as callbacks, processedProps should always have priority (this is not the case as written now.)
            //    introduce controlled prop marking mechanism so that only controlled userProps override processedProps.
            // TODO: Should 'rest' props from customizations pass onto view? They're not currently. (props like theme will break snapshots)
            const mergedProps: TProcessedProps = { ...(processedProps as any), ...(userProps as any) };

            const newContext = providers.getContextFromProps(mergedProps, context, settings);

            if (newContext) {
              // If we have a new context we need to refresh our settings (to reflect new contextual theme, for example)
              settings = providers.getCustomizations(options.displayName, newContext);
            }

            const { styles: contextStyles, ...rest } = settings;
            const styleProps: TProcessedProps = { ...rest, ...(mergedProps as any) };
            const viewProps: IViewComponentProps<TProcessedProps, TProcessedStyleSet> = {
              ...(mergedProps as any),
              ...{
                classNames: providers.mergeStyleSets(
                  _evaluateStyle(styleProps, options.styles),
                  _evaluateStyle(styleProps, contextStyles),
                  _evaluateStyle(styleProps, mergedProps.styles)
                )
              }
            };

            // If a new context has been generated, instantiate a Provider to provide it.
            return newContext ? (
              <CustomizerContext.Provider value={newContext}>{options.view(viewProps)}</CustomizerContext.Provider>
            ) : (
              options.view(viewProps)
            );
          };
          // What we really need to be able to do here either type force TViewProps to be TComponentProps when StateComponent
          //  is undefined OR logically something like code below. Until we figure out how to do this, cast userProps as any
          //  since userProps does not necessarily extend TViewProps. Until then we're sacrificing a bit of type safety to prevent
          //  the need of duplicating this function.
          // if (StateComponent) {
          //   type TProcessedProps = TViewProps & IStyleableComponentProps<TViewProps, TStyleSet, TTheme>;
          // } else {
          //   type TProcessedProps = TComponentProps & IStyleableComponentProps<TComponentProps, TStyleSet, TTheme>;
          // }
          return options.state ? <options.state {...userProps} renderView={renderView} /> : renderView(userProps as any);
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
