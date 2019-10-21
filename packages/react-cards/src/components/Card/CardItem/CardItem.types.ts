import { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '@uifabric/foundation';
import { IBaseProps } from '@uifabric/utilities';
import { IStackItemProps, IStackItemSlots, IStackItemTokens } from 'office-ui-fabric-react';

/**
 * {@docCategory Card}
 */
export type ICardItemComponent = IComponent<ICardItemProps, ICardItemTokens, ICardItemStyles, ICardItemViewProps>;

// These types are redundant with ICardItemComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.

/**
 * {@docCategory Card}
 */
export type ICardItemTokenReturnType = ReturnType<Extract<ICardItemComponent['tokens'], Function>>;

/**
 * {@docCategory Card}
 */
export type ICardItemStylesReturnType = ReturnType<Extract<ICardItemComponent['styles'], Function>>;

/**
 * {@docCategory Card}
 */
export type ICardItemSlot = ISlotProp<ICardItemProps>;

/**
 * {@docCategory Card}
 */
export interface ICardItemSlots extends IStackItemSlots {}

/**
 * {@docCategory Card}
 */
export interface ICardItem {}

/**
 * {@docCategory Card}
 */
export interface ICardItemProps
  extends ICardItemSlots,
    Pick<IStackItemProps, 'grow' | 'shrink' | 'disableShrink' | 'align' | 'verticalFill' | 'order'>,
    IStyleableComponentProps<ICardItemProps, ICardItemTokens, ICardItemStyles>,
    IBaseProps<ICardItem> {
  /**
   * Determines if the CardItem should disregard the children margin specified by Card.
   */
  fill?: boolean;
}

/**
 * {@docCategory Card}
 */
export interface ICardItemViewProps extends ICardItemProps {}

/**
 * {@docCategory Card}
 */
export interface ICardItemTokens extends IStackItemTokens {}

/**
 * {@docCategory Card}
 */
export type ICardItemStyles = IComponentStyles<ICardItemSlots>;
