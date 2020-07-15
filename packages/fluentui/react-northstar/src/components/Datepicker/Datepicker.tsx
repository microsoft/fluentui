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
  IDateFormatting,
  IDatepickerOptions,
  DEFAULT_DATE_FORMATTING,
} from '@fluentui/date-time-utilities';
import { DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';

export interface DatepickerProps extends UIComponentProps {
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
  onDateChange?: ComponentEventHandler<DatepickerProps & { value: IDay }>;

  /** String to render for button to direct the user to today's date. */
  goToToday?: string;

  /** Text placeholder for the input field. */
  placeholder?: string;

  /** A render function to customize how cells are rendered in the Calendar. */
  renderCell?: ShorthandRenderFunction<any>;

  /** A render function to customize how cells are rendered in the Calendar. */
  renderHeaderCell?: ShorthandRenderFunction<any>;

  /** Options to change how the daygrid looks like */
  datePickerOptions?: IDatepickerOptions;

  /** Opportunity to override how the dates are formatted. */
  dateFormatting?: IDateFormatting;
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

  const { className, design, styles, variables, datePickerOptions, dateFormatting } = props;

  const valueFormatter = date => (date ? dateFormatting.formatMonthDayYear(date) : '');

  const nonNullSelectedDate = selectedDate ?? props.today ?? new Date();
  const dayGridOptions: IDayGridOptions = {
    ...datePickerOptions,
    selectedDate: nonNullSelectedDate,
    navigatedDate: nonNullSelectedDate,
  };

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
            content={
              <DatepickerCalendar
                onDateChange={handleChange}
                dateFormatting={dateFormatting}
                dayGridOptions={dayGridOptions}
              />
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

  datePickerOptions: PropTypes.object as PropTypes.Validator<IDayGridOptions>,

  dateFormatting: PropTypes.object as PropTypes.Validator<IDateFormatting>,
};

Datepicker.defaultProps = {
  accessibility: datepickerBehavior,
  datePickerOptions: {
    firstDayOfWeek: DayOfWeek.Monday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateRangeType: DateRangeType.Day,
  },
  dateFormatting: DEFAULT_DATE_FORMATTING,
};

Datepicker.handledProps = Object.keys(Datepicker.propTypes) as any;

Datepicker.create = createShorthandFactory({ Component: Datepicker });

Datepicker.Calendar = DatepickerCalendar;
