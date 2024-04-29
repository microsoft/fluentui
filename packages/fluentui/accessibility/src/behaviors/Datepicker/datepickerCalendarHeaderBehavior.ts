import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Adds attribute 'aria-live=polite' to 'label' slot.
 */
export const datepickerCalendarHeaderBehavior: Accessibility<DatepickerCalendarHeaderBehaviorProps> = () => ({
  attributes: {
    label: {
      'aria-live': 'polite',
    },
  },
});

export type DatepickerCalendarHeaderBehaviorProps = never;
