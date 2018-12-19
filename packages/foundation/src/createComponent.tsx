import * as React from 'react';
import { concatStyleSets, IProcessedStyleSet, IStyleSet, ITheme, mergeStyleSets } from '@uifabric/styling';
// import { Customizations, CustomizerContext, ICustomizerContext, IStyleFunctionOrObject } from '@uifabric/utilities';
import { Customizations, CustomizerContext, ICustomizerContext } from '@uifabric/utilities';

import { assign } from './utilities';

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
export type IStylesFunction<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  (props: TViewProps, theme: ITheme, tokens: TTokens) => Partial<TStyleSet>;

export interface ITokenBaseArray<TViewProps, TTokens> extends Array<ITokenFunctionOrObject<TViewProps, TTokens>> { }
export type ITokenBase<TViewProps, TTokens> = ITokenFunctionOrObject<TViewProps, TTokens> | ITokenBaseArray<TViewProps, TTokens>;

// export type ITokenFunction<TViewProps, TTokens> = (props: TViewProps, theme: ITheme) => TTokens;
export type ITokenFunction<TViewProps, TTokens> = (props: TViewProps, theme: ITheme) => ITokenBase<TViewProps, TTokens>;

export type IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStylesFunction<TViewProps, TTokens, TStyleSet>
  | Partial<TStyleSet>;

export type ITokenFunctionOrObject<TViewProps, TTokens> =
  | ITokenFunction<TViewProps, TTokens>
  | TTokens;

/**
 * Optional props for styleable components. If these props are present, they will automatically be
 * used by Foundation when applying theming and styling.
 */
export interface IStyleableComponentProps<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> {
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>;
  theme?: ITheme;
  tokens?: ITokenFunctionOrObject<TViewProps, TTokens>;
}

type ICustomizationProps<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  IStyleableComponentProps<TViewProps, TTokens, TStyleSet> &
  Required<Pick<IStyleableComponentProps<TViewProps, TTokens, TStyleSet>, 'theme'>>;

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
export interface IComponentOptions<TComponentProps, TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> {
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
  tokens?: ITokenBase<TViewProps, TTokens>;
}

// TODO: Known TypeScript issue is widening return type checks when using function type declarations.
//        Effect is that mistyped property keys on returned style objects will not generate errors.
//        This affects lookup types used as functional decorations on IComponent and IStatelessComponent, e.g.:
//        export const styles: IStackComponent['styles'] = props => {
//        Existing issue: https://github.com/Microsoft/TypeScript/issues/241

/**
 * Variant of IComponentOptions for stateful components with appropriate typing and required properties.
 */
export type IComponent<TComponentProps, TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> = IComponentOptions<
  TComponentProps,
  TViewProps,
  TTokens,
  TStyleSet,
  TStatics
  > &
  Required<Pick<IComponentOptions<TComponentProps, TComponentProps, TTokens, TStyleSet, TStatics>, 'state'>>;

/**
 * Variant of IComponentOptions for stateless components with appropriate typing and required properties.
 */
export type IStatelessComponent<TComponentProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> = Omit<
  IComponentOptions<TComponentProps, TComponentProps, TTokens, TStyleSet, TStatics>,
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
export function createComponent<TComponentProps, TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  component: IComponent<TComponentProps, TViewProps, TTokens, TStyleSet, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  const result: React.StatelessComponent<TComponentProps> = (componentProps: TComponentProps) => {
    return (
      // TODO: createComponent is also probably affected by https://github.com/OfficeDev/office-ui-fabric-react/issues/6603
      <CustomizerContext.Consumer>
        {(context: ICustomizerContext) => {
          const settings: ICustomizationProps<TViewProps, TTokens, TStyleSet> = _getCustomizations(
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
            const mergedProps: IStyleableComponentProps<TViewProps, TTokens, TStyleSet> = viewProps
              ? {
                ...(componentProps as any),
                ...(viewProps as any)
              }
              : componentProps;

            // TODO: is this the best way to trigger old vs. new behavior?
            // TODO: before we can get rid of old code, the following things need to change with existing experimental components:
            //        1. styles functions need to take in theme as separate arg
            //        2. need to be converted to slots? how else will subcomponents get styling?
            // TODO: is the new way forcing all subcomponents to be slots as written? how else will subcomponents get styling?
            //        is this forcing a requirement that every styleable section needs to be a slot?
            // TODO: Phase 2: phase out old approach with any existing components using createComponent (mostly Persona with style sections)
            //        If Mark's Persona PR is merged before this one, may be able to take this out entirely.
            if (!component.tokens) {
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

              return component.view(viewComponentProps);
            } else {
              const theme = mergedProps.theme || settings.theme;

              // console.log('settings.styles: ' + settings.styles);

              // TOOD: Callout: This new approach removes classNames from props and makes it unavailable to views. This basically means
              //        that Slots are required for each style section. Is this what we want? Are there use cases where there'll be style
              //        sections not associated with Slots? If so, how will they have className applied?
              // TODO: keep themes as part of mergedProps or make separate variable? (might clean up awkward typings to make it separate)
              // TODO: then again, createComponent shouldn't know about settings that are being passed on... it should NOT be a separate arg
              // TODO: david mentioned avoiding mixins for perf, but with theme (and other fields) coming from either settings or props,
              //        I don't think we have a choice.. they need to be mixed in
              // TODO: conclusion: createComponent has to know about key settings (styles, tokens) already, so if tokens is the only other
              //        one, just keep it separate. All other customized settings (Layer fields, etc.) need to be forwarded in merged Props.
              const tokens = _resolveTokens(mergedProps, theme, component.tokens, settings.tokens, mergedProps.tokens);
              const styles = _resolveStyles(mergedProps, theme, tokens, component.styles, settings.styles, mergedProps.styles);

              console.log('styles: ' + JSON.stringify(styles));

              const viewComponentProps: TViewProps = {
                ...mergedProps,
                // TODO: This is a "hidden" prop that view components shouldn't be aware of.
                //        Is this the best way to do this?
                //        Figure out a way to deal with this without using cast to any.
                //         const viewComponentProps: TViewProps & ISlotProps<> =
                _defaultStyles: styles
              } as any;

              return component.view(viewComponentProps);
            }
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
export function createStatelessComponent<TComponentProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  component: IStatelessComponent<TComponentProps, TTokens, TStyleSet, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return createComponent(component as IComponent<TComponentProps, TComponentProps, TTokens, TStyleSet, TStatics>);
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
 * Resolve all styles functions with both props and tokens and flatten results along with all styles objects.
 */
// const _resolveStyles = (props, theme, tokens, ...allStyles) =>
//   concatStyleSets(...allStyles.map(styles => (typeof styles === 'function') ? styles(props, theme, tokens) : styles));

function _resolveStyles<TProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  props: TProps,
  theme: ITheme,
  tokens: TTokens,
  ...allStyles: (IStylesFunctionOrObject<TProps, TTokens, TStyleSet> | undefined)[]): ReturnType<typeof concatStyleSets> {
  return concatStyleSets(...allStyles.map((styles: IStylesFunctionOrObject<TProps, TTokens, TStyleSet> | undefined) =>
    (typeof styles === 'function') ? styles(props, theme, tokens) : styles));
}

/**
 * Resolve all token functions with props and flatten results along with all token objects.
 */
// const _resolveTokens = (props, theme, ...allTokens) => {
//   const tokens = {};

//   for (let currentTokens of allTokens) {
//     currentTokens = typeof currentTokens === 'function'
//       ? currentTokens(props, theme)
//       : currentTokens;

//     if (Array.isArray(currentTokens)) {
//       currentTokens = _resolveTokens(props, theme, ...currentTokens);
//     }

//     Object.assign(tokens, ...currentTokens);
//   }

//   return tokens;
// };

function _resolveTokens<TViewProps, TTokens>
  (props: TViewProps, theme: ITheme, ...allTokens: (ITokenBase<TViewProps, TTokens> | undefined)[]): TTokens {
  const tokens = {};

  for (let currentTokens of allTokens) {
    currentTokens = typeof currentTokens === 'function'
      ? currentTokens(props, theme)
      : currentTokens;

    if (Array.isArray(currentTokens)) {
      currentTokens = _resolveTokens(props, theme, ...currentTokens);
    }

    Object.assign(tokens, ...(currentTokens as any));
  }

  // TODO: does it make sense that all tokens will always be optional? {} should be a valid TTokens object, if that's true.
  // TODO: is it practical to have TTokens extends {} or object somehow to avoid this cast?
  return tokens as TTokens;
}

/**
 * Helper function for calling Customizations.getSettings falling back to default fields.
 *
 * @param displayName Displayable name for component.
 * @param context React context passed to component containing contextual settings.
 * @param fields Optional list of properties of to grab from global store and context.
 */
function _getCustomizations<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  displayName: string,
  context: ICustomizerContext,
  fields?: string[]
): ICustomizationProps<TViewProps, TTokens, TStyleSet> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  // TODO: remove styleVariables
  // TOOD: tie this array to ICustomizationProps, such that each array element is keyof ICustomizationProps
  const DefaultFields = ['theme', 'styles', 'styleVariables', 'tokens'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
