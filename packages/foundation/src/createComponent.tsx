import * as React from 'react';
import { concatStyleSets, IStyleSet, ITheme } from '@uifabric/styling';
import { Customizations, CustomizerContext, ICustomizerContext } from '@uifabric/utilities';
import { createFactory } from './slots';
import { assign } from './utilities';

import { IComponent, ICustomizationProps, IStyleableComponentProps, IStylesFunctionOrObject, IToken, IViewRenderer } from './IComponent';
import { IDefaultSlotProps, ISlotCreator } from './ISlots';

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
 * State component is optional. If state is not provided, created component is essentially a functional stateless component.
 *
 * * TComponentProps: A styleable props interface for the created component.
 * * TTokens: The type for tokens props.
 * * TStyleSet: The type for styles properties.
 * * TViewProps: The props specific to the view, including processed properties outputted by optional state component. If state
 * component is not provided, TComponentProps is the same as TViewProps.
 * * TStatics: Static type for statics applied to created component object.
 *
 * @param {IComponent} component Component options. See IComponent for more detail.
 */
export function createComponent<
  TComponentProps,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps = TComponentProps,
  TStatics = {}
>(component: IComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TStatics>): React.StatelessComponent<TComponentProps> & TStatics {
  const { factoryOptions = {} } = component;
  const { defaultProp } = factoryOptions;

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
          const settings: ICustomizationProps<TViewProps, TTokens, TStyleSet> = _getCustomizations(
            component.displayName,
            context,
            component.fields
          );

          const renderView: IViewRenderer<TViewProps> = viewProps => {
            // The approach here is to allow state components to provide only the props they care about, automatically
            //    merging user props and state props together. This ensures all props are passed properly to view,
            //    including children and styles.
            // TODO: for full 'fields' support, 'rest' props from customizations need to pass onto view.
            //        however, customized props like theme will break snapshots. how is styled not showing theme output in snapshots?
            const mergedProps: TViewProps & IStyleableComponentProps<TViewProps, TTokens, TStyleSet> = viewProps
              ? {
                  ...(componentProps as any),
                  ...(viewProps as any)
                }
              : componentProps;

            const theme = mergedProps.theme || settings.theme;

            const tokens = _resolveTokens(mergedProps, theme, component.tokens, settings.tokens, mergedProps.tokens);
            const styles = _resolveStyles(mergedProps, theme, tokens, component.styles, settings.styles, mergedProps.styles);

            const viewComponentProps: typeof mergedProps & IDefaultSlotProps<any> = {
              ...(mergedProps as any),
              _defaultStyles: styles
            };

            return component.view(viewComponentProps);
          };
          return component.state ? <component.state {...componentProps} renderView={renderView} /> : renderView();
        }}
      </CustomizerContext.Consumer>
    );
  };

  result.displayName = component.displayName;

  // If a shorthand prop is defined, create a factory for the component.
  // TODO: This shouldn't be a concern of createComponent.. factoryOptions should just be forwarded.
  //       Need to weigh creating default factories on component creation vs. memozing them on use in slots.tsx.
  if (defaultProp) {
    (result as ISlotCreator<TComponentProps>).create = createFactory(result, { defaultProp });
  }

  assign(result, component.statics);

  // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
  return result as React.StatelessComponent<TComponentProps> & TStatics;
}

/**
 * Resolve all styles functions with both props and tokens and flatten results along with all styles objects.
 */
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

/**
 * Resolve all tokens functions with props flatten results along with all tokens objects.
 */
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

      assign(tokens, ...(currentTokens as any));
    }
  }

  return tokens as TTokens;
}

/**
 * Helper function for calling Customizations.getSettings falling back to default fields.
 *
 * @param displayName Displayable name for component.
 * @param context React context passed to component containing contextual settings.
 * @param fields Optional list of properties to grab from global store and context.
 */
function _getCustomizations<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  displayName: string,
  context: ICustomizerContext,
  fields?: string[]
): ICustomizationProps<TViewProps, TTokens, TStyleSet> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  // TOOD: tie this array to ICustomizationProps, such that each array element is keyof ICustomizationProps
  const DefaultFields = ['theme', 'styles', 'tokens'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
