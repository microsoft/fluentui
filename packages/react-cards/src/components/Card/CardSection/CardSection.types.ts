import { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '@uifabric/foundation';
import { IBaseProps } from '@uifabric/utilities';
import { IStackProps, IStackSlots, IStackTokens } from 'office-ui-fabric-react';

/**
 * {@docCategory Card}
 */
export type ICardSectionComponent = IComponent<ICardSectionProps, ICardSectionTokens, ICardSectionStyles, ICardSectionViewProps>;

// These types are redundant with ICardSectionComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.

/**
 * {@docCategory Card}
 */
export type ICardSectionTokenReturnType = ReturnType<Extract<ICardSectionComponent['tokens'], Function>>;

/**
 * {@docCategory Card}
 */
export type ICardSectionStylesReturnType = ReturnType<Extract<ICardSectionComponent['styles'], Function>>;

/**
 * {@docCategory Card}
 */
export type ICardSectionSlot = ISlotProp<ICardSectionProps>;

/**
 * {@docCategory Card}
 */
export interface ICardSectionSlots extends Pick<IStackSlots, 'root'> {}

/**
 * {@docCategory Card}
 */
export interface ICardSection {}

/**
 * {@docCategory Card}
 */
export interface ICardSectionProps
  extends ICardSectionSlots,
    Pick<
      IStackProps,
      'as' | 'horizontal' | 'reversed' | 'horizontalAlign' | 'verticalAlign' | 'verticalFill' | 'disableShrink' | 'grow' | 'wrap'
    >,
    IStyleableComponentProps<ICardSectionProps, ICardSectionTokens, ICardSectionStyles>,
    IBaseProps<ICardSection> {
  /**
   * Determines if the CardSection should disregard the children margin specified by Card.
   */
  fill?: boolean;
}

/**
 * {@docCategory Card}
 */
export interface ICardSectionViewProps extends ICardSectionProps {}

/**
 * {@docCategory Card}
 */
export interface ICardSectionTokens extends IStackTokens {
  /**
   * Defines the margin to be applied to the CardSection relative to its container.
   */
  margin?: number | string;
}

/**
 * {@docCategory Card}
 */
export type ICardSectionStyles = IComponentStyles<ICardSectionSlots>;
