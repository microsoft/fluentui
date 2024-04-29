import { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '@fluentui/foundation-legacy';
import { IStackProps, IStackSlots, IStackTokens } from '@fluentui/react/lib/Stack';
import { IBaseProps } from '@fluentui/react/lib/Utilities';

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardSectionComponent = IComponent<
  ICardSectionProps,
  ICardSectionTokens,
  ICardSectionStyles,
  ICardSectionViewProps
>;

// These types are redundant with ICardSectionComponent but are needed until TS function return widening issue
// is resolved: https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardSectionTokenReturnType = ReturnType<Extract<ICardSectionComponent['tokens'], Function>>;

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardSectionStylesReturnType = ReturnType<Extract<ICardSectionComponent['styles'], Function>>;

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardSectionSlot = ISlotProp<ICardSectionProps>;

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardSectionSlots extends Pick<IStackSlots, 'root'> {}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardSection {}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardSectionProps
  extends ICardSectionSlots,
    Pick<
      IStackProps,
      | 'as'
      | 'horizontal'
      | 'reversed'
      | 'horizontalAlign'
      | 'verticalAlign'
      | 'verticalFill'
      | 'disableShrink'
      | 'grow'
      | 'wrap'
    >,
    IStyleableComponentProps<ICardSectionProps, ICardSectionTokens, ICardSectionStyles>,
    IBaseProps<ICardSection> {
  /**
   * Determines if the CardSection should disregard the children margin specified by Card.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  fill?: boolean;
}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardSectionViewProps extends ICardSectionProps {}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export interface ICardSectionTokens extends IStackTokens {
  /**
   * Defines the margin to be applied to the CardSection relative to its container.
   * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
   * future.
   */
  margin?: number | string;
}

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Card}
 */
export type ICardSectionStyles = IComponentStyles<ICardSectionSlots>;
