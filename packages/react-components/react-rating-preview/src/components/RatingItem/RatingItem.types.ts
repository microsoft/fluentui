import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { RatingState } from '../Rating/Rating.types';

export type RatingItemSlots = {
  /**
   * The root slot of the RatingItem.
   * Default html element is span
   */
  root: NonNullable<Slot<'span'>>;
  /**
   * The div that will render an empty icon, a half-filled icon, or a full icon
   */
  indicator: NonNullable<Slot<'div'>>;
  /**
   * Radio input slot used for half star precision
   */
  halfValueInput?: NonNullable<Slot<'input'>>;
  /**
   * Radio input slot used for full star precision
   */
  fullValueInput?: NonNullable<Slot<'input'>>;
};

/**
 * RatingItem Props
 */
export type RatingItemProps = ComponentProps<Partial<RatingItemSlots>, 'fullValueInput'> & {
  /**
   * The positive whole number value that is displayed by this RatingItem
   */
  value?: number;
};

/**
 * State used in rendering RatingItem
 */
export type RatingItemState = ComponentState<RatingItemSlots> &
  Required<Pick<RatingItemProps, 'value'>> &
  Pick<RatingState, 'precision' | 'size'>;
