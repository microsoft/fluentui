import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
/**
 * @description
 * Behavior for a datepicker calendar grid.
 * @specification
 * Provides arrow key navigation in bidirectional direction.
 * Adds role='grid
 */
export const datepickerCalendarGridBehavior: Accessibility<DatepickerCalendarGridBehaviorProps> = props => ({
  focusZone: {
    attributes: {
      root: {
        role: 'grid',
      },
    },
    props: {
      direction: FocusZoneDirection.bidirectional,
      pagingSupportDisabled: true,
    },
  },
});

export type DatepickerCalendarGridBehaviorProps = never;
