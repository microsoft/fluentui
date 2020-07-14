import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicker component
 * @specification
 * Adds role='group'.
 */
export const datepickerBehavior: Accessibility<DatepickerBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type DatepickerBehaviorProps = never;
