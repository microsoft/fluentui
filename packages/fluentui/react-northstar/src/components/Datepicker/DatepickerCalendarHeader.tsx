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
import { ArrowLeftIcon, ArrowRightIcon } from '@fluentui/react-icons-northstar';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FluentComponentStaticProps, ShorthandValue } from '../../types';
import {
  commonPropTypes,
  ContentComponentProps,
  createShorthand,
  createShorthandFactory,
  UIComponentProps,
} from '../../utils';
import { ButtonProps } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { DatepickerCalendarHeaderAction } from './DatepickerCalendarHeaderAction';

export interface DatepickerCalendarHeaderProps extends UIComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerCalendarHeaderBehaviorProps>;

  /** Localized labels */
  localizedStrings?: IDateGridStrings;

  onPreviousClick?: Function;
  onNextClick?: Function;

  /** Shorthand for the button that navigates to the previous calendar screen. */
  previousButton?: ShorthandValue<ButtonProps>;

  /** Shorthand for the button that navigates to the next calendar screen. */
  nextButton?: ShorthandValue<ButtonProps>;
}

export type DatepickerCalendarHeaderStylesProps = never;

export const datepickerCalendarHeaderClassName = 'ui-datepicker__calendar-controls';

/**
 * A Datepicker is used to display dates.
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
    content,
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
      <Flex fill space="between" vAlign="center">
        <Text content={content} />
        {createShorthand(DatepickerCalendarHeaderAction, previousButton, {
          defaultProps: () =>
            getA11yProps('previousButton', {
              className: datepickerCalendarHeaderClassName,
              icon: <ArrowLeftIcon />,
              title: 'Previous Month',
              onClick: onPreviousClick,
              type: 'previous',
            }),
        })}
        {createShorthand(DatepickerCalendarHeaderAction, nextButton, {
          defaultProps: () =>
            getA11yProps('nextButton', {
              className: datepickerCalendarHeaderClassName,
              icon: <ArrowRightIcon />,
              title: 'Previous Month',
              onClick: onNextClick,
              type: 'next',
            }),
        })}
      </Flex>
    </ElementType>
  );
  setEnd();
  return element;
};

DatepickerCalendarHeader.displayName = 'DatepickerCalendarHeader';

DatepickerCalendarHeader.propTypes = {
  ...commonPropTypes.createCommon(),
  localizedStrings: PropTypes.object as PropTypes.Validator<IDateGridStrings>,
  nextButton: customPropTypes.itemShorthand,
  previousButton: customPropTypes.itemShorthand,
};

DatepickerCalendarHeader.defaultProps = {
  accessibility: datepickerCalendarHeaderBehavior,
  nextButton: {},
  previousButton: {},
};

DatepickerCalendarHeader.handledProps = Object.keys(DatepickerCalendarHeader.propTypes) as any;

DatepickerCalendarHeader.create = createShorthandFactory({ Component: DatepickerCalendarHeader });
