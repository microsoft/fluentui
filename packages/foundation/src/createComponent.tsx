import * as React from 'react';
import { IProcessedStyleSet, IStyleSet, ITheme, mergeStyleSets } from '@uifabric/styling';
import { Customizations, CustomizerContext, ICustomizerContext, IStyleFunctionOrObject } from '@uifabric/utilities';

import { assign } from './utilities';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Optional props for styleable components. If these props are present, they will automatically be
 * used by Foundation when applying theming and styling.
 */
export interface IStyleableComponentProps<TViewProps, TStyleSet extends IStyleSet<TStyleSet>> {
  styles?: IStyleFunctionOrObject<TViewProps, TStyleSet>;
  theme?: ITheme;
}

/**
 * Props added by Foundation for styles functions.
 */
export interface IStyledProps<TTheme> {
  theme: TTheme;
}

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
export type IViewComponentProps<TViewProps, TProcessedStyleSet> = TViewProps & {
  classNames: TProcessedStyleSet;
};

/**
 * A helper type for defining view components, including its properties.
 */
export type IViewComponent<TViewProps, TProcessedStyleSet> = React.StatelessComponent<IViewComponentProps<TViewProps, TProcessedStyleSet>>;

/**
 * Component used by foundation to tie elements together.
 * @see createComponent for generic type documentation.
 */
export interface IComponentOptions<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> {
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
  styles?: IStyleFunctionOrObject<TViewProps & IStyledProps<ITheme>, TStyleSet>;
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
}

// TODO: Known TypeScript issue is widening return type checks when using function type declarations.
//        Effect is that mistyped property keys on returned style objects will not generate errors.
//        This affects lookup types used as functional decorations on IComponent and IStatelessComponent, e.g.:
//        export const styles: IStackComponent['styles'] = props => {
//        Existing issue: https://github.com/Microsoft/TypeScript/issues/241

/**
 * Variant of IComponentOptions for stateful components with appropriate typing and required properties.
 */
export type IComponent<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> = IComponentOptions<
  TComponentProps,
  TViewProps,
  TStyleSet,
  TStatics
> &
  Required<Pick<IComponentOptions<TComponentProps, TComponentProps, TStyleSet, TStatics>, 'state'>>;

/**
 * Variant of IComponentOptions for stateless components with appropriate typing and required properties.
 */
export type IStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> = Omit<
  IComponentOptions<TComponentProps, TComponentProps, TStyleSet, TStatics>,
  'state'
>;

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
 * TScheme: The type for identifying schemes.
 * TStatics: Static type for statics applied to created component object.
 *
 * @param {IComponent} component
 * @param {IComponentProviders} providers
 */
export function createComponent<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  component: IComponent<TComponentProps, TViewProps, TStyleSet, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  const result: React.StatelessComponent<TComponentProps> = (componentProps: TComponentProps) => {
    return (
      // TODO: createComponent is also probably affected by https://github.com/OfficeDev/office-ui-fabric-react/issues/6603
      <CustomizerContext.Consumer>
        {(context: ICustomizerContext) => {
          const settings: IStyleableComponentProps<TViewProps, TStyleSet> = _getCustomizations(
            component.displayName,
            context,
            component.fields
          );

          const renderView = (viewProps?: TViewProps) => {
            // The approach here is to allow state components to provide only the props they care about, automatically
            //    merging user props and state props together. This ensures all props are passed properly to view,
            //    including children and styles.
            // What we really need to be able to do here either type force TViewProps to be TComponentProps when StateComponent
            //    is undefined OR logically something like code below. Until we figure out how to do this, cast mergedProps as
            //    IStyleableComponentProps since componentProps does not necessarily extend TViewProps. Until then we're sacrificing
            //    a bit of type safety to prevent the need of duplicating this function.
            // if (StateComponent) {
            //   type TViewProps = TViewProps;
            // } else {
            //   type TViewProps = TComponentProps;
            // }
            // TODO: for full 'fields' support, 'rest' props from customizations need to pass onto view.
            //        however, customized props like theme will break snapshots. how is styled not showing theme output in snapshots?
            const mergedProps: IStyleableComponentProps<TViewProps, TStyleSet> = viewProps
              ? {
                  ...(componentProps as any),
                  ...(viewProps as any)
                }
              : componentProps;

            const { styles: settingsStyles, ...settingsRest } = settings;
            // TODO: this next line is basically saying 'theme' prop will ALWAYS be available from getCustomizations.
            //        is there mechanism that guarantees theme and other request fields will be defined?
            //        is there a static init that guarantees theme will be provided?
            //        what happens if createTheme/loadTheme is not called?
            //        if so, convey through getCustomizations typing keying off fields. can we convey this
            //          all the way from Customizations with something like { { K in fields }: object}? hmm
            //        if not, how does existing "theme!" styles code work without risk of failing (assuming it doesn't fail)?
            // For now cast return value as if theme is always available.
            const styledProps: TViewProps & IStyledProps<ITheme> = { ...settingsRest, ...(mergedProps as any) };
            const viewComponentProps: IViewComponentProps<TViewProps, IProcessedStyleSet<TStyleSet>> = {
              ...(mergedProps as any),
              ...{
                classNames: mergeStyleSets(
                  _evaluateStyle(styledProps, component.styles),
                  _evaluateStyle(styledProps, settingsStyles),
                  _evaluateStyle(styledProps, mergedProps.styles)
                )
              }
            };

            // If a new context has been generated, instantiate a Provider to provide it.
            return component.view(viewComponentProps);
          };
          return component.state ? <component.state {...componentProps} renderView={renderView} /> : renderView();
        }}
      </CustomizerContext.Consumer>
    );
  };

  result.displayName = component.displayName;

  assign(result, component.statics);

  // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
  return result as React.StatelessComponent<TComponentProps> & TStatics;
}

/**
 * A wrapper function around createComponent to confine generics and component properties for stateless components.
 *
 * @see {@link createComponent} for more information.
 */
export function createStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  component: IStatelessComponent<TComponentProps, TStyleSet, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return createComponent(component as IComponent<TComponentProps, TComponentProps, TStyleSet, TStatics>);
}

/**
 * Evaluate styles based on type to return consistent TStyleSet.
 */
function _evaluateStyle<TViewProps, TStyledProps extends IStyledProps<ITheme>, TStyleSet extends IStyleSet<TStyleSet>>(
  props: TViewProps & TStyledProps,
  styles?: IStyleFunctionOrObject<TViewProps, TStyleSet>
): Partial<TStyleSet> | undefined {
  if (typeof styles === 'function') {
    return styles(props);
  }

  return styles;
}

/**
 * Helper function for calling Customizations.getSettings falling back to default fields.
 *
 * @param displayName Displayable name for component.
 * @param context React context passed to component containing contextual settings.
 * @param fields Optional list of properties of to grab from global store and context.
 */
function _getCustomizations<TViewProps, TStyleSet extends IStyleSet<TStyleSet>>(
  displayName: string,
  context: ICustomizerContext,
  fields?: string[]
): IStyleableComponentProps<TViewProps, TStyleSet> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  const DefaultFields = ['theme', 'styles', 'styleVariables'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
