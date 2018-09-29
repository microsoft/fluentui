import {
  createComponent as foundationCreateComponent,
  IComponentOptions,
  IViewComponentProps,
  IStyleableComponentProps,
  IStylingProviders,
  IThemedComponent
} from '@uifabric/foundation';
export { IStateComponentProps } from '@uifabric/foundation';
import { getSchemedContext, IProcessedStyleSet, ISchemeNames, IStyleSet, ITheme, mergeStyleSets } from './Styling';
import { Customizations, CustomizerContext, ICustomizerContext } from './Utilities';

// Centralize Foundation interaction for use throughout this package. These convenience types provide types
//  that are global for all of OUFR, such as ITheme and IProcessedStyleSet.

/**
 * Required properties for views.
 */
export type IViewComponentProps<TProps, TStyleSet extends IStyleSet<TStyleSet>> = IViewComponentProps<
  TProps,
  IProcessedStyleSet<TStyleSet>
>;

/**
 * Required properties for styleable components.
 */
export type IStyleableComponentProps<TProps, TStyleSet> = IStyleableComponentProps<TProps, TStyleSet, ITheme, ISchemeNames>;

/**
 * Required properties for themed components.
 */
export type IThemedProps<TProps> = TProps & IThemedComponent<ITheme>;

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
 * @param {IComponentOptions} options
 */
export function createStatelessComponent<TComponentProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  options: IComponentOptions<TComponentProps, TComponentProps, TStyleSet, IProcessedStyleSet<TStyleSet>, ITheme, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return foundationCreateComponent<
    TComponentProps,
    TComponentProps, // TViewProps === TComponentProps for stateless components
    TStyleSet,
    IProcessedStyleSet<TStyleSet>,
    ICustomizerContext,
    ITheme,
    ISchemeNames,
    TStatics
  >(options, providers);
}

/**
 * A helper for Foundation's createComponent that automatically passes in constant types.
 * See Foundation's createComponent for more detail.
 * @param {IComponentOptions} options
 * @param {IStateComponent} state
 */
export function createComponent<TComponentProps, TViewProps, TStyleSet extends IStyleSet<TStyleSet>, TStatics = {}>(
  options: IComponentOptions<TComponentProps, TViewProps, TStyleSet, IProcessedStyleSet<TStyleSet>, ITheme, TStatics>
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
  >(options, providers);
}

function getCustomizations<TViewProps, TStyleSet>(
  displayName: string,
  context: ICustomizerContext
): IStyleableComponentProps<TViewProps, TStyleSet, ITheme, ISchemeNames> {
  // TODO: do we want field props? should fields be part of IComponentOptions and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  const DefaultFields = ['theme', 'styles', 'styleVariables'];
  return Customizations.getSettings(DefaultFields, displayName, context.customizations);
}

function getContextFromProps<TViewProps, TStyleSet>(
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
