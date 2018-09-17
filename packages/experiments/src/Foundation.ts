import { mergeStyleSets, ITheme } from 'office-ui-fabric-react';
import {
  createComponent as foundationCreateComponent,
  IComponentOptions,
  IViewComponentProps,
  IStyleableComponentProps,
  IStylingProviders,
  IThemedComponent
} from '@uifabric/foundation';
export { IStateComponentProps } from '@uifabric/foundation';
import { IProcessedStyleSet, IStyleSet } from './Styling';
import { Customizations, CustomizerContext, ICustomizations } from './Utilities';

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
export type IStyleableComponentProps<TProps, TStyleSet> = IStyleableComponentProps<TProps, TStyleSet, ITheme>;

/**
 * Required properties for themed components.
 */
export type IThemedProps<TProps> = TProps & IThemedComponent<ITheme>;

/**
 * The shape of customizations within context.
 */
type IContextCustomization = { customizations: ICustomizations };

// TODO: remove any if possible
// tslint:disable-next-line:no-any
const providers: IStylingProviders<any, any, any, IContextCustomization, ITheme> = {
  mergeStyleSets,
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
    IContextCustomization,
    ITheme,
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
    IContextCustomization,
    ITheme,
    TStatics
  >(options, providers);
}

// TODO: remove any if possible
// tslint:disable-next-line:no-any
function getCustomizations(displayName: string, context: IContextCustomization): any {
  // TODO: do we want field props? should fields be part of IComponentOptions and used here?
  // TODO: should we centrally define DefaultFields? (not exported from styling)
  const DefaultFields = ['theme', 'styles'];
  return Customizations.getSettings(DefaultFields, displayName, context.customizations);
}
