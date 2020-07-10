import { Accessibility, datepickerBehavior, DatepickerBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, ShorthandRenderFunction } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { CalendarIcon } from '@fluentui/react-icons-northstar';
import Popup from '../Popup/Popup';
import {
  IRestrictedDatesOptions,
  IDay,
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  IDateGridStrings,
  formatMonthDayYear,
  IDayGridOptions,
} from '@fluentui/date-time-utilities';
import { default as DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';

// TODO: extract to date-time-utilities
const DEFAULT_STRINGS: IDateGridStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

// TODO: extract to date-time-utilities
export interface IDateFormatting {
  /**
   * Format the date according to specified function.
   * Intended use case is localization.
   */
  format?: (date: Date) => string;

  /**
   * Parse date from string representation into Date type.
   */
  parse?: (date: string) => Date;
}

// TODO: extract to date-time-utilities
export interface IDatepickerOptions extends IRestrictedDatesOptions {
  /**
   * The first day of the week for your locale.
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   */
  firstWeekOfYear?: FirstWeekOfYear;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   */
  dateRangeType?: DateRangeType;

  /**
   * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
   * views.
   */
  daysToSelectInDayView?: number;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   */
  showWeekNumbers?: boolean;

  /**
   * The days that are selectable when `dateRangeType` is WorkWeek.
   * If `dateRangeType` is not WorkWeek this property does nothing.
   */
  workWeekDays?: DayOfWeek[];
}

export interface DatepickerProps extends IDatepickerOptions, IDateFormatting, UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerBehaviorProps>;

  /** Datepicker shows it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Datepicker shows it is currently unable to be interacted with. */
  isRequired?: boolean;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDayChange?: (e: React.MouseEvent<HTMLElement>, data: DatepickerProps & { value: IDay }) => void;

  /** String to render for button to direct the user to today's date. */
  goToToday?: string;

  /** Text placeholder for the input field. */
  placeholder?: string;

  /** A render function to customize how cells are rendered in the Calendar. */
  renderCell?: ShorthandRenderFunction<any>;

  /** A render function to customize how cells are rendered in the Calendar.. */
  renderHeaderCell?: ShorthandRenderFunction<any>;

  /** Localized labels */
  localizedStrings?: IDateGridStrings;
}

export type DatepickerStylesProps = never;

export const datepickerClassName = 'ui-datepicker';

const Unstable_Datepicker: ComponentWithAs<'div', DatepickerProps> &
  FluentComponentStaticProps<DatepickerProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Unstable_Datepicker.displayName, context.telemetry);
  setStart();
  const datepickerRef = React.useRef<HTMLElement>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const valueFormatter = date => (date ? formatMonthDayYear(date, DEFAULT_STRINGS) : '');
  const { firstDayOfWeek, firstWeekOfYear, dateRangeType } = props;
  const calendarOptions: IDayGridOptions = {
    selectedDate: selectedDate ?? props.today ?? new Date(),
    navigatedDate: selectedDate ?? props.today ?? new Date(),
    firstDayOfWeek,
    firstWeekOfYear,
    dateRangeType,
  };

  const showCalendarGrid = () => {
    setOpen(true);
  };

  const { className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Unstable_Datepicker.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Unstable_Datepicker.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });

  const { classes } = useStyles<DatepickerStylesProps>(Unstable_Datepicker.displayName, {
    className: datepickerClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleChange: DatepickerCalendarProps['onDaySelect'] = (e, data) => {
    const targetDay = data.value;
    setSelectedDate(targetDay.originalDate);
    setOpen(false);

    _.invoke(props, 'onDayChange', e, { ...props, value: targetDay });
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
            content={
              <DatepickerCalendar {...calendarOptions} onDaySelect={handleChange} localizedStrings={DEFAULT_STRINGS} />
            }
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

Unstable_Datepicker.displayName = 'Datepicker';

Unstable_Datepicker.propTypes = {
  ...commonPropTypes.createCommon(),

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

  localizedStrings: PropTypes.object as PropTypes.Validator<IDateGridStrings>,

  format: PropTypes.func,
  parse: PropTypes.func,

  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onDayChange: PropTypes.func,
  goToToday: PropTypes.string,
  placeholder: PropTypes.string,
  renderCell: PropTypes.func,
  renderHeaderCell: PropTypes.func,
};

Unstable_Datepicker.defaultProps = {
  accessibility: datepickerBehavior,
  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,
};

Unstable_Datepicker.handledProps = Object.keys(Unstable_Datepicker.propTypes) as any;

Unstable_Datepicker.create = createShorthandFactory({ Component: Unstable_Datepicker });

/**
 * A Datepicker is used to display dates.
 */
export default Unstable_Datepicker;
