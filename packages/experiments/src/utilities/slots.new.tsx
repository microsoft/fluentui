// import * as React from 'react';
// TODO: pull this from utilities instead of adding a dependency to OUFR in Foundation
// import { memoizeFunction } from 'office-ui-fabric-react';
// import { mergeStyles } from '@uifabric/styling';

export { createFactory as createFactoryNew } from './slots';
// import { createFactory as createFactoryNew } from './slots';
export { getSlots as getSlotsNew } from './slots';

// export const createFactoryNew = (ComponentType, options = { defaultProp: 'children' }) => (componentProps = {}, userProps = {}, defaultStyles = {}) => {
//   // TODO: none of these are used anywhere?
//   // const { className: compClassName, styles: compStyles, ...compProps } = componentProps;

//   switch (typeof userProps) {
//     case 'string':
//     case 'number':
//     case 'boolean':
//       if (options.defaultProp) {
//         userProps = {
//           [options.defaultProp]: userProps
//         };
//         break;
//       }
//   }

//   // If they passed in raw JSX, just return that.
//   if (React.isValidElement(userProps)) {
//     // console.log('typeof React element: ' + typeof userProps);
//     return userProps;
//   }

//   // Construct the final props for the component by merging component props, user props, and the
//   // generated class name.
//   // TODO: final approach has to ensure this is done before calling user render functions
//   const finalProps = {
//     ...componentProps,
//     ...((typeof userProps === 'object') && userProps),
//     className: mergeStyles(
//       defaultStyles,
//       componentProps.className,
//       _resolveWith(finalProps, userProps.styles),
//       userProps.className
//     )
//   };

//   // If we're rendering a function, let the user resolve how to render given the original component
//   // and final args.
//   if (typeof userProps === 'function') {
//     return userProps(finalProps, ComponentType);
//   }

//   // This really the default here, maybe this should be done sooner.
//   return <ComponentType {...finalProps} />;
// };

/**
 * Default factory for components without explicit factories.
 */
// const getDefaultFactoryNew = memoizeFunction(type => createFactoryNew(type));

/**
 * Default factory helper.
 */
// const defaultFactoryNew = (type, componentProps, userProps, defaultStyles) =>
//   getDefaultFactoryNew(type)(componentProps, userProps, defaultStyles);

// const renderSlotNew = (ComponentType, componentProps, userProps = {}, defaultStyles = {}, children = undefined) => {
//   if (ComponentType.create !== undefined) {
//     return ComponentType.create(componentProps, userProps, defaultStyles);
//   } else return defaultFactoryNew(ComponentType, componentProps, userProps, defaultStyles);
// };

// export const getSlotsNew = (userProps = {}, slots) => {
//   const result = {};
//   const { styles = {} } = userProps;

//   for (const name in slots) {
//     if (slots.hasOwnProperty(name)) {
//       result[name] = componentProps => renderSlotNew(
//         slots[name],
//         componentProps,
//         userProps[name],
//         userProps._defaultStyles[name],
//         componentProps.children
//       );
//       result[name].type = slots[name];
//       result[name].isSlot = true;
//     }
//   }

//   return result;
// };

// const _resolveWith = (props, styles) => (typeof styles === 'function') ? styles(props) : styles;

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
