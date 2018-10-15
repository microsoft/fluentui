import {
  createComponent as foundationCreateComponent,
  createStatelessComponent as foundationCreateStatelessComponent,
  IComponent,
  IStateComponentType,
  IStatelessComponent,
  IStyleableComponentProps,
  IStylesFunction,
  IStylesProp,
  IStylingProviders,
  IViewComponent
} from '@uifabric/foundation';
export { IStateComponentProps } from '@uifabric/foundation';
import { getSchemedContext, IProcessedStyleSet, ISchemeNames, IStyleSet, ITheme, mergeStyleSets } from './Styling';
import { Customizations, CustomizerContext, ICustomizerContext } from './Utilities';

// This module centralizes Foundation interaction for use throughout this package. These convenience types automatically
//  inject types that are global for all of OUFR, such as ITheme and IProcessedStyleSet.

/**
 * Helper extension for declaring common props for styleable components.
 * If these props are present, they will automatically be used by Foundation when applying theming and styling.
 */
export type IStyleableComponentProps<TViewProps, TStyleSet> = IStyleableComponentProps<TViewProps, TStyleSet, ITheme, ISchemeNames>;

/**
 * Styles functions that take in view props and foundation supplied properties for processing.
 * This type should rarely need to be used directly. In most cases using IComponent and lookup types should suffice.
 */
export type IStylesFunction<TViewProps, TStyleSet> = IStylesFunction<TViewProps, TStyleSet, ITheme>;

/**
 * Styles can be a function or an object taking in TViewProps for processing.
 * This type should rarely need to be used directly. In most cases using IComponent and lookup types should suffice.
 */
export type IStylesProp<TViewProps, TStyleSet> = IStylesProp<TViewProps, TStyleSet, ITheme>;

/**
 * Enforce props contract on state components, including the view prop and its shape.
 * Required properties for state components.
 */
export type IStateComponentType<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>> = IStateComponentType<
  TComponentProps,
  TViewProps,
  IProcessedStyleSet<TStyleSet>
>;

/**
 * A helper type for defining view components, including its properties.
 * This type should rarely need to be used directly. In most cases using IComponent and lookup types should suffice.
 */
export type IViewComponent<TViewProps, TStyleSet extends IStyleSet<TStyleSet>> = IViewComponent<TViewProps, IProcessedStyleSet<TStyleSet>>;

/**
 * Primary type for defining stateful components.
 */
export type IComponent<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> = IComponent<
  TComponentProps,
  TViewProps,
  TStyleSet,
  IProcessedStyleSet<TStyleSet>,
  ITheme,
  TStatics
>;

/**
 * Primary type for defining stateless components.
 */
export type IStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}> = IStatelessComponent<
  TComponentProps,
  TStyleSet,
  IProcessedStyleSet<TStyleSet>,
  ITheme,
  TStatics
>;

// tslint:disable-next-line:no-any
const providers: IStylingProviders<any, any, any, ICustomizerContext, ITheme, ISchemeNames> = {
  mergeStyleSets,
  getContextFromProps,
  getCustomizations,
  CustomizerContext
};

/**
 * A helper for Foundation's createComponent that automatically passes in constant types.
 * See Foundation's createComponent for more detail.
 * @param {IComponent} component
 */
export function createStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  component: IStatelessComponent<TComponentProps, TStyleSet, IProcessedStyleSet<TStyleSet>, ITheme, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return foundationCreateStatelessComponent<
    TComponentProps,
    TStyleSet,
    IProcessedStyleSet<TStyleSet>,
    ICustomizerContext,
    ITheme,
    ISchemeNames,
    TStatics
  >(component, providers);
}

/**
 * A helper for Foundation's createComponent that automatically passes in constant types.
 * See Foundation's createComponent for more detail.
 * @param {IComponent} component
 * @param {IStateComponent} state
 */
export function createComponent<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  component: IComponent<TComponentProps, TViewProps, TStyleSet, IProcessedStyleSet<TStyleSet>, ITheme, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return foundationCreateComponent<
    TComponentProps,
    TViewProps,
    TStyleSet,
    IProcessedStyleSet<TStyleSet>,
    ICustomizerContext,
    ITheme,
    ISchemeNames,
    TStatics
  >(component, providers);
}

function getCustomizations<TViewProps, TStyleSet>(
  displayName: string,
  context: ICustomizerContext,
  fields?: string[]
): IStyleableComponentProps<TViewProps, TStyleSet, ITheme, ISchemeNames> {
  // TODO: do we want field props? should fields be part of IComponent and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  const DefaultFields = ['theme', 'styles', 'styleVariables'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}

function getContextFromProps<TComponentProps, TViewProps, TStyleSet>(
  props: IStyleableComponentProps<TViewProps, TStyleSet, ITheme, ISchemeNames>,
  context: ICustomizerContext,
  settings: IStyleableComponentProps<TViewProps, TStyleSet, ITheme, ISchemeNames>
): ICustomizerContext | undefined {
  let newContext: ICustomizerContext | undefined;
  if (props.scheme) {
    // Scheme is a contextual prop, while the other props are not. When scheme is provided, context is affected to apply not
    //    for not just the local component, but all of its children. As a result, scheme is read from the contextual
    //    or settings theme, but NOT from the prop theme. (The prop theme is local-only and does not otherwise affect context.)
    // As written now, schemes affect all components (including styled components) by modifying the active contextual theme.
    //    With this method, if there is a scopedSetting theme with schemes, it will be ignored as only schemes in the contextual theme
    //    will take effect. In addition, any scopedSetting themes will override the contextual theme, schemed or otherwise. This seems
    //    consistent as scopedSettings are more localized than a contextual scheme name.
    newContext = getSchemedContext(props.scheme, context, settings.theme);
  }
  return newContext;
}
