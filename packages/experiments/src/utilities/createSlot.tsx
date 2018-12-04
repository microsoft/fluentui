import * as React from 'react';
import { memoizeFunction } from 'office-ui-fabric-react';

// TODO: Debug scenarios: is there a way to enable or highlight slots visually? borders? etc.
// TODO: make sure Slot and SlotTemplate do not appear in hierarchy
// TODO: needs to work with refs / componentRefs/ forwardRefs / etc.
// TODO: what other stuff are we bypassing / breaking by not using createElement? unique key generation for children?
// TODO: make sure no unnecessary attributes are being pasesd to DOM ('as', 'slotAs', etc.)

export type IFactoryComponent<TProps> = React.ReactType<TProps> & {
  create?: ISlotFactory<TProps>;
};

export interface IFactoryOptions<TProps> {
  defaultProp: keyof TProps | 'children';
}

// Default prop = 'children', default prop type = typeof React children (ReactNode)
export type ISlotChildrenType = React.ReactNode;

export type ISlotDefinition<TSlots> = { [prop in keyof TSlots]: IFactoryComponent<TSlots[prop]> };

export type ISlot<TProps> = ((props: TProps) => JSX.Element) & { isSlot?: boolean };

export type ISlotFactory<TProps> = (componentProps: TProps, userProps: ISlotProp<TProps>) => JSX.Element;

export type ISlots<TSlots> = { [slot in keyof TSlots]: ISlot<TSlots[slot]> };

export interface IUserProps<TSlots> {
  classNames: { [prop in keyof TSlots]?: string };
}

// TODO: If props object is passed but a required prop is missing, TS coerces to render function and gives a really obscure error.
//        Is there a way to give a more descriptive error (i.e. "required prop missing")?
export type ISlotProp<TProps, TDefaultPropType = never> = ISlotRenderFunction<TProps> | JSX.Element | TDefaultPropType | TProps;

export type ISlotRenderFunction<TProps> = (props: TProps, componentType: React.ReactType<TProps>) => JSX.Element;

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
// TODO: need something like this to merge styles and style variables for slots,
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

// TODO: test with split button approach

// { split && (
// <Slot as='span' userProps={splitContainer}>
//   <Slot as={Divider} userProps={divider} />
//   <Slot as={Icon} userProps={menuChevron} />
// </Slot>
// )}

// export class ButtonTest extends React.Component {
//   public render() {
//     const { root, icon, text, splitContainer, divider, menuChevron, split } = this.props;

//     // return (
//     //   createSlot('button', { 'data-type': 'button', id: 'asdf' }, root, [
//     //     createSlot(Icon, { size: 123, key: 0 }, icon),
//     //     createSlot('span', { key: 1 }, text)
//     //   ])
//     // );

//     // TODO: possible to do this without React hierarchy?
//     return (
//       <Slot as='button' userProps={root} data-type='button' id='asdf'>
//         <Slot as={Icon} iconName='upload' userProps={icon} data-type='icon' />
//         <Slot as='span' userProps={text} data-type='span' />
//       </Slot>
//     );
//   }
// }
