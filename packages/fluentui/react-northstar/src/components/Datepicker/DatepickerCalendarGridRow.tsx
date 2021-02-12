import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { BoxProps, Box } from '../Box/Box';

export type DatepickerCalendarGridRowProps = {
  isRowSelectionActive?: boolean;
};

export type DatepickerCalendarGridRowStylesProps = {
  isRowSelectionActive?: boolean;
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
  handledProps: ['isRowSelectionActive'],
  overrideStyles: true,
  mapPropsToStylesProps: ({ isRowSelectionActive }) => ({
    isRowSelectionActive,
  }),
  shorthandConfig: {
    mappedProp: 'content',
  },
});

DatepickerCalendarGridRow.defaultProps = {
  as: 'tr',
};

DatepickerCalendarGridRow.propTypes = commonPropTypes.createCommon();
