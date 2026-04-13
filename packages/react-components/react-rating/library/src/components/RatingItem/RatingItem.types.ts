import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { RatingState } from '../Rating/Rating.types';
import type { RatingDisplayState } from '../RatingDisplay/RatingDisplay.types';

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
 * RatingItem base props — same as RatingItemProps (no design-only props at this level).
 */
export type RatingItemBaseProps = RatingItemProps;

/**
 * State used in rendering RatingItem
 */
export type RatingItemState = ComponentState<RatingItemSlots> &
  Required<Pick<RatingItemProps, 'value'>> &
  Pick<RatingState, 'color' | 'step' | 'size'> & {
    iconFillWidth: number;
    appearance: 'outline' | 'filled';
  };

/**
 * RatingItem base state — excludes design props (color, size) from context.
 */
export type RatingItemBaseState = Omit<RatingItemState, 'color' | 'size'>;

export type RatingItemContextValue = Partial<Pick<RatingState, 'name' | 'hoveredValue' | 'value'>> &
  Pick<RatingState, 'color' | 'iconFilled' | 'iconOutline' | 'itemLabel' | 'step' | 'size'> &
  Partial<Pick<RatingDisplayState, 'compact'>> & {
    interactive?: boolean;
  };
