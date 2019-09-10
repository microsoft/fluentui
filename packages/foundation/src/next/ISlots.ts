import { IStyleSet } from '@uifabric/styling';
import { IComponentOptions } from './IComponent';
import { ExtractProps, ISlotCreator as IOldSlotCreator, ValidProps, ValidShorthand } from '../ISlots';
import { ISlottableProps } from './ISlots';

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
  TComponentProps extends ValidProps & TComponentSlots,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TComponentSlots = {},
  TViewProps extends Omit<TComponentProps, keyof TComponentSlots> & ISlottableProps<TComponentSlots> = Omit<
    TComponentProps,
    keyof TComponentSlots
  > &
    ISlottableProps<TComponentSlots>,
  TStatics = {}
> extends React.FunctionComponent {
  __options?: IComponentOptions<TComponentProps, TTokens, TStyleSet, TComponentSlots, TViewProps, TStatics>;
}

/**
 * Automatically defines 'slotProps' prop based on TSlots props.
 */
export type ISlottableProps<TSlots> = {
  slotProps: { [key in keyof TSlots]+?: ExtractProps<TSlots[key]> };
};
