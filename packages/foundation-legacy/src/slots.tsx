import * as React from 'react';
import { mergeCss } from '@fluentui/merge-styles';
import { IStyle, ITheme } from '@fluentui/style-utilities';
import { getRTL, memoizeFunction } from '@fluentui/utilities';
import { assign } from './utilities';
import { IFactoryOptions } from './IComponent';
import {
  ISlottableReactType,
  ISlot,
  ISlots,
  ISlotDefinition,
  ISlotFactory,
  ISlotProp,
  ISlottableProps,
  ISlotOptions,
  IDefaultSlotProps,
  IProcessedSlotProps,
  ValidProps,
  ValidShorthand,
} from './ISlots';

/**
 * This function is required for any module that uses slots.
 *
 * This function is a slot resolver that automatically evaluates slot functions to generate React elements.
 * A byproduct of this resolver is that it removes slots from the React hierarchy by bypassing React.createElement.
 *
 * To use this function on a per-file basis, use the jsx directive targeting withSlots.
 * This directive must be the FIRST LINE in the file to work correctly.
 * Usage of this pragma also requires withSlots import statement.
 *
 * See React.createElement
 */
// Can't use typeof on React.createElement since it's overloaded. Approximate createElement's signature for now
// and widen as needed.
export function withSlots<P extends {}>(
  type: ISlot<P> | React.FunctionComponent<P> | string,
  props?: (React.Attributes & P) | null,
  ...children: React.ReactNode[]
): ReturnType<React.FunctionComponent<P>> {
  const slotType = type as ISlot<P>;
  if (slotType.isSlot) {
    // Since we are bypassing createElement, use React.Children.toArray to make sure children are
    // properly assigned keys.
    // TODO: should this be mutating? does React mutate children subprop with createElement?
    // TODO: will toArray clobber existing keys?
    // TODO: React generates warnings because it doesn't detect hidden member _store that is set in createElement.
    //        Even children passed to createElement without keys don't generate this warning.
    //        Is there a better way to prevent slots from appearing in hierarchy? toArray doesn't address root issue.
    children = React.Children.toArray(children);

    // TODO: There is something weird going on here with children embedded in props vs. rest args.
    // Comment out these lines to see. Make sure this function is doing the right things.
    if (children.length === 0) {
      return slotType(props);
    }

    return slotType({ ...(props as any), children });
  } else {
    // TODO: Are there some cases where children should NOT be spread? Also, spreading reraises perf question.
    //        Children had to be spread to avoid breaking KeytipData in Toggle.view:
    //        react-dom.development.js:18931 Uncaught TypeError: children is not a function
    //        Without spread, function child is a child array of one element
    // TODO: is there a reason this can't be:
    // return React.createElement.apply(this, arguments);
    return React.createElement(type, props, ...children);
  }
}

/**
 * This function creates factories that render ouput depending on the user ISlotProp props passed in.
 * @param DefaultComponent - Base component to render when not overridden by user props.
 * @param options - Factory options, including defaultProp value for shorthand prop mapping.
 * @returns ISlotFactory function used for rendering slots.
 */
export function createFactory<TProps extends ValidProps, TShorthandProp extends ValidShorthand = never>(
  DefaultComponent: React.ComponentType<TProps>,
  options: IFactoryOptions<TProps> = {},
): ISlotFactory<TProps, TShorthandProp> {
  const { defaultProp = 'children' } = options;

  const result: ISlotFactory<TProps, TShorthandProp> = (
    componentProps,
    userProps,
    userSlotOptions,
    defaultStyles,
    theme,
  ) => {
    // If they passed in raw JSX, just return that.
    if (React.isValidElement(userProps)) {
      return userProps;
    }

    const flattenedUserProps: TProps | undefined = _translateShorthand(defaultProp as string, userProps);
    const finalProps = _constructFinalProps(defaultStyles, theme, componentProps, flattenedUserProps);

    if (userSlotOptions) {
      if (userSlotOptions.component) {
        // TODO: Remove cast if possible. This cast is needed because TS errors on the intrinsic portion of ReactType.
        // return <userSlotOptions.component {...finalProps} />;
        const UserComponent = userSlotOptions.component as React.ComponentType<TProps>;
        return <UserComponent {...finalProps} />;
      }

      if (userSlotOptions.render) {
        return userSlotOptions.render(finalProps, DefaultComponent);
      }
    }

    return <DefaultComponent {...finalProps} />;
  };

  return result;
}

/**
 * Default factory for components without explicit factories.
 */
const defaultFactory = memoizeFunction(type => createFactory(type));

/**
 * This function generates slots that can be used in JSX given a definition of slots and their corresponding types.
 * @param userProps - Props as pass to component.
 * @param slots - Slot definition object defining the default slot component for each slot.
 * @returns A set of created slots that components can render in JSX.
 */
export function getSlots<TComponentProps extends ISlottableProps<TComponentSlots>, TComponentSlots>(
  userProps: TComponentProps,
  slots: ISlotDefinition<Required<TComponentSlots>>,
): ISlots<Required<TComponentSlots>> {
  const result: ISlots<Required<TComponentSlots>> = {} as ISlots<Required<TComponentSlots>>;

  // userProps already has default props mixed in by createComponent. Recast here to gain typing for this function.
  const mixedProps = userProps as TComponentProps & IDefaultSlotProps<TComponentSlots>;

  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      // This closure method requires the use of withSlots to prevent unnecessary rerenders. This is because React
      // detects each closure as a different component (since it is a new instance) from the previous one and then
      // forces a rerender of the entire slot subtree. For now, the only way to avoid this is to use withSlots, which
      // bypasses the call to React.createElement.
      const slot: ISlots<Required<TComponentSlots>>[keyof TComponentSlots] = (componentProps, ...args: any[]) => {
        if (args.length > 0) {
          // If React.createElement is being incorrectly used with slots, there will be additional arguments.
          // We can detect these additional arguments and error on their presence.
          throw new Error('Any module using getSlots must use withSlots. Please see withSlots javadoc for more info.');
        }
        // TODO: having TS infer types here seems to cause infinite loop.
        //   use explicit types or casting to preserve typing if possible.
        // TODO: this should be a lookup on TProps property instead of being TProps directly, which is probably
        //   causing the infinite loop
        return _renderSlot<any, any, any>(
          slots[name],
          // TODO: this cast to any is hiding a relationship issue between the first two args
          componentProps as any,
          mixedProps[name],
          mixedProps.slots && mixedProps.slots[name],
          // _defaultStyles should always be present, but a check for existence is added to make view tests
          // easier to use.
          mixedProps._defaultStyles && mixedProps._defaultStyles[name],
          (mixedProps as any).theme,
        );
      };
      slot.isSlot = true;
      result[name] = slot;
    }
  }

  return result;
}

/**
 * Helper function that translates shorthand as needed.
 * @param defaultProp
 * @param slotProps
 */
function _translateShorthand<TProps extends ValidProps, TShorthandProp extends ValidShorthand>(
  defaultProp: string,
  slotProps: ISlotProp<TProps, TShorthandProp>,
): TProps | undefined {
  let transformedProps: TProps | undefined;

  if (typeof slotProps === 'string' || typeof slotProps === 'number' || typeof slotProps === 'boolean') {
    transformedProps = {
      [defaultProp]: slotProps as any,
    } as TProps;
  } else {
    transformedProps = slotProps as TProps;
  }

  return transformedProps;
}

/**
 * Helper function that constructs final styles and props given a series of props ordered by increasing priority.
 */
function _constructFinalProps<TProps extends IProcessedSlotProps>(
  defaultStyles: IStyle,
  theme?: ITheme,
  ...allProps: (TProps | undefined)[]
): TProps {
  const finalProps: TProps = {} as any;
  const classNames: (string | undefined)[] = [];

  for (const props of allProps) {
    classNames.push(props && props.className);
    assign(finalProps, props);
  }

  finalProps.className = mergeCss([defaultStyles, classNames], { rtl: getRTL(theme) });

  return finalProps;
}

/**
 * Render a slot given component and user props. Uses component factory if available, otherwise falls back
 * to default factory.
 * @param ComponentType Factory component type.
 * @param componentProps The properties passed into slot from within the component.
 * @param userProps The user properties passed in from outside of the component.
 */
function _renderSlot<
  TSlotComponent extends ISlottableReactType<TSlotProps, TSlotShorthand>,
  TSlotProps extends ValidProps,
  TSlotShorthand extends ValidShorthand,
>(
  ComponentType: TSlotComponent,
  componentProps: TSlotProps,
  userProps: ISlotProp<TSlotProps, TSlotShorthand>,
  slotOptions: ISlotOptions<TSlotProps> | undefined,
  defaultStyles: IStyle,
  theme?: ITheme,
): ReturnType<React.FunctionComponent> {
  if (ComponentType.create !== undefined) {
    return ComponentType.create(componentProps, userProps, slotOptions, defaultStyles);
  } else {
    // TODO: need to resolve typing / generic issues passing through memoizeFunction. for now, cast to 'unknown'
    return (defaultFactory(ComponentType) as unknown as ISlotFactory<TSlotProps, TSlotShorthand>)(
      componentProps,
      userProps,
      slotOptions,
      defaultStyles,
      theme,
    );
  }
}
