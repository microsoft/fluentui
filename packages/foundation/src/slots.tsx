import * as React from 'react';
// TODO: pull this from utilities instead of adding a dependency to OUFR in Foundation
import { IStyleSet, ITheme, mergeStyles } from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';
import { IStylesFunctionOrObject } from './createComponent';

// TODO: move types out. into ISlots.ts?

/**
 * Signature of components that have component factories.
 */
export type IFactoryComponent<TProps> = React.ReactType<TProps> & {
  create?: ISlotFactory<TProps>;
};

/**
 * Factory options for creating component.
 */
export interface IFactoryOptions<TProps> {
  /** Default prop for which to map primitive values. */
  defaultProp: keyof TProps | 'children';
}

/**
 * Helper interface for accessing user props children.
 */
export type IPropsWithChildren<TProps> = TProps & { children?: React.ReactNode };

/**
 * An interface for defining Slots. Each key in TSlot must point to an IFactoryComponent.
 */
export type ISlotDefinition<TSlots> = { [prop in keyof TSlots]: IFactoryComponent<TSlots[prop]> };

/**
 * Created Slot structure used for rendering by components.
 */
export type ISlot<TProps> = ((componentProps: IPropsWithChildren<TProps>) => JSX.Element) & { isSlot?: boolean };

/**
 * Interface for a slot factory that consumes both componnent and user slot prop and generates rendered output.
 */
export type ISlotFactory<TProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  (componentProps: TProps, userProps: ISlotProp<TProps> | undefined, defaultStyles: IStylesFunctionOrObject<TProps, TTokens, TStyleSet>) =>
    JSX.Element;

/**
 * Interface for aggregated Slots objects used internally by components.
 */
export type ISlots<TSlots> = { [slot in keyof TSlots]: ISlot<TSlots[slot]> };

/**
 * User properties that are automatically applied by Slot utilities using slot name.
 */
// TODO: remove?
// export interface IUserProps<TSlots> {
//   classNames: { [prop in keyof TSlots]?: string };
// }
// TODO: also use this type in createComponent somehow to bind types. also, is this the best way to do this?
export type ISlotStyles<TViewProps, TSlots, TTokens, TStyleSet extends IStyleSet<TStyleSet>> =
  { [slot in keyof TSlots]: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet> };

export interface ISlotProps<TViewProps, TSlots, TTokens, TStyleSet extends IStyleSet<TStyleSet>> {
  // _defaultStyles: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>;
  _defaultStyles: ISlotStyles<TViewProps, TSlots, TTokens, TStyleSet>;
}

/**
 * Helper interface components can use for defining Slot properties. This interface defines the following slot properties:
 *    1. Component props object (defined by TProps.)
 *    2. ISlotRender function.
 *    3. JSX Elements.
 *    4. Optional shorthand prop, defined by TShorthandProp.
 * The conditional type check looks up prop type in TProps if TShorthandProp is a key of TProps, otherwise it treats
 * TShorthandProp as React children. If TShorthandProp is excluded, there is no default prop and no children are allowed.
 */
export type ISlotProp<TProps, TShorthandProp extends keyof TProps | 'children' = never> =
  | TProps
  | JSX.Element
  | ISlotRenderFunction<TProps>
  | (TShorthandProp extends keyof TProps ? TProps[TShorthandProp] : React.ReactNode);

/**
 * Render function interface used by Slot props.
 */
export type ISlotRenderFunction<TProps> = (props: TProps, componentType: React.ReactType<TProps>) => JSX.Element;

/**
 * This function removes Slots from the React hierarchy by wrapping React.createElement and bypassing it for Slot components.
 *
 * To use this function on a per-file basis, put the following in a comment block: @jsx createElementWrapper
 * As of writing, this line must be the FIRST LINE in the file to work correctly.
 *
 * Usage of this pragma also requires an import statement of SlotModule such as: import { createElementWrapper } from '<path>/slots';
 *
 * @see React.createElement
 */
// Can't use typeof on React.createElement since it's overloaded. Approximate createElement's signature for now and widen as needed.
export function createElementWrapper<P>(
  type: ISlot<P> | React.SFC<P> | string,
  props?: React.Attributes & P | null,
  // tslint:disable-next-line:missing-optional-annotation
  ...children: React.ReactNode[]
): React.ReactElement<P> | JSX.Element | null {
  const slotType = type as ISlot<P>;
  if (slotType.isSlot) {
    // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
    children = React.Children.toArray(children);
    return slotType({ ...(props as any), children });
  } else {
    return React.createElement(type, props, children);
  }
}

/**
 * This function creates factories that render ouput depending on the user ISlotProp props passed in.
 * @param ComponentType Base component to render when not overridden by user props.
 * @param options Factory options, including defaultProp value for shorthand prop mapping.
 * @returns ISlotFactory function used for rendering slots.
 */
export function createFactory<TProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  ComponentType: React.ComponentType<TProps>,
  options: IFactoryOptions<TProps> = { defaultProp: 'children' }
): ISlotFactory<TProps, TTokens, TStyleSet> {
  const result: ISlotFactory<TProps, TTokens, TStyleSet> = (componentProps, userProps, defaultTheme, defaultStyles) => {
    const propType = typeof userProps;

    // TODO: resolve theme mess
    // const theme = (userProps && userProps.theme) || defaultTheme;
    const theme = defaultTheme;

    // if (userProps && userProps.theme) console.log('userProps.theme: ' + userProps.theme);

    // If they passed in raw JSX, just return that.
    if (React.isValidElement(userProps)) {
      return userProps;
    }

    switch (propType) {
      case 'string':
      case 'number':
      case 'boolean':
        userProps = {
          [options.defaultProp]: userProps as any
        } as TProps;
        break;
    }

    // Construct the final props for the component by merging component props, user props, and the
    // generated class name.
    // TODO: final approach has to ensure this is done before calling user render functions
    // const finalProps = componentProps;
    const finalProps = {
      ...(componentProps as any),
      ...((typeof userProps === 'object') && userProps as any)
    };

    finalProps.className = mergeStyles(
      defaultStyles,
      componentProps.className,
      // TODO: Callout: What was reasoning for this call in prototype?
      //        Seems to lead to multiple executions of userProp styles functions in examples.
      //        In both styled and createComponent (at least old version) components, this function will get called again.
      //          styled: called via classNamesFunction
      //          old createComponent: called via _evaulateStyles
      //          new createComponent: called via _resolveStyles
      //        Even for Slots, slot component props are accounted for at the top level of the child component's
      //          styled/createComponent call in the same locations listed above.
      // TODO: If theme isn't needed here, this will collapse a BUNCH Of typing in this module.
      // _evaluateStyle(finalProps, theme, userProps && userProps.styles),
      userProps && userProps.className
    )


    // If we're rendering a function, let the user resolve how to render given the original component
    // and final args.
    if (typeof userProps === 'function') {
      return (userProps as ISlotRenderFunction<TProps>)(finalProps, ComponentType);
    }

    return <ComponentType {...finalProps} />;
  };

  return result;
}

// TODO: this is very similar to existing evaluateStyleFunction above
// const _resolveWith = (props, styles) => (typeof styles === 'function') ? styles(props) : styles;
// const _resolveWith = (props, styles) => {
//   console.log('_resolveWith: props = ' + props);
//   return (typeof styles === 'function') ? styles(props) : styles;
// }

function _evaluateStyle<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  props: TViewProps,
  theme: ITheme,
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>
): Partial<TStyleSet> | undefined {
  if (typeof styles === 'function') {
    // TODO: This is making a lot of assumptions about the style signature of the underlying component.
    //        If it's a Foundation styles function, then it takes themes as an arg.
    //        However, if it's an existing styled component, they will choke since themes is not in props.
    return styles(props, theme);
  }

  return styles;
}


/**
 * Default factory for components without explicit factories.
 */
const getDefaultFactory = memoizeFunction(type => createFactory(type));

/**
 * Default factory helper.
 */
// function defaultFactory<TComponent, TProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>
//   (type: TComponent, componentProps: TProps, userProps: TProps, defaultStyles) {
//   return getDefaultFactory(type)(componentProps, userProps, defaultStyles);
// }

/**
 * Render a slot given component and user props. Uses component factory if available, otherwise falls back
 * to default factory.
 * @param ComponentType Factory component type.
 * @param componentProps The properties passed into slot from within the component.
 * @param userProps The user properties passed in from outside of the component.
 */
function renderSlot<TComponent extends IFactoryComponent<TProps>, TProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  ComponentType: TComponent,
  componentProps: TProps,
  userProps: TProps,
  defaultTheme: ITheme,
  defaultStyles: IStylesFunctionOrObject<TProps, TTokens, TStyleSet>
): JSX.Element {
  if (ComponentType.create !== undefined) {
    return ComponentType.create(componentProps, userProps, defaultTheme, defaultStyles);
  } else {
    return getDefaultFactory(ComponentType)(componentProps, userProps, defaultTheme, defaultStyles);
    // return defaultFactory(ComponentType, componentProps, userProps, defaultStyles);
  }
}

/**
 * This function generates slots that can be used in JSX given a definition of Slots and their corresponding types.
 * @param userProps Props as pass to component.
 * @param slots Slot definition object defining the default slot component for each slot.
 * @returns An set of created slots that components can render in JSX.
 */
export function getSlots
  <TProps extends TSlots, TSlots extends ISlots<TProps>, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
    userProps: TProps & ISlotProps<TProps, TSlots, TTokens, TStyleSet>,
    slots: ISlotDefinition<Required<TSlots>>
  ): ISlots<Required<TSlots>> {
  const result: ISlots<Required<TSlots>> = {} as ISlots<Required<TSlots>>;

  // TODO: need to check if userProps is defined? what is passed here when no props are passed to Button?
  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      if (userProps && userProps[name] && userProps[name].children) {
        // Since createElementWrapper bypasses createElement, use React.Children.toArray to make sure children are properly assigned keys.
        userProps[name].children = React.Children.toArray(userProps[name].children);
      }

      const slot: ISlot<keyof TSlots> = componentProps => {
        return renderSlot(
          slots[name],
          // TODO: this cast to any is hiding a relationship issue between the first two args
          componentProps as any,
          userProps[name],
          // TODO: what if theme is passed as prop to slot? add examples/tests
          // userProps.theme || userProps._defaultTheme?
          userProps._defaultTheme,
          // TODO: is this check needed (put in temporarily until createComponent is updated)? what about for backwards compatibility?
          userProps._defaultStyles && userProps._defaultStyles[name],
          // TODO: David had this, make sure it's not needed:
          // componentProps.children
        );
      };
      slot.isSlot = true;
      result[name] = slot;
    }
  }

  return result;
}
