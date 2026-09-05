import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { DayGridOptions } from '../../utils';
import type { CalendarDayContextValue } from '../../contexts/calendarDayContext';

export type { CalendarContextValue, CalendarContextValues } from '../../contexts/calendarContext';
export type { CalendarDayContextValue, CalendarDayContextValues } from '../../contexts/calendarDayContext';
export type { DayInfo } from '../../hooks/useWeeks';

/**
 * The imperative API exposed on CalendarDay's forwarded ref.
 */
export type CalendarDayHandle = {
  /**
   * Moves focus to the day the grid is currently navigated to.
   */
  focus(): void;
};

/**
 * Defines the CalendarDaySlots contract.
 */

export type CalendarDaySlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Holds the month/year title and the navigation buttons.
   */
  header: NonNullable<Slot<'div'>>;

  /**
   * The month and year label. Renders as a `button` when `onHeaderSelect` is set, otherwise as a
   * plain `div`.
   */
  heading: NonNullable<Slot<'button', 'div'>>;

  /**
   * Wraps the previous/next month and close buttons.
   */
  navigation: NonNullable<Slot<'div'>>;

  previousMonthButton: NonNullable<Slot<'button'>>;

  nextMonthButton: NonNullable<Slot<'button'>>;

  /**
   * The close button.
   */
  closeButton?: Slot<'button'>;

  /**
   * The `<table role="grid">` holding the days of the navigated month, which owns grid semantics
   * and arrow key navigation.
   */
  grid: NonNullable<Slot<'table'>>;

  /**
   * The `<tbody>` wrapping the weekday header row and every week row.
   */
  body: NonNullable<Slot<'tbody'>>;
};

/**
 * Defines the CalendarDaySelectData contract.
 */

export type CalendarDaySelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  date: Date;
  selectedDateRangeArray: Date[];
};

/**
 * Defines the CalendarDayNavigateData contract.
 */

export type CalendarDayNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  date: Date;
  focusOnNavigatedDay: boolean;
};

/**
 * Defines the CalendarDayDismissData contract.
 */

export type CalendarDayDismissData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>>;

/**
 * Defines the CalendarDayHeaderSelectData contract.
 */

export type CalendarDayHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>>;

/**
 * Defines the CalendarDayProps contract.
 */

export type CalendarDayProps = ComponentProps<Partial<CalendarDaySlots>> &
  Pick<Partial<DayGridOptions>, 'daysToSelectInDayView' | 'markedDays'> & {
    /**
     * The currently navigated date
     */
    navigatedDate?: Date;

    /**
     * Callback issued when a date in the calendar is navigated
     * @param date - The date that is navigated to
     * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
     */
    onNavigateDate?: EventHandler<CalendarDayNavigateData>;

    /**
     * Callback issued when calendar day is closed
     */
    onDismiss?: EventHandler<CalendarDayDismissData>;

    /**
     * Callback function when the header is selected
     */
    onHeaderSelect?: EventHandler<CalendarDayHeaderSelectData>;

    /**
     * How many weeks to show. If not provided, shows enough weeks to display the navigated month,
     * between 4 and 6 depending.
     * @default undefined
     */
    weeksToShow?: number;

    /**
     * Whether to show days outside the selected month with lighter styles
     * @default true
     */
    lightenDaysOutsideNavigatedMonth?: boolean;

    /**
     * Optional callback function to mark specific days with a small symbol. Fires when the date range changes,
     * gives the starting and ending displayed dates and expects the list of which days in between should be
     * marked.
     */
    getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];
  };

/**
 * Defines the CalendarDayState contract.
 */

export type CalendarDayState = ComponentState<CalendarDaySlots> &
  CalendarDayContextValue & {
    /**
     * The formatted month and year shown in the header.
     */
    monthAndYear: string;

    /**
     * Whether navigating to the previous month is allowed by `minDate`.
     */
    prevMonthInBounds: boolean;

    /**
     * Whether navigating to the next month is allowed by `maxDate`.
     */
    nextMonthInBounds: boolean;

    headerIsClickable: boolean;
  };

/**
 * Row motion lives on CalendarDayGridRow, so the base and styled layers share the same props.
 */
export type CalendarDayBaseProps = CalendarDayProps;

/**
 * Defines the CalendarDayBaseState contract.
 */

export type CalendarDayBaseState = CalendarDayState;
