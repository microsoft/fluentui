import * as React from 'react';
// TODO: pull this from utilities instead of adding a dependency to OUFR in Foundation
import { memoizeFunction } from 'office-ui-fabric-react';

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
export type ISlot<TProps> = ((props: IPropsWithChildren<TProps>) => JSX.Element) & { isSlot?: boolean };

/**
 * Interface for a slot factory that consumes both componnent and user slot prop and generates rendered output.
 */
export type ISlotFactory<TProps> = (componentProps: TProps, userProps?: ISlotProp<TProps>) => JSX.Element;

/**
 * Interface for aggregated Slots objects used internally by components.
 */
export type ISlots<TSlots> = { [slot in keyof TSlots]: ISlot<TSlots[slot]> };

/**
 * User properties that are automatically applied by Slot utilities using slot name.
 */
export interface IUserProps<TSlots> {
  classNames: { [prop in keyof TSlots]?: string };
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
 * @param Component Base component to render when not overridden by user props.
 * @param options Factory options, including defaultProp value for shorthand prop mapping.
 * @returns ISlotFactory function used for rendering slots.
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

/**
 * Default factory for components without explicit factories.
 */
const getDefaultFactory = memoizeFunction(type => createFactory(type));

/**
 * Default factory helper.
 */
function defaultFactory<TComponent, TProps>(type: TComponent, componentProps: TProps, userProps: TProps) {
  return getDefaultFactory(type)(componentProps, userProps);
}

/**
 * Render a slot given component and user props. Uses component factory if available, otherwise falls back
 * to default factory.
 * @param ComponentType Factory component type.
 * @param componentProps The properties passed into slot from within the component.
 * @param userProps The user properties passed in from outside of the component.
 */
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
 * @param userProps Props as pass to component.
 * @param slots Slot definition object defining the default slot component for each slot.
 * @returns An set of created slots that components can render in JSX.
 */
export function getSlots<TProps extends TSlots & IUserProps<TSlots>, TSlots extends { [key in keyof TSlots]: ISlotProp<TProps[key]> }>(
  userProps: TProps,
  slots: ISlotDefinition<Required<TSlots>>
): ISlots<Required<TSlots>> {
  const result: ISlots<Required<TSlots>> = {} as ISlots<Required<TSlots>>;

  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      if (userProps && userProps[name] && userProps[name].children) {
        // Since createElementWrapper bypasses createElement, use React.Children.toArray to make sure children are properly assigned keys.
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
// TODO: Debug scenarios: is there a way to enable or highlight slots visually? borders? etc.
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
