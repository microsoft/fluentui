import * as React from 'react';

import { compose } from '@fluentui/react-bindings';
import { ChevronEndIcon, ChevronStartIcon } from '@fluentui/react-icons-northstar';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export type DatepickerCalendarHeaderActionProps = ButtonProps & {
  /** What direction the action button should be pointing */
  direction?: 'previous' | 'next';
};

export type DatepickerCalendarHeaderActionStylesProps = ButtonStylesProps;

export const datepickerCalendarHeaderActionClassName = 'ui-datepicker__calendarheaderaction';

/**
 * A DatepickerCalendarHeaderAction is used to display action button for DatepickerCalendarHeader.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarHeaderAction = compose<
  'button',
  DatepickerCalendarHeaderActionProps,
  DatepickerCalendarHeaderActionStylesProps,
  ButtonProps,
  {}
>(Button, {
  className: datepickerCalendarHeaderActionClassName,
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

DatepickerCalendarHeaderAction.defaultProps = {
  ...Button.defaultProps,
  icon: {},
};
