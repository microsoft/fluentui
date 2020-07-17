import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { BoxProps, Box } from '../Box/Box';

export type DatepickerCalendarHeaderCellProps = {};

export type DatepickerCalendarHeaderCellStylesProps = {};

export const datepickerCalendarHeaderCellClassName = 'ui-datepicker__calendar-headercell';
export const DatepickerCalendarHeaderCell = compose<
  'span',
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
  as: 'span',
};

DatepickerCalendarHeaderCell.propTypes = commonPropTypes.createCommon();
