import { compose } from '@fluentui/react-bindings';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export type DatepickerCalendarCellProps = {};

export type DatepickerCalendarCellStylesProps = ButtonStylesProps;

export const datepickerCalendarCellClassName = 'ui-datepicker__calendarcell';
/**
 * A Datepicker cell is used to display calendar grid cells.
 * This component is currently UNSTABLE!
 */
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
