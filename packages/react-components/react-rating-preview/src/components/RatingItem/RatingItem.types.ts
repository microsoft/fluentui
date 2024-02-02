import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { RatingState } from '../Rating/Rating.types';
import { RatingDisplayState } from '../RatingDisplay/RatingDisplay.types';

export type RatingItemSlots = {
  /**
   * The root slot of the RatingItem.
   * Default html element is span
   */
  root: NonNullable<Slot<'span'>>;
  /**
   * Icon displayed when the rating value is greater than or equal to the item's value.
   */
  selectedIcon?: NonNullable<Slot<'div'>>;
  /**
   * Icon displayed when the rating value is less than the item's value.
   */
  unselectedIcon?: NonNullable<Slot<'div'>>;
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
export type RatingItemProps = ComponentProps<Partial<RatingItemSlots>> & {
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
  Pick<RatingState, 'color' | 'step' | 'size'> & {
    iconFillWidth: number;
    appearance: 'outline' | 'filled';
  };

export type RatingItemContextValue = Partial<Pick<RatingState, 'name' | 'hoveredValue' | 'value'>> &
  Pick<RatingState, 'color' | 'iconFilled' | 'iconOutline' | 'itemLabel' | 'step' | 'size'> &
  Partial<Pick<RatingDisplayState, 'compact'>> & {
    interactive?: boolean;
  };
