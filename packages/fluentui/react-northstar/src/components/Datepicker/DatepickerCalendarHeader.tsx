import * as _ from 'lodash';
import * as React from 'react';

import {
  Accessibility,
  datepickerCalendarHeaderBehavior,
  DatepickerCalendarHeaderBehaviorProps,
} from '@fluentui/accessibility';
import { IDateGridStrings } from '@fluentui/date-time-utilities';
import {
  ComponentWithAs,
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

export interface DatepickerCalendarHeaderProps extends UIComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerCalendarHeaderBehaviorProps>;

  /** Shorthand for text label. */
  label?: ShorthandValue<TextProps>;

  /** Localized labels */
  localizedStrings?: IDateGridStrings;

  /** Action to happen on click on the previous button */
  onPreviousClick?: ComponentEventHandler<DatepickerCalendarHeaderActionProps>;

  /** Action to happen on click on the next button */
  onNextClick?: ComponentEventHandler<DatepickerCalendarHeaderActionProps>;

  /** Shorthand for the button that navigates to the previous calendar screen. */
  previousButton?: ShorthandValue<DatepickerCalendarHeaderActionProps>;

  /** Shorthand for the button that navigates to the next calendar screen. */
  nextButton?: ShorthandValue<DatepickerCalendarHeaderActionProps>;
}

export type DatepickerCalendarHeaderStylesProps = never;

export const datepickerCalendarHeaderClassName = 'ui-datepicker__calendarheader';

/**
 * A DatepickerCalendarHeader is used to display header block above calendar grid.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarHeader: ComponentWithAs<'div', DatepickerCalendarHeaderProps> &
  FluentComponentStaticProps<DatepickerCalendarHeaderProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(DatepickerCalendarHeader.displayName, context.telemetry);
  setStart();

  const {
    className,
    design,
    styles,
    variables,
    label,
    nextButton,
    previousButton,
    onPreviousClick,
    onNextClick,
  } = props;
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
        ...unhandledProps,
      })}
    >
      {createShorthand(Text, label)}

      {createShorthand(DatepickerCalendarHeaderAction, previousButton, {
        defaultProps: () =>
          getA11yProps('previousButton', {
            icon: {},
            // TODO: use value from `localizationStrings` after #14058 implements needed values
            title: 'Previous Month',
            direction: 'previous',
          }),
        overrideProps: (predefinedProps: DatepickerCalendarHeaderActionProps): DatepickerCalendarHeaderActionProps => ({
          onClick: (e, data) => {
            onPreviousClick(e, data);
            _.invoke(predefinedProps, 'onClick', e, data);
          },
        }),
      })}
      {createShorthand(DatepickerCalendarHeaderAction, nextButton, {
        defaultProps: () =>
          getA11yProps('nextButton', {
            icon: {},
            // TODO: use value from `localizationStrings` after #14058 implements needed values
            title: 'Next Month',
            direction: 'next',
          }),
        overrideProps: (predefinedProps: DatepickerCalendarHeaderActionProps): DatepickerCalendarHeaderActionProps => ({
          onClick: (e, data) => {
            onNextClick(e, data);
            _.invoke(predefinedProps, 'onClick', e, data);
          },
        }),
      })}
    </ElementType>
  );
  setEnd();
  return element;
};

DatepickerCalendarHeader.displayName = 'DatepickerCalendarHeader';

DatepickerCalendarHeader.propTypes = {
  ...commonPropTypes.createCommon(),
  label: customPropTypes.itemShorthand,
  localizedStrings: PropTypes.object as PropTypes.Validator<IDateGridStrings>,
  nextButton: customPropTypes.itemShorthand,
  previousButton: customPropTypes.itemShorthand,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

DatepickerCalendarHeader.defaultProps = {
  accessibility: datepickerCalendarHeaderBehavior,
  nextButton: {},
  previousButton: {},
  label: {},
};

DatepickerCalendarHeader.handledProps = Object.keys(DatepickerCalendarHeader.propTypes) as any;

DatepickerCalendarHeader.create = createShorthandFactory({ Component: DatepickerCalendarHeader });
