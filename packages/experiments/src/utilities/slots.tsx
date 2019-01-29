import * as React from 'react';
import { IStyle, mergeStyles } from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';
import { assign } from './utilities';
import {
  ISlottableReactType,
  IFactoryOptions,
  ISlot,
  ISlots,
  ISlotDefinition,
  ISlotFactory,
  ISlotProps,
  ISlotPropValue,
  ISlotRenderer,
  IDefaultSlotProps,
  IProcessedSlotProps
} from './ISlots';

// TODO: Is getting only div props for 'root' slots is pretty limiting? Or is it exactly as it needs to be?
//        Another example is getting Toggle state for `label` slot render functions. Should it get Toggle props instead?
//        Needs more usage to rationalize the best approach. If we want component props, component props are passed
//        as each slot as rendered and aren't available when getSlots is called. This would substantially change this approach.

/**
 * This function is required for any module that uses slots.
 *
 * This function is a slot resolver that automatically evaluates slot functions to generate React elements.
 * A byproduct of this resolver is that it removes slots from the React hierarchy by bypassing React.createElement.
 *
 * To use this function on a per-file basis, put the following directive in a comment block: @jsx withSlots
 * Usage of this pragma also requires an import statement of SlotModule such as: import { withSlots } from '@uifabric/foundation';
 * Also, this directive must be the FIRST LINE in the file to work correctly.
 *
 * @see React.createElement
 */
// Can't use typeof on React.createElement since it's overloaded. Approximate createElement's signature for now and widen as needed.
export function withSlots<P>(
  type: ISlot<P> | React.SFC<P> | string,
  props?: React.Attributes & P | null,
  // tslint:disable-next-line:missing-optional-annotation
  ...children: React.ReactNode[]
): React.ReactElement<P> | JSX.Element | null {
  const slotType = type as ISlot<P>;
  if (slotType.isSlot) {
    const numChildren = React.Children.count(children);
    if (numChildren === 0) {
      return slotType(props);
    }

    // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
    // TODO: should this be mutating? does React mutate children subprop with createElement?
    // TODO: will toArray clobber existing keys?
    // TODO: React generates warnings because it doesn't detect hidden member _store that is set in createElement.
    //        Even children passed to createElement without keys don't generate this warning.
    //        Is there a better way to prevent slots from appearing in hierarchy? toArray doesn't address root issue.
    children = React.Children.toArray(children);

    return slotType({ ...(props as any), children });
  } else {
    // TODO: Are there some cases where children should NOT be spread? Also, spreading reraises perf question.
    //        Children had to be spread to avoid breaking KeytipData in Toggle.view:
    //        react-dom.development.js:18931 Uncaught TypeError: children is not a function
    //        Without spread, function child is a child array of one element
    return React.createElement(type, props, ...children);
  }
}

/**
 * This function creates factories that render ouput depending on the user ISlotProp props passed in.
 * @param ComponentType Base component to render when not overridden by user props.
 * @param options Factory options, including defaultProp value for shorthand prop mapping.
 * @returns ISlotFactory function used for rendering slots.
 */
export function createFactory<TProps>(
  ComponentType: React.ComponentType<TProps>,
  options: IFactoryOptions<TProps> = { defaultProp: 'children' }
): ISlotFactory<TProps> {
  const result: ISlotFactory<TProps> = (componentProps, userProps, defaultStyles) => {
    // If they passed in raw JSX, just return that.
    if (React.isValidElement(userProps)) {
      return userProps;
    }

    // If we're rendering a function, let the user resolve how to render given the original component and final args.
    if (typeof userProps === 'function') {
      const render: ISlotRenderer<TProps> = (slotRenderFunction, renderProps) => {
        // TODO: _translateShorthand is returning TProps, so why is the finalProps cast required?
        // TS isn't respecting the difference between props arg type and return type and instead treating both as ISlotPropValue.
        let finalRenderProps = _translateShorthand(options.defaultProp, renderProps) as TProps;
        finalRenderProps = _constructFinalProps(defaultStyles, componentProps, finalRenderProps);

        return slotRenderFunction(ComponentType, finalRenderProps);
      };
      return userProps(render);
    }

    userProps = _translateShorthand(options.defaultProp, userProps);
    // TODO: _translateShorthand is returning TProps, so why is the finalProps cast required?
    // TS isn't respecting the difference between props arg type and return type and instead treating both as ISlotPropValue.
    const finalProps = _constructFinalProps(defaultStyles, componentProps, userProps) as TProps;

    return <ComponentType {...finalProps} />;
  };

  return result;
}

/**
 * Default factory for components without explicit factories.
 */
const defaultFactory = memoizeFunction(type => createFactory(type));

/**
 * This function generates slots that can be used in JSX given a definition of slots and their corresponding types.
 * @param userProps Props as pass to component.
 * @param slots Slot definition object defining the default slot component for each slot.
 * @returns A set of created slots that components can render in JSX.
 */
export function getSlots<TProps extends TSlots, TSlots extends ISlotProps<TProps, TSlots>>(
  userProps: TProps,
  slots: ISlotDefinition<Required<TSlots>>
): ISlots<Required<TSlots>> {
  const result: ISlots<Required<TSlots>> = {} as ISlots<Required<TSlots>>;

  // userProps already has default props mixed in by createComponent. Recast here to gain typing for this function.
  const mixedProps = userProps as TProps & IDefaultSlotProps<TSlots>;

  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      // This closure method requires the use of withSlots to prevent unnecessary rerenders. This is because React detects
      //  each closure as a different component (since it is a new instance) from the previous one and then forces a rerender of the entire
      //  slot subtree. For now, the only way to avoid this is to use withSlots, which bypasses the call to React.createElement.
      const slot: ISlot<keyof TSlots> = (componentProps, ...args: any[]) => {
        if (args.length > 0) {
          // If React.createElement is being incorrectly used with slots, there will be additional arguments.
          // We can detect these additional arguments and error on their presence.
          throw new Error('Any module using getSlots must use withSlots. Please see withSlots javadoc for more info.');
        }
        return _renderSlot(
          slots[name],
          // TODO: this cast to any is hiding a relationship issue between the first two args
          componentProps as any,
          mixedProps[name],
          // _defaultStyles should always be present, but a check for existence is added to make view tests easier to use.
          mixedProps._defaultStyles && mixedProps._defaultStyles[name]
        );
      };
      slot.isSlot = true;
      result[name] = slot;
    }
  }

  return result;
}

/**
 * Helper function that constructs a props object when given shorthand props.
 */
function _translateShorthand<TProps>(defaultProp: string, props: ISlotPropValue<TProps>): TProps {
  if (typeof props === 'string' || typeof props === 'number' || typeof props === 'boolean') {
    props = {
      [defaultProp]: props as any
    } as TProps;
  }
  return props;
}

/**
 * Helper function that constructs final styles and props given a series of props ordered by increasing priority.
 */
function _constructFinalProps<TProps extends IProcessedSlotProps>(defaultStyles: IStyle, ...allProps: (TProps | undefined)[]): TProps {
  const finalProps: TProps = {} as any;
  const classNames: (string | undefined)[] = [];

  for (const props of allProps) {
    classNames.push(props && props.className);
    assign(finalProps, ...(props as any));
  }

  finalProps.className = mergeStyles(defaultStyles, classNames);

  return finalProps;
}

/**
 * Render a slot given component and user props. Uses component factory if available, otherwise falls back
 * to default factory.
 * @param ComponentType Factory component type.
 * @param componentProps The properties passed into slot from within the component.
 * @param userProps The user properties passed in from outside of the component.
 */
function _renderSlot<TComponent extends ISlottableReactType<TProps>, TProps, TSlots>(
  ComponentType: TComponent,
  componentProps: TProps,
  userProps: TProps,
  defaultStyles: IStyle
): JSX.Element {
  if (ComponentType.create !== undefined) {
    return ComponentType.create(componentProps, userProps, defaultStyles);
  } else {
    return defaultFactory(ComponentType)(componentProps, userProps, defaultStyles);
  }
}
