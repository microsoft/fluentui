import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { Day as DayInfo, DayGridOptions, DayOfWeek } from '../utils';

export type { CalendarContextValue, CalendarContextValues } from '../calendarContext';

/**
 * The imperative API exposed through CalendarDay's `imperativeRef` prop.
 */
export type CalendarDayHandle = {
  /**
   * Moves focus to the day the grid is currently navigated to.
   */
  focus(options?: FocusOptions): void;
};

/**
 * Slots rendered by the day picker.
 */
export type CalendarDaySlots = {
  /**
   * The outer container of the day picker.
   */
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

  /**
   * The button to navigate to the previous month.
   */
  previousMonthButton: NonNullable<Slot<'button'>>;

  /**
   * The button to navigate to the next month.
   */
  nextMonthButton: NonNullable<Slot<'button'>>;

  /**
   * The close button.
   */
  closeButton?: Slot<'button'>;

  /**
   * The `<table role="grid">` holding the days of the navigated month. Focusgroup provides in-grid
   * arrow navigation; Calendar owns selection, range hover and navigation beyond visible dates.
   */
  grid: NonNullable<Slot<'table'>>;

  /**
   * The `<tbody>` wrapping every week row.
   */
  body: NonNullable<Slot<'tbody'>>;
};

/**
 * A day in the grid. `originalDate` is `null` for a civil date that does not exist in the local timezone.
 */
export type { Day as DayInfo } from '../utils';

/**
 * Semantic day data passed to cell getters, without DOM props.
 */
export type CalendarDayCellData = DayInfo & {
  /**
   * The formatted day number, or the civil date label when `originalDate` is `null`.
   */
  label: string;
  /**
   * Whether this day is the grid's initial focus target.
   */
  isNavigated: boolean;
};

/**
 * Semantic weekday data passed to header-cell getters.
 */
export type CalendarDayWeekdayCellData = {
  /**
   * Stable key of the weekday header cell.
   */
  key: string;
  /**
   * The weekday represented by the header cell.
   */
  dayOfWeek: DayOfWeek;
  /**
   * The visible short weekday label, or a short month label at a month boundary in single-week view.
   */
  label: string;
  /**
   * The full weekday or month label used as the cell's default accessible name and title.
   */
  accessibleLabel: string;
};

/**
 * A visible week or weekday-header row, without DOM props on the row or its items.
 */
export type CalendarDayRowData =
  | {
      /**
       * Identifies a row of day cells.
       */
      type: 'week';
      /**
       * Zero-based index of the visible week row.
       */
      key: number;
      /**
       * Semantic day data in display order, including placeholder dates.
       */
      days: CalendarDayCellData[];
      /**
       * The numeric week number, present only when week numbers are shown and the row has a representable date.
       */
      weekNumber?: number;
    }
  | {
      /**
       * Identifies the weekday header row.
       */
      type: 'weekday';
      /**
       * Semantic header-cell data ordered from the configured first day of the week.
       */
      cells: CalendarDayWeekdayCellData[];
    };

/**
 * Data describing a day selection and its bounded, unrestricted date range.
 */
export type CalendarDaySelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /**
   * The selected day.
   */
  date: Date;
  /**
   * The dates selected for the configured range, excluding restricted and out-of-bounds dates.
   */
  selectedDateRange: Date[];
};

/**
 * Data describing a request to navigate the day picker.
 */
export type CalendarDayNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /**
   * The date to navigate to.
   */
  date: Date;
  /**
   * Whether focus should move into the day grid after navigation.
   */
  focusOnNavigatedDay: boolean;
};

/**
 * Data describing activation of the day picker's close button.
 */
export type CalendarDayDismissData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>>;

/**
 * Data describing activation of the day picker's month/year heading.
 */
export type CalendarDayHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>>;

/**
 * Overrides for the existing elements of a visible day cell. These are prop bags, not slots.
 * Use label.children for day content or button.children to replace both the label and marker.
 */
export type CalendarDayCellProps = {
  /**
   * Overrides for the `<td role="gridcell">`. Its children remain controlled by the renderer.
   */
  root?: Omit<React.ComponentProps<'td'>, 'children'> & { focusgroupstart?: string };
  /**
   * Overrides for the day button. Set `children` to replace both the label and marker.
   */
  button?: React.ComponentProps<'button'>;
  /**
   * Overrides for the day-number span. Set `children` to customize content while preserving the marker.
   */
  label?: React.ComponentProps<'span'>;
  /**
   * Overrides for the marker element. Applied only when the day is marked.
   */
  marker?: React.ComponentProps<'span'>;
};

/** Overrides for a week row or weekday-header row. */
export type CalendarDayRowProps = {
  /**
   * Overrides for the `<tr>`. Its cells remain controlled by the renderer.
   */
  root?: Omit<React.ComponentProps<'tr'>, 'children'> & { focusgrouprow?: string };
  /**
   * Overrides for the week-number `<th>`, or the header row's spacer.
   * Applied only when the corresponding element is rendered.
   */
  weekNumber?: React.ComponentProps<'th'>;
};

/** Overrides for a weekday header cell. */
export type CalendarDayWeekdayCellProps = {
  /**
   * Overrides for the `<th scope="col">`, including its visible content and accessible name.
   */
  root?: React.ComponentProps<'th'>;
};

/**
 * Props for the day picker. Shared selection, boundaries, and formatting come from CalendarProvider.
 */
export type CalendarDayProps = ComponentProps<Partial<CalendarDaySlots>> &
  Pick<Partial<DayGridOptions>, 'daysToSelectInDayView'> & {
    /**
     * Provides access to the picker's focus handle.
     */
    imperativeRef?: React.Ref<CalendarDayHandle>;

    /**
     * The currently navigated date
     */
    navigatedDate?: Date;

    /**
     * Called when navigation is requested. The event data includes the destination date and whether
     * focus should move into the day grid.
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
     * Optional callback function to mark specific days with a small symbol. Fires when the date range changes,
     * gives the starting and ending displayed dates and expects the list of which days in between should be
     * marked.
     */
    getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];

    /**
     * Overrides the existing elements of each visible cell, including placeholder dates.
     * Receives semantic day data and a formatted label, not DOM props.
     * Refs are composed, class names appended and styles merged.
     * Defined consumer props override defaults, including roles, focus, disabled/selection state and data attributes.
     * Consumers are responsible for preserving accessibility and interaction semantics when overriding these props.
     * Handlers run before the delegated grid behavior; preventDefault cancels selection and navigation.
     * Marker overrides apply only to marked days.
     * Called when the renderer resolves the cell's props, not while the hook builds its data.
     */
    getCellProps?: (day: CalendarDayCellData) => CalendarDayCellProps;

    /**
     * Overrides each visible week row and the weekday header row. Use row.type to identify the row.
     * Week-number overrides apply only when week numbers are shown.
     * Called when the renderer resolves the row's props.
     */
    getRowProps?: (row: CalendarDayRowData) => CalendarDayRowProps;

    /**
     * Overrides each weekday header cell, including its default role and scope.
     * Receives semantic weekday data and formatted labels. Called when the renderer resolves the cell's props.
     */
    getWeekdayCellProps?: (weekday: CalendarDayWeekdayCellData) => CalendarDayWeekdayCellProps;
  };

/**
 * Resolved slots, semantic grid data and on-demand prop getters used to render the day picker.
 */
export type CalendarDayState = ComponentState<CalendarDaySlots> & {
  /**
   * The weekday header row.
   */
  weekdayRow: Extract<CalendarDayRowData, { type: 'weekday' }>;

  /**
   * Visible week rows, containing semantic day data only.
   */
  weeks: Extract<CalendarDayRowData, { type: 'week' }>[];

  /**
   * Resolves built-in HTML props and consumer overrides for a day without modifying its data.
   * Calls the consumer's `getCellProps` callback.
   * @param day - A day from a visible week in `weeks`.
   * @returns Root, button and label props, plus marker props only when the day is marked.
   */
  getDayCellProps: (
    day: CalendarDayCellData,
  ) => Required<Omit<CalendarDayCellProps, 'marker'>> & Pick<CalendarDayCellProps, 'marker'>;

  /**
   * Resolves built-in HTML props and consumer overrides for a row without modifying its data.
   * Calls the consumer's `getRowProps` callback.
   * @param row - A visible week from `weeks`, or `weekdayRow`.
   * @returns Root props and optional week-number or header-spacer props.
   */
  getDayRowProps: (
    row: CalendarDayRowData,
  ) => Required<Pick<CalendarDayRowProps, 'root'>> & Pick<CalendarDayRowProps, 'weekNumber'>;

  /**
   * Resolves built-in HTML props and consumer overrides for a weekday header without modifying its data.
   * Calls the consumer's `getWeekdayCellProps` callback.
   * @param weekday - A header cell from `weekdayRow.cells`.
   * @returns Props for the column-header element.
   */
  getWeekdayCellProps: (weekday: CalendarDayWeekdayCellData) => Required<CalendarDayWeekdayCellProps>;
};
