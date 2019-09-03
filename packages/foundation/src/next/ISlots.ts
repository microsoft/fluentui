import { IStyleSet } from '@uifabric/styling';
import { ISlotCreator as IOldSlotCreator, ISlottableProps, ValidProps, ValidShorthand } from '../ISlots';
import { IComponentOptions } from './IComponent';

/**
 * Signature of components that have component factories.
 */
export interface ISlotCreator<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TShorthandProp extends ValidShorthand,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
> extends IOldSlotCreator<TComponentProps, TShorthandProp> {
  __options?: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>;
}
