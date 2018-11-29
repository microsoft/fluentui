import * as React from 'react';
import { memoizeFunction } from 'office-ui-fabric-react';

// TODO: Debug scenarios: is there a way to enable or highlight slots visually? borders? etc.
// TODO: make sure Slot and SlotTemplate do not appear in hierarchy
// TODO: needs to work with refs / componentRefs/ forwardRefs / etc.
// TODO: what other stuff are we bypassing / breaking by not using createElement? unique key generation for children?
// TODO: make sure no unnecessary attributes are being pasesd to DOM ('as', 'slotAs', etc.)
export const CreateElementWrapper = (type, props, ...children) => {
  if (type.isSlot) {
    // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
    children = React.Children.toArray(children);
    return type({ ...props, children });
  } else {
    // TODO: assess perf! is this spread really needed?
    return React.createElement(type, props, ...children);
  }
};

// TODO:
//  * data types pass on
//  * children
//  * perf comparison vs. readability
//  * tests for all of the above

// TODO: add TypeScript typeOf functions?
// TODO: add tests for each case in this function.
// TODO: tests should ensure props like data attributes and ID persist across all factory types
// TODO: add typing tests too
export const createFactory = (ComponentType, options = { defaultProp: 'children' }) => (componentProps = {}, userProps = {}) => {
  if (userProps) {
    const propType = typeof userProps;

    switch (propType) {
      case 'string':
      case 'number':
      case 'boolean':
        // TODO: so defaultProp is like defaultShorthand prop... we should probably support more than one?
        if (options.defaultProp) {
          userProps = {
            [options.defaultProp]: userProps
          };
        }
        break;

      case 'function':
        return userProps(componentProps, ComponentType);

      default:
        if (React.isValidElement(userProps)) {
          return userProps;
        }
        break;
    }

    return <ComponentType {...componentProps} {...userProps} />;
  } else {
    return <ComponentType {...componentProps} />;
  }
};

// Fallback behavior for primitives.
const getDefaultFactory = memoizeFunction(type => createFactory(type));
const defaultFactory = (type, componentProps, userProps) => getDefaultFactory(type)(componentProps, userProps);

const slot = (ComponentType, componentProps, userProps) => {
  if (ComponentType.create !== undefined) {
    return ComponentType.create(componentProps, userProps);
  } else {
    return defaultFactory(ComponentType, componentProps, userProps);
  }
};

export const getSlots = (userProps, slots) => {
  const result = {};

  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      if (userProps && userProps[name] && userProps[name].children) {
        // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
        userProps[name].children = React.Children.toArray(userProps[name].children);
      }

      result[name] = componentProps => {
        return slot(slots[name], { ...componentProps, className: userProps.classNames[name] }, userProps[name]);
      };
      result[name].isSlot = true; // = name + ' slot';
    }
  }

  return result;
};

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
