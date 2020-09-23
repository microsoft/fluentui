import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { BoxProps, Box } from '../Box/Box';

export type DatepickerCalendarHeaderCellProps = {};

export type DatepickerCalendarHeaderCellStylesProps = {};

export const datepickerCalendarHeaderCellClassName = 'ui-datepicker__calendarheadercell';
/**
 * A DatepickerCalendarHeaderCell is used to display header cells in DatepickerCalendar grid.
 */
export const DatepickerCalendarHeaderCell = compose<
  'th',
  DatepickerCalendarHeaderCellProps,
  DatepickerCalendarHeaderCellStylesProps,
  BoxProps,
  {}
>(Box, {
  className: datepickerCalendarHeaderCellClassName,
  displayName: 'DatepickerCalendarHeaderCell',
  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

DatepickerCalendarHeaderCell.defaultProps = {
  as: 'th',
};

DatepickerCalendarHeaderCell.propTypes = commonPropTypes.createCommon();
