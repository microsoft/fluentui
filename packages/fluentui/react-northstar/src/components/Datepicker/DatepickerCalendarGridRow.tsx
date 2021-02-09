import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { BoxProps, Box } from '../Box/Box';
import { DateRangeType } from '../../utils/date-time-utilities';

export type DatepickerCalendarGridRowProps = {
  ['date-range-type']?: DateRangeType;
};

export type DatepickerCalendarGridRowStylesProps = {
  isWeekSelectionActive: boolean;
};

export const datepickerCalendarGridRowClassName = 'ui-datepicker__calendargridrow';
/**
 * A DatepickerCalendarGridRow is used to display the calendar grid row.
 */
export const DatepickerCalendarGridRow = compose<
  'tr',
  DatepickerCalendarGridRowProps,
  DatepickerCalendarGridRowStylesProps,
  BoxProps,
  {}
>(Box, {
  className: datepickerCalendarGridRowClassName,
  displayName: 'DatepickerCalendarGridRow',
  overrideStyles: true,
  mapPropsToStylesProps: p => ({
    isWeekSelectionActive: p['date-range-type'] === DateRangeType.Week,
  }),
  shorthandConfig: {
    mappedProp: 'content',
  },
});

DatepickerCalendarGridRow.defaultProps = {
  as: 'tr',
};

DatepickerCalendarGridRow.propTypes = commonPropTypes.createCommon();
