import * as React from 'react';

import { buttonBehavior } from '@fluentui/accessibility';
import { compose } from '@fluentui/react-bindings';
import { ChevronEndIcon, ChevronStartIcon } from '@fluentui/react-icons-northstar';
import { Button, ButtonProps, ButtonStylesProps } from '../Button/Button';

export type DatepickerCalendarHeaderActionProps = ButtonProps & {
  /** What direction the action button should be pointing. */
  direction?: 'previous' | 'next';

  /** Button is disabled for action but still enabled for navigation. */
  disabledNavigatableButton?: boolean;
};

export type DatepickerCalendarHeaderActionStylesProps = ButtonStylesProps;

export const datepickerCalendarHeaderActionClassName = 'ui-datepicker__calendarheaderaction';

/**
 * A DatepickerCalendarHeaderAction is used to display action button for DatepickerCalendarHeader.
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
  handledProps: ['direction', 'disabledNavigatableButton'],
  mapPropsToStylesProps: p => ({
    iconOnly: true,
    text: true,
    disabled: p.disabledNavigatableButton,
  }),
  slotProps: props => ({
    icon: {
      content: props.direction === 'next' ? <ChevronEndIcon /> : <ChevronStartIcon />,
    },
  }),
});

DatepickerCalendarHeaderAction.defaultProps = {
  as: 'button',
  accessibility: buttonBehavior,
  size: 'medium',
  icon: {},
};
