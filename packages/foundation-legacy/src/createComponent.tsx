import * as React from 'react';
import { concatStyleSets, IStyleSetBase, ITheme } from '@fluentui/style-utilities';
import { Customizations, CustomizerContext, ICustomizerContext } from '@fluentui/utilities';
import { createFactory } from './slots';
import { assign } from './utilities';

import {
  IComponentOptions,
  ICustomizationProps,
  IStyleableComponentProps,
  IStylesFunctionOrObject,
  IToken,
  ITokenFunction,
  IViewComponent,
} from './IComponent';
import { IDefaultSlotProps, ISlotCreator, ValidProps } from './ISlots';

/**
 * Assembles a higher order component based on the following: styles, theme, view, and state.
 * Imposes a separation of concern and centralizes styling processing to increase ease of use and robustness
 * in how components use and apply styling and theming.
 *
 * Automatically merges and applies themes and styles with theme / styleprops having the highest priority.
 * State component, if provided, is passed in props for processing. Props from state / user are automatically processed
 * and styled before finally being passed to view.
 *
 * State components should contain all stateful behavior and should not generate any JSX, but rather simply call
 * the view prop.
 *
 * Views should simply be stateless pure functions that receive all props needed for rendering their output.
 *
 * State component is optional. If state is not provided, created component is essentially a functional
 * stateless component.
 *
 * @param options - component Component options. See IComponentOptions for more detail.
 */
export function createComponent<
  TComponentProps extends ValidProps,
  TTokens,
  TStyleSet extends IStyleSetBase,
  TViewProps extends TComponentProps = TComponentProps,
  TStatics = {},
>(
  view: IViewComponent<TViewProps>,
  options: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TStatics> = {},
): React.FunctionComponent<TComponentProps> & TStatics {
  const { factoryOptions = {} } = options;
  const { defaultProp } = factoryOptions;

  const ResultComponent: React.FunctionComponent<TComponentProps> = (
    componentProps: TComponentProps & IStyleableComponentProps<TViewProps, TTokens, TStyleSet>,
  ) => {
    const settings: ICustomizationProps<TViewProps, TTokens, TStyleSet> = _getCustomizations(
      options.displayName,
      React.useContext(CustomizerContext),
      options.fields,
    );

    const stateReducer = options.state;

    if (stateReducer) {
      // Don't assume state will return all props, so spread useState result over component props.
      componentProps = {
        ...componentProps,
        ...stateReducer(componentProps),
      };
    }

    const theme = componentProps.theme || settings.theme;

    const tokens = _resolveTokens(componentProps, theme, options.tokens, settings.tokens, componentProps.tokens);
    const styles = _resolveStyles(
      componentProps,
      theme,
      tokens,
      options.styles,
      settings.styles,
      componentProps.styles,
    );

    const viewProps = {
      ...componentProps,
      styles,
      tokens,
      _defaultStyles: styles,
      theme,
    } as unknown as TViewProps & IDefaultSlotProps<any>;

    return view(viewProps);
  };

  ResultComponent.displayName = options.displayName || view.name;

  // If a shorthand prop is defined, create a factory for the component.
  // TODO: This shouldn't be a concern of createComponent.. factoryOptions should just be forwarded.
  //       Need to weigh creating default factories on component creation vs. memoizing them on use in slots.tsx.
  if (defaultProp) {
    (ResultComponent as ISlotCreator<TComponentProps, any>).create = createFactory(ResultComponent, { defaultProp });
  }

  assign(ResultComponent, options.statics);

  // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
  return ResultComponent as React.FunctionComponent<TComponentProps> & TStatics;
}

/**
 * Resolve all styles functions with both props and tokens and flatten results along with all styles objects.
 */
function _resolveStyles<TProps, TTokens, TStyleSet extends IStyleSetBase>(
  props: TProps,
  theme: ITheme,
  tokens: TTokens,
  ...allStyles: (IStylesFunctionOrObject<TProps, TTokens, TStyleSet> | undefined)[]
): ReturnType<typeof concatStyleSets> {
  return concatStyleSets(
    ...allStyles.map((styles: IStylesFunctionOrObject<TProps, TTokens, TStyleSet> | undefined) =>
      typeof styles === 'function' ? styles(props, theme, tokens) : styles,
    ),
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
      // TODO: why is this cast needed? TS seems to think there is a (TToken | Function) union from somewhere.
      currentTokens =
        typeof currentTokens === 'function'
          ? (currentTokens as ITokenFunction<TViewProps, TTokens>)(props, theme)
          : currentTokens;

      if (Array.isArray(currentTokens)) {
        currentTokens = _resolveTokens(props, theme, ...currentTokens);
      }

      assign(tokens, currentTokens);
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
function _getCustomizations<TViewProps, TTokens, TStyleSet extends IStyleSetBase>(
  displayName: string | undefined,
  context: ICustomizerContext,
  fields?: string[],
): ICustomizationProps<TViewProps, TTokens, TStyleSet> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  // TODO: tie this array to ICustomizationProps, such that each array element is keyof ICustomizationProps
  const DefaultFields = ['theme', 'styles', 'tokens'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
