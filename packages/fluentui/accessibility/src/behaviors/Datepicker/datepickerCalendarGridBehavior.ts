import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
/**
 * @description
 * Behavior for a datepicker calendar grid.
 * @specification
 * Provides arrow key navigation in bidirectional direction.
 */
export const datepickerCalendarGridBehavior: Accessibility<DatepickerCalendarGridBehaviorProps> = props => ({
  attributes: {},
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
});

export type DatepickerCalendarGridBehaviorProps = never;
