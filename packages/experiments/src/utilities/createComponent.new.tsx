// import * as React from 'react';
// import { IComponent, IStyleableComponentProps, IStyledProps, IViewComponentProps } from '@uifabric/foundation';
// import {
//   Customizations,
//   CustomizerContext,
//   ICustomizerContext,
//   IProcessedStyleSet,
//   IStyleFunctionOrObject,
//   IStyleSet,
//   ITheme,
//   mergeStyleSets
// } from 'office-ui-fabric-react';
// import { __assign as assign } from 'tslib';

export { createComponent as createComponentNew } from '@uifabric/foundation';

// TODO: Move to Foundation.
// TODO: Document flow of tokens vs. styles vs. style variables and relationship.
// TODO: createComponent forwards and backwards compatibility.
//        How will new createComponent work with existing subcomponents created using styled / old createcomponent?
//        Way to preserve existing components? Worth preserving?
//        If styleVars option is provided, call new createComponent?
// import { concatStyleSets } from '../Styling';

// export function createComponentNew<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
//   component: IComponent<TComponentProps, TViewProps, TStyleSet, TStatics>
// ): React.StatelessComponent<TComponentProps> & TStatics {
//   const result: React.StatelessComponent<TComponentProps> = (componentProps: TComponentProps) => {
//     return (
//       // TODO: createComponent is also probably affected by https://github.com/OfficeDev/office-ui-fabric-react/issues/6603
//       <CustomizerContext.Consumer>
//         {(context: ICustomizerContext) => {
//           const settings: IStyleableComponentProps<TViewProps, TStyleSet> = _getCustomizations(
//             component.displayName,
//             context,
//             component.fields
//           );

//           const renderView = (viewProps?: TViewProps) => {
//             // The approach here is to allow state components to provide only the props they care about, automatically
//             //    merging user props and state props together. This ensures all props are passed properly to view,
//             //    including children and styles.
//             // What we really need to be able to do here either type force TViewProps to be TComponentProps when StateComponent
//             //    is undefined OR logically something like code below. Until we figure out how to do this, cast mergedProps as
//             //    IStyleableComponentProps since componentProps does not necessarily extend TViewProps. Until then we're sacrificing
//             //    a bit of type safety to prevent the need of duplicating this function.
//             // if (StateComponent) {
//             //   type TViewProps = TViewProps;
//             // } else {
//             //   type TViewProps = TComponentProps;
//             // }
//             // TODO: for full 'fields' support, 'rest' props from customizations need to pass onto view.
//             //        however, customized props like theme will break snapshots. how is styled not showing theme output in snapshots?
//             const mergedProps: IStyleableComponentProps<TViewProps, TStyleSet> = viewProps
//               ? {
//                 ...(componentProps as any),
//                 ...(viewProps as any)
//               }
//               : componentProps;

//             // TODO: how to resolve settings styles with component and view props styles?
//             // const { styles: settingsStyles, ...settingsRest } = settings;

//             // TODO: this next line is basically saying 'theme' prop will ALWAYS be available from getCustomizations.
//             //        is there mechanism that guarantees theme and other request fields will be defined?
//             //        is there a static init that guarantees theme will be provided?
//             //        what happens if createTheme/loadTheme is not called?
//             //        if so, convey through getCustomizations typing keying off fields. can we convey this
//             //          all the way from Customizations with something like { { K in fields }: object}? hmm
//             //        if not, how does existing "theme!" styles code work without risk of failing (assuming it doesn't fail)?
//             // For now cast return value as if theme is always available.

//             // TODO: is styled props still needed? how will themes pass to styles?
//             // const styledProps: TViewProps & IStyledProps<ITheme> = { ...settingsRest, ...(mergedProps as any) };
//             const theme = settings.theme || mergedProps.theme;

//             // TODO: keep themes as part of mergedProps or make separate variable? (might clean up awkward typings to make it separate)
//             // TODO: then again, createComponent shouldn't know about settings that are being passed on... it should NOT be a separate arg
//             // TODO: david mentioned avoiding mixins for perf, but with theme (and other fields) coming from either settings or props,
//             //        I don't think we have a choice.. they need to be mixed in
//             // TODO: conclusion: createComponent has to know about key settings (styles, tokens) already, so if tokens is the only other
//             //        one, just keep it separate. All other customized settings (Layer fields, etc.) need to be forwarded in merged Props.
//             const tokens = _resolveTokens(mergedProps, theme, component.tokens, settings.tokens, mergedProps.tokens);
//             const styles = _resolveStyles(mergedProps, theme, tokens, component.styles, settings.styles, mergedProps.styles);

//             return component.view({
//               ...mergedProps,
//               _defaultStyles: styles
//             });
//           };
//           return component.state ? <component.state {...componentProps} renderView={renderView} /> : renderView();
//         }
//         }
//       </CustomizerContext.Consumer>
//     );
//   };

//   result.displayName = component.displayName;

//   assign(result, component.statics);

//   // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
//   return result as React.StatelessComponent<TComponentProps> & TStatics;
// }

// /**
//  * Resolve all styles functions with both props and tokens and flatten results along with all styles objects.
//  */
// const _resolveStyles = (props, theme, tokens, ...allStyles) =>
//   concatStyleSets(...allStyles.map(styles => (typeof styles === 'function') ? styles(props, theme, tokens) : styles));

// /**
//  * Resolve all token functions with props and flatten results along with all token objects.
//  */
// const _resolveTokens = (props, theme, ...allTokens) => {
//   const tokens = {};

//   for (let currentTokens of allTokens) {
//     currentTokens = typeof currentTokens === 'function'
//       ? currentTokens(props, theme)
//       : currentTokens;

//     if (Array.isArray(currentTokens)) {
//       currentTokens = _resolveTokens(props, theme, ...currentTokens);
//     }

//     Object.assign(tokens, ...currentTokens);
//   }

//   return tokens;
// };

/**
 * Evaluate styles based on type to return consistent TStyleSet.
 */
// function _evaluateStyle<TViewProps, TStyledProps extends IStyledProps<ITheme>, TStyleSet extends IStyleSet<TStyleSet>>(
//   props: TViewProps & TStyledProps,
//   styles?: IStyleFunctionOrObject<TViewProps, TStyleSet>
// ): Partial<TStyleSet> | undefined {
//   if (typeof styles === 'function') {
//     return styles(props);
//   }

//   return styles;
// }

/**
 * Helper function for calling Customizations.getSettings falling back to default fields.
 *
 * @param displayName Displayable name for component.
 * @param context React context passed to component containing contextual settings.
 * @param fields Optional list of properties of to grab from global store and context.
 */
// function _getCustomizations<TViewProps, TStyleSet extends IStyleSet<TStyleSet>>(
//   displayName: string,
//   context: ICustomizerContext,
//   fields?: string[]
// ): IStyleableComponentProps<TViewProps, TStyleSet> {
//   // TODO: do we want field props? should fields be part of IComponent and used here?
//   // TODO: should we centrally define DefaultFields? (not exported from styling)
//   // TODO: remove styleVariables
//   const DefaultFields = ['theme', 'styles', 'styleVariables', 'tokens'];
//   return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
// }
