import { compose } from '@fluentui/react-bindings';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export type DatepickerCalendarHeaderActionProps = {
  type?: 'previous' | 'next';
};

export type DatepickerCalendarHeaderActionStylesProps = ButtonStylesProps;

export const datepickerCalendarHeaderClassName = 'ui-datepicker__calendar-header-action';
export const DatepickerCalendarHeaderAction = compose<
  'button',
  DatepickerCalendarHeaderActionProps,
  DatepickerCalendarHeaderActionStylesProps,
  ButtonProps,
  ButtonStylesProps
>(Button, {
  className: datepickerCalendarHeaderClassName,
  displayName: 'DatepickerCalendarHeaderAction',
  handledProps: ['type'],
  mapPropsToStylesProps: () => ({
    iconOnly: true,
  }),
  shorthandConfig: {
    mappedProp: 'content',
  },
});
