import * as React from 'react';
import { Text } from '../components/Text';

// TODO:
//  * data types pass on
//  * children
//  * perf comparison vs. readability
//  * tests for all of the above

// export function createSlot<TComponentProps, TStyleSet>(
//   component: React.StatelessComponent<TComponentProps>,
//   componentProps: TComponentProps,
//   userProps?: TComponentProps,
//   stylesSet?: TStyleSet
// ): React.StatelessComponent<TComponentProps> {
//   return component;
// }

// TODO: add TypeScript typeOf functions?
// TODO: add tests for each case in this function.
// TODO: tests should ensure props like data attributes and ID persist across all factory types
export const createFactory = (ComponentType, options = {}) => (componentProps = {}, userProps = {}) => {
  const debugLog = (message: string) => {
    if (ComponentType.logMessages) {
      console.log(message);
    }
  };

  if (userProps) {
    const propType = typeof userProps;
    let userPropsAsChildren = false;

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
        } else {
          // If defaultProp doesn't exist, assign userProps as children.
          // TODO: consider both children and props children.. what does React do when both exist? merge? if so, in what order?
          userPropsAsChildren = true;
        }
        break;

      case 'function':
        debugLog('createFactory: propType is function');
        return userProps(ComponentType, componentProps);

      default:
        if (React.isValidElement(userProps)) {
          debugLog('createFactory: propType is React element');
          return userProps;
        } else {
          debugLog('createFactory: propType is object');
        }
        break;
    }

    if (userPropsAsChildren) {
      return <ComponentType {...componentProps}>{userProps}</ComponentType>;
    } else {
      return <ComponentType {...componentProps} {...userProps} />;
    }
  } else {
    // console.log('createFactory: no userProps');
    return <ComponentType {...componentProps} />;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// OPTION: Functional approach
//    Pros: less React hierarchy
//    Cons: not nearly as readable, particularly for nested / children content (like React.createElement vs. JSX)

// const createSlot = (ComponentType, componentProps, userProps = {}, children = undefined) => {
//   ComponentType = userProps.as || ComponentType;
//   children = children || userProps.children;

//   return <ComponentType {...componentProps} {...userProps}>{children}</ComponentType>;
// };
//////////////////////////////////////////////////////////////////////////////////////////////////////

export const Slot = (props = {}) => {
  const { as, children, userProps = {}, ...componentProps } = props;
  const children = props.children || userProps.children;
  const SlotComponent = userProps.as || props.as;

  if (SlotComponent.create !== undefined) {
    return SlotComponent.create(componentProps, userProps);
  }

  return (
    <SlotComponent {...componentProps} {...userProps}>
      {children}
    </SlotComponent>
  );
};

Slot.isSlot = true;

// export const SlotTemplate = (props = {}) => {
//   const { as, children, userProps = {}, ...componentProps } = props;
//   const children = props.children || userProps.children;
//   const SlotComponent = userProps.as || props.as;

//   if (SlotComponent.create !== undefined) {
//     return SlotComponent.create(componentProps, userProps);
//   }

//   return (
//     <SlotComponent {...componentProps} {...userProps}>
//       {children}
//     </SlotComponent>
//   );
// };

// SlotTemplate.isSlot = true;

// TODO: make sure Slot and SlotTemplate do not appear in hierarchy
export const CreateElementWrapper = (type, props, ...children) => {
  if (type.isSlot) {
    return Slot(props);
  } else {
    // TODO: assess perf!
    return React.createElement(type, props, ...children);
  }
};

// export const CreateElementWrapper = () => {
//   if (arguments[0].isSlot) {
//     console.log('Slot type');
//     return Slot(arguments[1]);
//   } else {
//     console.log('Not Slot type');
//     return React.createElement(...arguments);
//   }
// };

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
