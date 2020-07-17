import { compose } from '@fluentui/react-bindings';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export type DatepickerCalendarCellProps = {};

export type DatepickerCalendarCellStylesProps = ButtonStylesProps;

export const datepickerCalendarCellClassName = 'ui-datepicker__calendar-cell';
export const DatepickerCalendarCell = compose<
  'button',
  DatepickerCalendarCellProps,
  DatepickerCalendarCellStylesProps,
  ButtonProps,
  {}
>(Button, {
  className: datepickerCalendarCellClassName,
  displayName: 'DatepickerCalendarCell',
  mapPropsToStylesProps: () => ({
    text: true,
    size: 'small',
  }),
});
