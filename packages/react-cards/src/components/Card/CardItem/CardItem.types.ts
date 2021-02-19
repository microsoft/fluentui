import { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '@uifabric/foundation';
import { IStackItemProps, IStackItemSlots, IStackItemTokens } from 'office-ui-fabric-react/lib/Stack';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardItemComponent = IComponent<ICardItemProps, ICardItemTokens, ICardItemStyles, ICardItemViewProps>;

// These types are redundant with ICardItemComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardItemTokenReturnType = ReturnType<Extract<ICardItemComponent['tokens'], Function>>;

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardItemStylesReturnType = ReturnType<Extract<ICardItemComponent['styles'], Function>>;

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardItemSlot = ISlotProp<ICardItemProps>;

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardItemSlots extends IStackItemSlots {}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardItem {}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardItemProps
  extends ICardItemSlots,
    Pick<IStackItemProps, 'grow' | 'shrink' | 'disableShrink' | 'align' | 'verticalFill' | 'order'>,
    IStyleableComponentProps<ICardItemProps, ICardItemTokens, ICardItemStyles>,
    IBaseProps<ICardItem> {
  /**
   * Determines if the CardItem should disregard the children margin specified by Card.
   * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
   * future.
   */
  fill?: boolean;
}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardItemViewProps extends ICardItemProps {}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardItemTokens extends IStackItemTokens {}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardItemStyles = IComponentStyles<ICardItemSlots>;
