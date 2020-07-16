import { Accessibility, datepickerBehavior, DatepickerBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useStyles,
  useTelemetry,
  useFluentContext,
  useUnhandledProps,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import { FluentComponentStaticProps, ShorthandRenderFunction, ComponentEventHandler } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { CalendarIcon } from '@fluentui/react-icons-northstar';
import { Popup } from '../Popup/Popup';
import {
  IDay,
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  IDayGridOptions,
  IDatepickerOptions,
  IDateFormatting,
  DEFAULT_DATE_FORMATTING,
} from '@fluentui/date-time-utilities';

import { DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';

export interface DatepickerProps extends UIComponentProps, Partial<IDateFormatting>, Partial<IDatepickerOptions> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerBehaviorProps>;

  /** Datepicker shows it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Datepicker can show it's input is required to be filled. */
  isRequired?: boolean;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChange?: ComponentEventHandler<DatepickerProps & { value: IDay }>;

  /** String to render for button to direct the user to today's date. */
  goToToday?: string;

  /** Text placeholder for the input field. */
  placeholder?: string;

  /** A render function to customize how cells are rendered in the Calendar. */
  renderCell?: ShorthandRenderFunction<any>;

  /** A render function to customize how cells are rendered in the Calendar. */
  renderHeaderCell?: ShorthandRenderFunction<any>;
}

export type DatepickerStylesProps = never;

export const datepickerClassName = 'ui-datepicker';

/**
 * A Datepicker is used to display dates.
 * This component is currently UNSTABLE!
 */
export const Datepicker: ComponentWithAs<'div', DatepickerProps> &
  FluentComponentStaticProps<DatepickerProps> & {
    Calendar: typeof DatepickerCalendar;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Datepicker.displayName, context.telemetry);
  setStart();
  const datepickerRef = React.useRef<HTMLElement>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  const showCalendarGrid = () => {
    setOpen(true);
  };

  const { className, design, styles, variables, formatMonthDayYear } = props;

  const nonNullSelectedDate = selectedDate ?? props.today ?? new Date();

  const dayGridOptions = {
    selectedDate: nonNullSelectedDate,
    navigatedDate: nonNullSelectedDate,
    firstDayOfWeek: props.firstDayOfWeek,
    firstWeekOfYear: props.firstWeekOfYear,
    dateRangeType: props.dateRangeType,
    daysToSelectInDayView: props.daysToSelectInDayView,
    today: props.today,
    showWeekNumbers: props.showWeekNumbers,
    workWeekDays: props.workWeekDays,
    minDate: props.minDate,
    maxDate: props.maxDate,
    restrictedDates: props.restrictedDates,
  } as IDayGridOptions;

  const dateFormatting = {
    formatDay: props.formatDay,
    formatYear: props.formatYear,
    formatMonthDayYear: props.formatMonthDayYear,
    formatMonthYear: props.formatMonthYear,
    parse: props.parse,
  };

  const valueFormatter = date => (date ? formatMonthDayYear(date) : '');

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Datepicker.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Datepicker.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });

  const { classes } = useStyles<DatepickerStylesProps>(Datepicker.displayName, {
    className: datepickerClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleChange: DatepickerCalendarProps['onDateChange'] = (e, data) => {
    const targetDay = data.value;
    setSelectedDate(targetDay.originalDate);
    setOpen(false);

    _.invoke(props, 'onDateChange', e, { ...props, value: targetDay });
  };

  const element = (
    <Ref innerRef={datepickerRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          <Input readOnly onClick={showCalendarGrid} value={valueFormatter(selectedDate)} />
          <Popup
            open={open}
            onOpenChange={(e, { open }) => setOpen(open)}
            content={<DatepickerCalendar onDateChange={handleChange} {...dateFormatting} {...dayGridOptions} />}
            trapFocus
          >
            <Button icon={<CalendarIcon />} title="Open calendar" iconOnly />
          </Popup>
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

Datepicker.displayName = 'Datepicker';

Datepicker.propTypes = {
  ...commonPropTypes.createCommon(),

  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onDateChange: PropTypes.func,
  goToToday: PropTypes.string,
  placeholder: PropTypes.string,
  renderCell: PropTypes.func,
  renderHeaderCell: PropTypes.func,

  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  restrictedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),

  firstDayOfWeek: PropTypes.oneOf(Object.keys(DayOfWeek).map(name => DayOfWeek[name])),
  firstWeekOfYear: PropTypes.oneOf(Object.keys(FirstWeekOfYear).map(name => FirstWeekOfYear[name])),
  dateRangeType: PropTypes.oneOf(Object.keys(DateRangeType).map(name => DateRangeType[name])),
  daysToSelectInDayView: PropTypes.number,
  today: PropTypes.instanceOf(Date),
  showWeekNumbers: PropTypes.bool,
  workWeekDays: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(DayOfWeek).map(name => DayOfWeek[name]))),

  formatDay: PropTypes.func,
  formatYear: PropTypes.func,
  formatMonthDayYear: PropTypes.func,
  formatMonthYear: PropTypes.func,

  parse: PropTypes.func,

  months: PropTypes.arrayOf(PropTypes.string),
  shortMonths: PropTypes.arrayOf(PropTypes.string),
  days: PropTypes.arrayOf(PropTypes.string),
  shortDays: PropTypes.arrayOf(PropTypes.string),
};

Datepicker.defaultProps = {
  accessibility: datepickerBehavior,

  // IDatepickerOptions
  firstDayOfWeek: DayOfWeek.Sunday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,

  ...DEFAULT_DATE_FORMATTING,
};

Datepicker.handledProps = Object.keys(Datepicker.propTypes) as any;

Datepicker.create = createShorthandFactory({ Component: Datepicker });

Datepicker.Calendar = DatepickerCalendar;
