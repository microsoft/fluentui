import * as React from 'react';
import { memoizeFunction } from 'office-ui-fabric-react';

// TODO: make sure Slot and SlotTemplate do not appear in hierarchy
// TODO: needs to work with refs / componentRefs/ forwardRefs / etc.
// TODO: what other stuff are we bypassing / breaking by not using createElement? unique key generation for children?
export const CreateElementWrapper = (type, props, ...children) => {
  if (type.isSlot) {
    // TODO: does this need to make use of children argument? (props vs. nested JSX)
    // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
    return type(props, React.Children.toArray(children));
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
// TODO: get rid of all of this children crap. if separate children are needed from jsxFactory, consolidate it immediately
export const createFactory = (ComponentType, options = { defaultProp: 'children' }) => (
  componentProps = {},
  userProps = {},
  componentChildren = undefined
) => {
  const debugLog = (message: string) => {
    if (ComponentType.logMessages) {
      console.log(message);
    }
  };

  if (userProps) {
    const propType = typeof userProps;

    switch (propType) {
      case 'string':
      case 'number':
      case 'boolean':
        debugLog('createFactory: propType is string/number/boolean');
        // TODO: so defaultProp is like defaultShorthand prop... we should probably support more than one?
        if (options.defaultProp) {
          userProps = {
            [options.defaultProp]: userProps
          };
        }
        break;

      case 'function':
        // TODO: how to pass children to functions? add example / tests
        debugLog('createFactory: propType is function');
        return userProps(ComponentType, componentProps);

      default:
        if (React.isValidElement(userProps)) {
          // TODO: how to pass children to react elements? add example / tests
          debugLog('createFactory: propType is React element');
          return userProps;
        } else {
          debugLog('createFactory: propType is object');
        }
        break;
    }

    // console.log('children count: ' + React.Children.count(componentChildren));

    if (componentChildren && React.Children.count(componentChildren) > 0) {
      return (
        <ComponentType {...componentProps} {...userProps}>
          {componentChildren}
        </ComponentType>
      );
    } else {
      return <ComponentType {...componentProps} {...userProps} />;
    }
  } else {
    // console.log('createFactory: no userProps');
    return <ComponentType {...componentProps} />;
  }
};

// Fallback behavior for primitives.
const getDefaultFactory = memoizeFunction(type => createFactory(type, { defaultProp: 'children' }));
const defaultFactory = (type, componentProps, userProps, componentChildren) =>
  getDefaultFactory(type)(componentProps, userProps, componentChildren);

// React Children Rules:
//  * JSX children override attribute children
//  * Attribute children can be primitive or array
// TODO: make sure code follows same rules for consistency
// TODO: add tests enforcing rules

// Slot Children Rules:
//  * JSX children override attribute children (same as React)
//  * Attribute children can be primitive or array (same as React)
//  * User JSX children override both component attributes and JSX children?
//  * User attribute children override both component attributes and JSX children?

// <h2 children={12} />
// <h2 children='propChild Only' />
// <h2 children={['propChild', ' Array']} />
// <h2 children='propChild'>JSX Child</h2>
// <h2 children={['propChild', ' Array']}>JSX Child</h2>

const slot = (ComponentType, componentProps, userProps, componentChildren) => {
  ComponentType = (userProps && userProps.as) || ComponentType;

  if (typeof userProps === 'function') {
    return userProps(ComponentType, { ...componentProps });
  } else if (ComponentType.create !== undefined) {
    return ComponentType.create(componentProps, userProps, componentChildren);
  } else {
    return defaultFactory(ComponentType, componentProps, userProps, componentChildren);
  }
};

export const getSlots = (userProps, slots) => {
  const result = {};

  for (const name in slots) {
    if (slots.hasOwnProperty(name)) {
      // Since we are bypassing createElement, use React.Children.toArray to make sure children are properly assigned keys.
      const userPropsChildren = userProps[name] && userProps[name].children ? React.Children.toArray(userProps[name].children) : undefined;

      result[name] = (componentProps, componentChildren) =>
        slot(
          slots[name],
          { ...componentProps, className: userProps.classNames[name] },
          userProps[name],
          userPropsChildren || componentChildren
        );
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
