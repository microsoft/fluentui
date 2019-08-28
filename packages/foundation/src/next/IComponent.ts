import { IStyleSet } from '@uifabric/styling';
import { IComponentOptions as IOldComponentOptions, IViewComponent } from '../IComponent';

/**
 * Component options used by foundation to tie elements together.
 *
 * * TComponentProps: A styleable props interface for the created component.
 * * TTokens: The type for tokens props.
 * * TStyleSet: The type for styles properties.
 * * TViewProps: The props specific to the view, including processed properties outputted by optional state component. If state
 * component is not provided, TComponentProps is the same as TViewProps.
 * * TStatics: Static type for statics applied to created component object.
 */
export interface IComponentOptions<
  TComponentProps,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps = TComponentProps,
  TStatics = {}
> extends IOldComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TStatics> {
  /**
   *
   * Stateless pure function that receives props to render the output of the component.
   */
  view?: IViewComponent<TViewProps>;
}
