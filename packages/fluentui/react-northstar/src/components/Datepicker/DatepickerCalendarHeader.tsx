import * as _ from 'lodash';
import * as React from 'react';

import {
  Accessibility,
  datepickerCalendarHeaderBehavior,
  DatepickerCalendarHeaderBehaviorProps,
} from '@fluentui/accessibility';
import { ICalendarStrings, DEFAULT_CALENDAR_STRINGS } from '../../utils/date-time-utilities';
import {
  ForwardRefWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { FluentComponentStaticProps, ShorthandValue, ComponentEventHandler } from '../../types';
import {
  commonPropTypes,
  ContentComponentProps,
  createShorthand,
  createShorthandFactory,
  UIComponentProps,
} from '../../utils';
import { DatepickerCalendarHeaderAction, DatepickerCalendarHeaderActionProps } from './DatepickerCalendarHeaderAction';
import { Text, TextProps } from '../Text/Text';

export interface DatepickerCalendarHeaderProps
  extends UIComponentProps,
    ContentComponentProps,
    Pick<ICalendarStrings, 'prevMonthAriaLabel' | 'nextMonthAriaLabel'> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerCalendarHeaderBehaviorProps>;

  /** Shorthand for text label. */
  label?: ShorthandValue<TextProps>;

  /** Action to happen on click on the previous button */
  onPreviousClick?: ComponentEventHandler<DatepickerCalendarHeaderActionProps>;

  /** Action to happen on click on the next button */
  onNextClick?: ComponentEventHandler<DatepickerCalendarHeaderActionProps>;

  /** Shorthand for the button that navigates to the previous calendar screen. */
  previousButton?: ShorthandValue<DatepickerCalendarHeaderActionProps>;

  /** Shorthand for the button that navigates to the next calendar screen. */
  nextButton?: ShorthandValue<DatepickerCalendarHeaderActionProps>;

  /** Decides whether next button is actionable._align_baseline. */
  disabledNextButton?: boolean;

  /** Decides whether previous button is actionable._align_baseline. */
  disabledPreviousButton?: boolean;
}

export type DatepickerCalendarHeaderStylesProps = never;

export const datepickerCalendarHeaderClassName = 'ui-datepicker__calendarheader';

/**
 * A DatepickerCalendarHeader is used to display header block above calendar grid.
 */
export const DatepickerCalendarHeader = React.forwardRef<HTMLDivElement, DatepickerCalendarHeaderProps>(
  (props, ref) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(DatepickerCalendarHeader.displayName, context.telemetry);
    setStart();

    const { className, design, styles, variables, label, nextButton, previousButton, onPreviousClick, onNextClick } =
      props;
    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(DatepickerCalendarHeader.handledProps, props);
    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: DatepickerCalendarHeader.displayName,
      actionHandlers: {},
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarHeaderStylesProps>(DatepickerCalendarHeader.displayName, {
      className: datepickerCalendarHeaderClassName,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {createShorthand(Text, label, {
          defaultProps: () =>
            getA11yProps('label', {
              className: classes.label,
            }),
        })}

        {createShorthand(DatepickerCalendarHeaderAction, previousButton, {
          defaultProps: () =>
            getA11yProps('previousButton', {
              title: props.prevMonthAriaLabel,
              direction: 'previous' as const,
              'aria-disabled': props.disabledPreviousButton,
              disabledNavigatableButton: props.disabledPreviousButton,
            }),
          overrideProps: (
            predefinedProps: DatepickerCalendarHeaderActionProps,
          ): DatepickerCalendarHeaderActionProps => ({
            onClick: (e, data) => {
              if (!props.disabledPreviousButton) {
                onPreviousClick(e, data);
                _.invoke(predefinedProps, 'onClick', e, data);
              }
            },
          }),
        })}
        {createShorthand(DatepickerCalendarHeaderAction, nextButton, {
          defaultProps: () =>
            getA11yProps('nextButton', {
              title: props.nextMonthAriaLabel,
              direction: 'next' as const,
              'aria-disabled': props.disabledNextButton,
              disabledNavigatableButton: props.disabledNextButton,
            }),
          overrideProps: (
            predefinedProps: DatepickerCalendarHeaderActionProps,
          ): DatepickerCalendarHeaderActionProps => ({
            onClick: (e, data) => {
              if (!props.disabledNextButton) {
                onNextClick(e, data);
                _.invoke(predefinedProps, 'onClick', e, data);
              }
            },
          }),
        })}
      </ElementType>
    );
    setEnd();
    return element;
  },
) as unknown as ForwardRefWithAs<'div', HTMLDivElement, DatepickerCalendarHeaderProps> &
  FluentComponentStaticProps<DatepickerCalendarHeaderProps>;

DatepickerCalendarHeader.displayName = 'DatepickerCalendarHeader';

DatepickerCalendarHeader.propTypes = {
  ...commonPropTypes.createCommon(),
  label: customPropTypes.itemShorthand,
  nextButton: customPropTypes.itemShorthand,
  previousButton: customPropTypes.itemShorthand,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  disabledNextButton: PropTypes.bool,
  disabledPreviousButton: PropTypes.bool,

  prevMonthAriaLabel: PropTypes.string,
  nextMonthAriaLabel: PropTypes.string,
};

DatepickerCalendarHeader.defaultProps = {
  accessibility: datepickerCalendarHeaderBehavior,
  nextButton: {},
  previousButton: {},
  label: {},

  prevMonthAriaLabel: DEFAULT_CALENDAR_STRINGS.prevMonthAriaLabel,
  nextMonthAriaLabel: DEFAULT_CALENDAR_STRINGS.nextMonthAriaLabel,
};

DatepickerCalendarHeader.handledProps = Object.keys(DatepickerCalendarHeader.propTypes) as any;

DatepickerCalendarHeader.create = createShorthandFactory({ Component: DatepickerCalendarHeader });
