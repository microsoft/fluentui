import { IStyleSet } from '@uifabric/styling';
import { ISlotCreator as IOldSlotCreator, ISlottableProps, ValidProps, ValidShorthand } from '../ISlots';
import { IComponentOptions } from './IComponent';

/**
 * Signature of components that have component factories.
 */
export interface ISlotCreator<TProps extends ValidProps, TShorthandProp extends ValidShorthand>
  extends IOldSlotCreator<TProps, TShorthandProp> {
  defaultProp?: keyof TProps | 'children';
}

/**
 * Slottable version of React.ComponentType.
 */
export type ISlottableComponentType<TProps extends ValidProps, TShorthandProp extends ValidShorthand> = React.ComponentType<TProps> &
  ISlotCreator<TProps, TShorthandProp>;

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
