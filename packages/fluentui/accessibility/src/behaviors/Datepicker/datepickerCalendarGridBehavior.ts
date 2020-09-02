import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
/**
 * @description
 * Behavior for a datepicker calendar grid.
 * @specification
 * Adds role='grid'.
 * Provides arrow key navigation in bidirectional direction.
 */
export const datepickerCalendarGridBehavior: Accessibility<DatepickerCalendarGridBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'grid',
    },
  },
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
});

export type DatepickerCalendarGridBehaviorProps = never;
