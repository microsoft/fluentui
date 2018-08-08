import { mergeStyleSets, getTheme, ITheme } from 'office-ui-fabric-react';
import {
  createStatelessComponent as foundationCreateStatelessComponent,
  createComponent as foundationCreateComponent,
  IComponentOptions,
  IViewComponentProps,
  IStateComponent,
  IStyleableComponent,
  IStyleableComponentProps,
  IStylingProviders,
  IThemedComponent,
  IViewComponent
} from '@uifabric/foundation';
export { IStateComponentProps } from '@uifabric/foundation';
import { IProcessedStyleSet, IStyleSet } from './Styling';

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
export type IStyleableComponent<TProps, TStyleSet> = IStyleableComponent<TProps, TStyleSet, ITheme>;
export type IStyleableComponentProps<TProps, TStyleSet> = IStyleableComponentProps<TProps, TStyleSet, ITheme>;
/**
 * Required properties for themed components.
 */
export type IThemedProps<TProps> = TProps & IThemedComponent<ITheme>;

// tslint:disable-next-line:no-any
const providers: IStylingProviders<any, any, ITheme> = {
  getTheme,
  mergeStyleSets
};

/**
 * A helper for Foundation's createStatelessComponent that automatically passes in constant types.
 * See Foundation's createStatelessComponent for more detail.
 * @param {IComponentOptions} options
 */
export function createStatelessComponent<
  TComponentProps extends IStyleableComponent<TComponentProps, TStyleSet, ITheme>,
  TStyleSet extends IStyleSet<TStyleSet>,
  TStatics = {}
>(
  options: IComponentOptions<TComponentProps, TStyleSet, IProcessedStyleSet<TStyleSet>, ITheme, TStatics>
): React.StatelessComponent<TComponentProps> & TStatics {
  return foundationCreateStatelessComponent<
    TComponentProps,
    TStyleSet,
    IProcessedStyleSet<TStyleSet>,
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
export function createComponent<
  TComponentProps extends IStyleableComponent<TViewProps, TStyleSet, ITheme>,
  TViewProps,
  TStyleSet extends IStyleSet<TStyleSet>,
  TStatics = {}
>(
  options: IComponentOptions<TViewProps, TStyleSet, IProcessedStyleSet<TStyleSet>, ITheme, TStatics>,
  state: IStateComponent<
    TComponentProps,
    TViewProps & IViewComponent<TViewProps, IProcessedStyleSet<TStyleSet>>,
    IProcessedStyleSet<TStyleSet>
  >
): React.StatelessComponent<TComponentProps> & TStatics {
  return foundationCreateComponent<
    TComponentProps,
    TViewProps,
    TStyleSet,
    IProcessedStyleSet<TStyleSet>,
    ITheme,
    TStatics
  >(options, providers, state);
}
