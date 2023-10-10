import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RatingItemSlots = {
  /**
   * The root slot of the RatingItem.
   * Default html element is div
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The span that will render an empty icon, a half-filled icon, or a full icon
   */
  indicator?: NonNullable<Slot<'span'>>;
  /**
   * Radio input slot used for half star precision
   */
  halfValueInput?: Slot<'input'>;
  /**
   * Radio input slot used for full star precision
   */
  fullValueInput?: Slot<'input'>;
};

/**
 * RatingItem Props
 */
export type RatingItemProps = ComponentProps<RatingItemSlots> & {
  /**
   * The positive whole number value that is displayed by this RatingItem
   */
  value?: number;
};

/**
 * State used in rendering RatingItem
 */
export type RatingItemState = ComponentState<RatingItemSlots> & Required<Pick<RatingItemProps, 'value'>>;
