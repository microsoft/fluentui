import * as React from 'react';
import { mergeStyles } from '@uifabric/merge-styles';
import { concatStyleSets, IStyleSet, ITheme } from '@uifabric/styling';
import { Customizations, CustomizerContext, ICustomizerContext } from '@uifabric/utilities';
import { createFactory, getSlots } from '../slots';
import { assign } from '../utilities';
import { ICustomizationProps, IStyleableComponentProps, IStylesFunctionOrObject, IToken, ITokenFunction } from '../IComponent';
import { IComponentOptions } from './IComponent';
import { IDefaultSlotProps, ISlotCreator, ValidProps, ISlottableProps } from '../ISlots';

interface IClassNamesMapNode {
  className?: string;
  map: IClassNamesMap;
}

interface IClassNamesMap {
  [key: string]: IClassNamesMapNode;
}

const memoizedClassNamesMap: IClassNamesMap = {};

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
 * @param options - component Component options. See IComponentOptions for more detail.
 */
export function composed<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
>(
  options: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> = {}
): React.FunctionComponent<TComponentProps> & TStatics {
  const { factoryOptions = {}, view } = options;
  const { defaultProp } = factoryOptions;

  const result: React.FunctionComponent<TComponentProps> = (
    componentProps: TViewProps & IStyleableComponentProps<TViewProps, TTokens, TStyleSet>
  ) => {
    const settings: ICustomizationProps<TViewProps, TTokens, TStyleSet> = _getCustomizations(
      options.displayName,
      React.useContext(CustomizerContext),
      options.fields
    );

    const useState = options.state;

    if (useState) {
      // Don't assume state will return all props, so spread useState result over component props.
      componentProps = {
        ...componentProps,
        ...useState(componentProps)
      };
    }

    const theme = componentProps.theme || settings.theme;
    const tokens = _resolveTokens(componentProps, theme, options.tokens, settings.tokens, componentProps.tokens) as any;
    let styles;

    const finalStyles: { [key: string]: string | undefined } = {};

    // We get the entry in the memoized classNamesMap for the current component or create one if it doesn't exist.
    const displayName = options.displayName;

    // If no displayName has been specified, then do not use caching.
    if (displayName) {
      if (!memoizedClassNamesMap.hasOwnProperty(displayName)) {
        memoizedClassNamesMap[displayName] = { map: {} };
      }

      let current = memoizedClassNamesMap[displayName];

      // Memoize based on the tokens definition.
      const tokenKeys = Object.keys(tokens).sort();
      for (const key of tokenKeys) {
        let nextToken = tokens[key];
        if (nextToken === undefined) {
          nextToken = '__undefined__';
        }
        if (!current.map.hasOwnProperty(nextToken)) {
          current.map[nextToken] = { map: {} };
        }
        current = current.map[nextToken];
      }

      // Memoize the slots so we only have to get Object.keys once.
      let slots = (memoizedClassNamesMap[displayName] as any).slots;
      let defaultStyles;
      if (!slots) {
        defaultStyles = _resolveStyles(componentProps, theme, tokens, options.styles, settings.styles);
        (memoizedClassNamesMap[displayName] as any).slots = Object.keys(defaultStyles);
        slots = (memoizedClassNamesMap[displayName] as any).slots;
      }

      // Memoize based on the base styling of the component (i.e. without user specified props).
      for (const key of slots) {
        if (!current.map.hasOwnProperty(key)) {
          // Get default styles once if we didn't get them before.
          if (!defaultStyles) {
            defaultStyles = _resolveStyles(componentProps, theme, tokens, options.styles, settings.styles);
          }
          current.map[key] = { className: mergeStyles(defaultStyles[key]), map: {} };
        }
        finalStyles[key] = current.map[key].className;
      }

      if (componentProps.styles) {
        const userStyles: any =
          typeof componentProps.styles === 'function'
            ? componentProps.styles(componentProps as TViewProps, theme, tokens)
            : componentProps.styles;
        styles = concatStyleSets(styles, userStyles);
        if (userStyles) {
          const userStyleKeys = Object.keys(userStyles);
          for (const key of userStyleKeys) {
            if (finalStyles.hasOwnProperty(key)) {
              finalStyles[key] = mergeStyles([current.map[key].className], userStyles[key]);
            } else {
              finalStyles[key] = mergeStyles(userStyles[key]);
            }
          }
        }
      }
    } else {
      styles = _resolveStyles(componentProps, theme, tokens, options.styles, settings.styles, componentProps.styles);
    }

    const viewProps = {
      ...componentProps,
      styles,
      tokens,
      _defaultStyles: displayName ? finalStyles : styles
    } as TViewProps & IDefaultSlotProps<any>;

    if (!options.slots) {
      throw new Error(`Component ${options.displayName || (view && view.name) || ''} is missing slot definitions.`);
    }

    const Slots = typeof options.slots === 'function' ? getSlots(viewProps, options.slots(viewProps)) : getSlots(viewProps, options.slots);

    return view ? view(viewProps, Slots) : null;
  };

  result.displayName = options.displayName || (view && view.name);

  // If a shorthand prop is defined, create a factory for the component.
  // TODO: This shouldn't be a concern of createComponent.. factoryOptions should just be forwarded.
  //       Need to weigh creating default factories on component creation vs. memoizing them on use in slots.tsx.
  if (defaultProp) {
    (result as ISlotCreator<TComponentProps, any>).create = createFactory(result, { defaultProp });
  }

  assign(result, options.statics);

  // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
  return result as React.FunctionComponent<TComponentProps> & TStatics;
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
      // TODO: why is this cast needed? TS seems to think there is a (TToken | Function) union from somewhere.
      currentTokens =
        typeof currentTokens === 'function' ? (currentTokens as ITokenFunction<TViewProps, TTokens>)(props, theme) : currentTokens;

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
  displayName: string | undefined,
  context: ICustomizerContext,
  fields?: string[]
): ICustomizationProps<TViewProps, TTokens, TStyleSet> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  // TODO: tie this array to ICustomizationProps, such that each array element is keyof ICustomizationProps
  const DefaultFields = ['theme', 'styles', 'tokens'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
