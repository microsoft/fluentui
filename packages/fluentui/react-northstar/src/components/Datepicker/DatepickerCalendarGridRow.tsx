import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { BoxProps, Box } from '../Box/Box';

export type DatepickerCalendarGridRowProps = {};

export type DatepickerCalendarGridRowStylesProps = {};

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
  shorthandConfig: {
    mappedProp: 'content',
  },
});

DatepickerCalendarGridRow.defaultProps = {
  as: 'tr',
};

DatepickerCalendarGridRow.propTypes = commonPropTypes.createCommon();
