import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicker component
 * @specification
 * Adds role='group'.
 */
const datepickerBehavior: Accessibility<DatepickerBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export default datepickerBehavior;

export type DatepickerBehaviorProps = never;
