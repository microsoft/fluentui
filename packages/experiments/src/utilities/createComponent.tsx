import * as React from 'react';
import { concatStyleSets, IStyleSet, ITheme } from '@uifabric/styling';
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
      // TODO: createComponent is also affected by https://github.com/OfficeDev/office-ui-fabric-react/issues/6603
      <CustomizerContext.Consumer>
        {(context: ICustomizerContext) => {
          // TODO: this next line is basically saying 'theme' prop will ALWAYS be available from getCustomizations
          //        via ICustomizationProps cast. Is there mechanism that guarantees theme and other request fields will be defined?
          //        is there a static init that guarantees theme will be provided?
          //        what happens if createTheme/loadTheme is not called?
          //        if so, convey through getCustomizations typing keying off fields. can we convey this
          //          all the way from Customizations with something like { { K in fields }: object}? hmm
          //        if not, how does existing "theme!" styles code work without risk of failing (assuming it doesn't fail)?
          // For now cast return value as if theme is always available.
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

            const theme = mergedProps.theme || settings.theme;

            const tokens = _resolveTokens(mergedProps, theme, component.tokens, settings.tokens, mergedProps.tokens);
            const styles = _resolveStyles(mergedProps, theme, tokens, component.styles, settings.styles, mergedProps.styles);

            const viewComponentProps: TViewProps = {
              ...mergedProps,
              // TODO: Figure out a way to deal with this without using cast to any.
              //          const viewComponentProps: TViewProps & ISlotProps<> =
              _defaultStyles: styles
            } as any;

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
export function createStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TTokens = {}, TStatics = {}>(
  component: IStatelessComponent<TComponentProps, TStyleSet, TTokens, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return createComponent(component as IComponent<TComponentProps, TComponentProps, TStyleSet, TTokens, TStatics>);
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
  ...allStyles: (IStylesFunctionOrObject<TProps, TTokens, TStyleSet> | undefined)[]
): ReturnType<typeof concatStyleSets> {
  return concatStyleSets(
    ...allStyles.map((styles: IStylesFunctionOrObject<TProps, TTokens, TStyleSet> | undefined) =>
      typeof styles === 'function' ? styles(props, theme, tokens) : styles
    )
  );
}

// TODO: add tests to deal with various cases: no tokens, undefined, etc.
function _resolveTokens<TViewProps, TTokens>(
  props: TViewProps,
  theme: ITheme,
  ...allTokens: (IToken<TViewProps, TTokens> | false | null | undefined)[]
): TTokens {
  const tokens = {};

  for (let currentTokens of allTokens) {
    if (currentTokens) {
      currentTokens = typeof currentTokens === 'function' ? currentTokens(props, theme) : currentTokens;

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
