import * as React from 'react';
import { IStyleSetBase } from '@fluentui/style-utilities';
import { IComponentOptions as IOldComponentOptions } from '../IComponent';
import { ISlots, ISlotDefinition, ISlottableProps } from '../ISlots';

/**
 * Defines the contract for view components.
 */
export type IViewComponent<TViewProps, TComponentSlots = {}> = (
  props: React.PropsWithChildren<TViewProps>,
  slots: ISlots<Required<TComponentSlots>>,
) => ReturnType<React.FunctionComponent>;

/**
 * Defines the contract for slot components.
 */
export type ISlotComponent<TComponentProps extends ISlottableProps<TComponentSlots>, TComponentSlots> =
  | ISlotDefinition<Required<TComponentSlots>>
  | ((props: TComponentProps) => ISlotDefinition<Required<TComponentSlots>>);

/**
 * Defines the contract for partial slot components used in recomposition.
 */
export type IPartialSlotComponent<TComponentProps extends ISlottableProps<TComponentSlots>, TComponentSlots> =
  | ISlotDefinition<TComponentSlots>
  | ((props: TComponentProps) => ISlotDefinition<TComponentSlots>);

/**
 * Component options used by foundation to tie elements together.
 *
 * * TComponentProps: A styleable props interface for the created component.
 * * TTokens: The type for tokens props.
 * * TStyleSet: The type for styles properties.
 * * TViewProps: The props specific to the view, including processed properties outputted by optional state component.
 * If state component is not provided, TComponentProps is the same as TViewProps.
 * * TComponentSlots: The slottable components used to build the HOC.
 * * TStatics: Static type for statics applied to created component object.
 */
export interface IComponentOptions<
  TComponentProps extends ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSetBase,
  TViewProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {},
> extends IOldComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TStatics> {
  /**
   * Slot definition object defining the slot component for each slot.
   */
  slots?: ISlotComponent<TComponentProps, TComponentSlots>;
  /**
   * Stateless pure function that receives props to render the output of the component.
   */
  view?: IViewComponent<TViewProps, TComponentSlots>;
}

export interface IRecompositionComponentOptions<
  TComponentProps extends ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSetBase,
  TViewProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {},
> extends IOldComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TStatics> {
  /**
   * Slot definition object defining the slot component for each slot.
   */
  slots?: IPartialSlotComponent<TComponentProps, TComponentSlots>;
  /**
   * Stateless pure function that receives props to render the output of the component.
   */
  view?: IViewComponent<TViewProps, TComponentSlots>;
}

/**
 * Component helper that defines options as required for ease of use by component consumers.
 */
export type IComponent<
  TComponentProps extends ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSetBase,
  TViewProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {},
> = Required<IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>>;
