import * as React from 'react';

import { compose } from '@fluentui/react-bindings';
import { ChevronEndIcon, ChevronStartIcon } from '@fluentui/react-icons-northstar';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export type DatepickerCalendarHeaderActionProps = {
  /** What direction the action button should be pointing */
  direction?: 'previous' | 'next';
};

export type DatepickerCalendarHeaderActionStylesProps = ButtonStylesProps;

export const datepickerCalendarHeaderClassName = 'ui-datepicker__calendar-header-action';
export const DatepickerCalendarHeaderAction = compose<
  'button',
  DatepickerCalendarHeaderActionProps,
  DatepickerCalendarHeaderActionStylesProps,
  ButtonProps,
  {}
>(Button, {
  className: datepickerCalendarHeaderClassName,
  displayName: 'DatepickerCalendarHeaderAction',
  handledProps: ['direction'],
  mapPropsToStylesProps: () => ({
    iconOnly: true,
    text: true,
  }),
  slotProps: props => ({
    icon: {
      content: props.direction === 'next' ? <ChevronEndIcon /> : <ChevronStartIcon />,
    },
  }),
});
