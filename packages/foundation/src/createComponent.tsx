import * as React from 'react';
import { concatStyleSets, IStyleSet, ITheme, mergeStyleSets } from '@uifabric/styling';
import { Customizations, CustomizerContext, ICustomizerContext } from '@uifabric/utilities';
import { assign } from './utilities';

import {
  IComponent,
  ICustomizationProps,
  IStatelessComponent,
  IStyleableComponentProps,
  IStylesFunctionOrObject,
  IToken
} from './IComponent';

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
export function createComponent<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens = {}, TStatics = {}>(
  component: IComponent<TComponentProps, TViewProps, TStyleSet, TTokens, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  const result: React.StatelessComponent<TComponentProps> = (componentProps: TComponentProps) => {
    return (
      // TODO: createComponent is also probably affected by https://github.com/OfficeDev/office-ui-fabric-react/issues/6603
      <CustomizerContext.Consumer>
        {(context: ICustomizerContext) => {
          const settings: ICustomizationProps<TViewProps, TStyleSet, TTokens> = _getCustomizations(
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
            const mergedProps: IStyleableComponentProps<TViewProps, TStyleSet, TTokens> = viewProps
              ? {
                ...(componentProps as any),
                ...(viewProps as any)
              }
              : componentProps;

            // TODO: is this the best way to trigger old vs. new behavior?
            // TODO: before we can get rid of old code, the following things need to change with existing experimental components:
            //        1. styles functions need to take in theme as separate arg
            //        2. need to be converted to slots? how else will subcomponents get styling?
            // TODO: Is the new way forcing all subcomponents to be slots as written? how else will subcomponents get styling?
            //        Is this forcing a requirement that every styleable section needs to be a slot?
            //        How will components apply classNames/styling if they don't use Slots?
            // TODO: Phase 2: phase out old approach with any existing components using createComponent (mostly Persona with style sections)
            //        If Mark's Persona PR is merged before this one, may be able to take this out entirely.
            if (!component.tokens) {
              // NOTE: this old approach will have no type safety due to type conflicts with new approach. to be removed entirely.

              const { styles: settingsStyles, ...settingsRest } = settings;
              // TODO: this next line is basically saying 'theme' prop will ALWAYS be available from getCustomizations.
              //        is there mechanism that guarantees theme and other request fields will be defined?
              //        is there a static init that guarantees theme will be provided?
              //        what happens if createTheme/loadTheme is not called?
              //        if so, convey through getCustomizations typing keying off fields. can we convey this
              //          all the way from Customizations with something like { { K in fields }: object}? hmm
              //        if not, how does existing "theme!" styles code work without risk of failing (assuming it doesn't fail)?
              // For now cast return value as if theme is always available.
              const styledProps = { ...settingsRest, ...(mergedProps as any) };

              const viewComponentProps = {
                ...(mergedProps as any),
                ...{
                  classNames: mergeStyleSets(
                    // TOOD: need theme arg to resolve styles? will need to do this if ALL createComponent styles functions have
                    //        theme as a separate argument.
                    _evaluateStyle(styledProps, styledProps.theme, component.styles),
                    _evaluateStyle(styledProps, styledProps.theme, settingsStyles),
                    _evaluateStyle(styledProps, styledProps.theme, mergedProps.styles)
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
              //        Stack seems to have a case of this with "wrap" prop and "inner" section but is Stack doing the right thing?
              // TODO: Callout: Resolving tokens and styles here means only `theme` prop at component level will apply. Any theme props
              //        passed to slots by user or internal to component will not take effect since they are not available here.

              // TODO: keep themes as part of mergedProps or make separate variable? (might clean up awkward typings to make it separate)
              // TODO: then again, createComponent shouldn't know about settings that are being passed on... it should NOT be a separate arg
              // TODO: david mentioned avoiding mixins for perf, but with theme (and other fields) coming from either settings or props,
              //        I don't think we have a choice.. they need to be mixed in
              // TODO: conclusion: createComponent has to know about key settings (styles, tokens) already, so if tokens is the only other
              //        one, just keep it separate. All other customized settings (Layer fields, etc.) need to be forwarded in merged Props.
              const tokens = _resolveTokens(mergedProps, theme, component.tokens, settings.tokens, mergedProps.tokens);
              const styles = _resolveStyles(mergedProps, theme, tokens, component.styles, settings.styles, mergedProps.styles);

              const viewComponentProps: TViewProps = {
                ...mergedProps,
                // TODO: This is a "hidden" prop that view components shouldn't be aware of.
                //        Is this the best way to do this? Are we sure we don't want to create new objects with theme
                //        and tokens rather than pass them through separately?
                //        Figure out a way to deal with this without using cast to any.
                //          const viewComponentProps: TViewProps & ISlotProps<> =
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
export function createStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens = {}, TStatics = {}>(
  component: IStatelessComponent<TComponentProps, TStyleSet, TTokens, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return createComponent(component as IComponent<TComponentProps, TComponentProps, TStyleSet, TTokens, TStatics>);
}

/**
 * Evaluate styles based on type to return consistent TStyleSet.
 */
// TODO: remove when old createComponent is removed
function _evaluateStyle<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  props: TViewProps,
  theme: ITheme,
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>
): Partial<TStyleSet> | undefined {
  if (typeof styles === 'function') {
    return styles(props, theme, {} as TTokens);
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

// TODO: add tests to deal with various cases: no tokens, undefined, etc.
function _resolveTokens<TViewProps, TTokens>
  (props: TViewProps, theme: ITheme, ...allTokens: (IToken<TViewProps, TTokens> | false | null | undefined)[]): TTokens {
  const tokens = {};

  for (let currentTokens of allTokens) {
    if (currentTokens) {
      currentTokens = typeof currentTokens === 'function'
        ? currentTokens(props, theme)
        : currentTokens;

      if (Array.isArray(currentTokens)) {
        currentTokens = _resolveTokens(props, theme, ...currentTokens);
      }

      Object.assign(tokens, ...(currentTokens as any));
    }
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
): ICustomizationProps<TViewProps, TStyleSet, TTokens> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  // TODO: remove styleVariables
  // TOOD: tie this array to ICustomizationProps, such that each array element is keyof ICustomizationProps
  const DefaultFields = ['theme', 'styles', 'styleVariables', 'tokens'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
