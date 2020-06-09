import { IStyleSet } from '@uifabric/styling';
import { ISlottableProps, ValidProps } from '../ISlots';
import { IComponentOptions } from './IComponent';

/**
 * Signature of components created using composed.
 */
export interface IFoundationComponent<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
> extends React.FunctionComponent {
  __options?: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>;
}
