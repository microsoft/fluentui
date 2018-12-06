import * as React from 'react';
// TODO: pull this from utilities instead of adding a dependency to OUFR in Foudnation
import { memoizeFunction } from 'office-ui-fabric-react';

// TODO: Debug scenarios: is there a way to enable or highlight slots visually? borders? etc.
// TODO: needs to work with refs / componentRefs/ forwardRefs / etc. Anything else getting bypassed?
// TODO: make sure no unnecessary attributes are being pasesd to DOM ('as', 'slotAs', etc.)
// TODO: make sure everything still works without @jsx pragma

export type IFactoryComponent<TProps> = React.ReactType<TProps> & {
  create?: ISlotFactory<TProps>;
};

export interface IFactoryOptions<TProps> {
  defaultProp: keyof TProps | 'children';
}

// Default prop = 'children', default prop type = typeof React children (ReactNode)
export type IPropsWithChildren<TProps> = TProps & { children?: React.ReactNode };

export type INoDefaultProp = never;

/**
 * An interface definition for defining Slots. Each key in TSlot must point to an IFactoryComponent.
 */
export type ISlotDefinition<TSlots> = { [prop in keyof TSlots]: IFactoryComponent<TSlots[prop]> };

/**
 * Interface for created Slot used internally by components.
 */
export type ISlot<TProps> = ((props: IPropsWithChildren<TProps>) => JSX.Element) & { isSlot?: boolean };

/**
 * Interface for a slot factory that consumes both componnent and user slot prop and generates render output.
 */
export type ISlotFactory<TProps> = (componentProps: TProps, userProps: ISlotProp<TProps>) => JSX.Element;

/**
 * Interface for aggregated Slots objects used internally by components.
 */
export type ISlots<TSlots> = { [slot in keyof TSlots]: ISlot<TSlots[slot]> };

export interface IUserProps<TSlots> {
  classNames: { [prop in keyof TSlots]?: string };
}

/**
 * Helper interface components can use for defining Slot properties. This interface defines the following properties:
 *    1. Component props object (defined by TProps)
 *    2. ISlotRender function
 *    3. JSX Elements
 *    4. Optional shorthand prop, defined by TShorthandProp
 * The conditional type check looks up prop type in TProps if TShorthandProp is a key of TProps, otherwise it treats
 * TShorthandProp as React children.
 */
// TODO: If props object is passed but a required prop is missing, TS coerces to render function and gives a really obscure error.
//        Is there a way to give a more descriptive error (i.e. "required prop missing")?
export type ISlotProp<TProps, TShorthandProp extends keyof TProps | 'children' = INoDefaultProp> =
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
 * To use this function on a per-file basis, put the following in a comment block: @jsx SlotModule.createElementWrapper
 * As of writing, this line must be the FIRST LINE in the file to work correctly.
 *
 * Usage of this pragma also requires an import statement of SlotModule such as: import * as SlotModule from '<path>/Slots';
 */
// Can't use typeof on React.createElement since it's overloaded. Approximate createElement's signature for now and widen as needed.
export function createElementWrapper<P>(
  type: ISlot<P>,
  props?: React.Attributes & P | null,
  // tslint:disable-next-line:missing-optional-annotation
  ...children: React.ReactNode[]
): React.ReactElement<P> | JSX.Element | null {
  if (type.isSlot) {
    // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
    children = React.Children.toArray(children);
    return type({ ...(props as any), children });
  } else {
    // TODO: assess perf! is this spread really needed?
    return React.createElement(type, props, ...children);
  }
}

// TODO:
//  * data types pass on
//  * children
//  * perf comparison vs. readability
//  * tests for all of the above

// TODO: add tests for each case in this function.
// TODO: tests should ensure props like data attributes and ID persist across all factory types
// TODO: add typing tests too
// TODO: is it possible to divorce the ideas of component factories and slots?
//        since factories have to deal with slot props, it doesn't seem that way.
/**
 * This function creates factories that render ouput depending on the user ISlotProp props passed in.
 */
export function createFactory<TProps>(
  Component: React.ComponentType<TProps>,
  options: IFactoryOptions<TProps> = { defaultProp: 'children' }
): ISlotFactory<TProps> {
  const result: ISlotFactory<TProps> = (componentProps, userProps) => {
    if (userProps) {
      const propType = typeof userProps;

      switch (propType) {
        case 'string':
        case 'number':
        case 'boolean':
          userProps = {
            [options.defaultProp]: userProps as any
          } as TProps;
          break;

        case 'function':
          // Functional components are not identified as functions because they have been converted to React Elements before this point.
          return (userProps as ISlotRenderFunction<TProps>)(componentProps, Component);

        default:
          if (React.isValidElement(userProps)) {
            return userProps;
          }
          break;
      }

      return <Component {...componentProps} {...userProps} />;
    } else {
      return <Component {...componentProps} />;
    }
  };

  return result;
}

// Fallback behavior for primitives.
const getDefaultFactory = memoizeFunction(type => createFactory(type));

function defaultFactory<TComponent, TProps>(type: TComponent, componentProps: TProps, userProps: TProps) {
  return getDefaultFactory(type)(componentProps, userProps);
}

function renderSlot<TComponent extends IFactoryComponent<TProps>, TProps>(
  ComponentType: TComponent,
  componentProps: TProps,
  userProps: TProps
): JSX.Element {
  if (ComponentType.create !== undefined) {
    return ComponentType.create(componentProps, userProps);
  } else {
    return defaultFactory(ComponentType, componentProps, userProps);
  }
}

/**
 * This function generates slots that can be used in JSX given a definition of Slots and their corresponding types.
 */
// TODO: good to require all slots? are there scenarios where slots would be optional? how would they be defined and used?
//        constrain for now but loosen later if needed.
// TODO: if TSlots is not enforcing values of ISlotProp, then remove the generic type constraint below
export function getSlots<TProps extends TSlots & IUserProps<TSlots>, TSlots extends { [key in keyof TSlots]: ISlotProp<TProps[key]> }>(
  userProps: TProps,
  slots: ISlotDefinition<Required<TSlots>>
): ISlots<Required<TSlots>> {
  const result: ISlots<Required<TSlots>> = {} as ISlots<Required<TSlots>>;

  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      if (userProps && userProps[name] && userProps[name].children) {
        // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
        userProps[name].children = React.Children.toArray(userProps[name].children);
      }

      const slot: ISlot<keyof TSlots> = slotProps => {
        return renderSlot(slots[name], { ...(slotProps as any), className: userProps.classNames[name] }, userProps[name]);
      };
      slot.isSlot = true;
      result[name] = slot;
    }
  }

  return result;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// TODO: Slots Phase 2 (future PR)
// TODO: Incorporate style variables approach and lift mergeStyles out of createComponent.
// TODO: Need something like this to merge styles and style variables for slots,
//        particularly if createComponent is modified not to generate classNames for slots
//
// const _resolveTokens = (props, ...allTokens) => Object.assign({}, ...allTokens.map(tokens =>
//    (typeof tokens === 'function') ? tokens(props) : tokens));
// const _resolveStyles = (props, tokens, ...allStyles) => concatStyleSets(...allStyles.map(styles =>
//    (typeof styles === 'function') ? styles(props, tokens) : styles));
//
// const createComponent = (options) => {
//   const component = componentProps => {
//     let { tokens, styles, ...props } = componentProps;
//
//     tokens = _resolveTokens(props, options.tokens, tokens);
//     styles = _resolveStyles(props, tokens, options.styles, styles);
//
//     const classNames = mergeStyleSets(styles);
//
//     return options.view({ ...props, classNames });
//   };
//   component.displayName = options.displayName;
//
//   return component;
// };
//////////////////////////////////////////////////////////////////////////////////////////////
