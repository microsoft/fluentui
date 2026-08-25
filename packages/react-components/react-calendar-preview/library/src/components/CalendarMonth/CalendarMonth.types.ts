import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CalendarMonthCell } from '../../contexts/calendarMonthContext';
import type { CalendarYear } from '../CalendarYear';
import type { CalendarYearHandle } from '../CalendarYear/CalendarYear.types';

export type { CalendarContextValue, CalendarContextValues } from '../../contexts/calendarContext';

export type {
  CalendarMonthCell,
  CalendarMonthContextValue,
  CalendarMonthContextValues,
} from '../../contexts/calendarMonthContext';

/**
 * The imperative API exposed on CalendarMonth's forwarded ref.
 */
export type CalendarMonthHandle = {
  /**
   * Moves focus to the navigated month, or to the year picker while it is open.
   */
  focus(): void;
};

/**
 * Defines the CalendarMonthSlots contract.
 */

export type CalendarMonthSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Holds the year title and the navigation buttons.
   */
  header: NonNullable<Slot<'div'>>;

  /**
   * The year label, which opens the year picker when it is not hidden.
   */
  heading: NonNullable<Slot<'button'>>;

  navigation: NonNullable<Slot<'div'>>;

  previousYearButton: NonNullable<Slot<'button'>>;

  nextYearButton: NonNullable<Slot<'button'>>;

  /**
   * The `role="grid"` container holding the month rows.
   */
  grid: NonNullable<Slot<'div'>>;

  /**
   * The year picker, which replaces the whole month picker while it is open. Only rendered while
   * `isYearPickerVisible` is set.
   */
  yearPicker: NonNullable<Slot<typeof CalendarYear>>;
};

/**
 * Defines the CalendarMonthSelectData contract.
 */

export type CalendarMonthSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  date: Date;
  selectedDateRangeArray: Date[];
};

/**
 * Defines the CalendarMonthNavigateData contract.
 */

export type CalendarMonthNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  date: Date;
  focusOnNavigatedDay: boolean;
};

/**
 * Defines the CalendarMonthHeaderSelectData contract.
 */

export type CalendarMonthHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>>;

/**
 * Defines the CalendarMonthProps contract.
 */

export type CalendarMonthProps = ComponentProps<Partial<CalendarMonthSlots>> & {
  /**
   * The currently navigated date
   */
  navigatedDate?: Date;

  /**
   * The date whose month is highlighted when `highlightSelectedMonth` is set, and whose year the
   * year picker opens on. Defaults to the Calendar's selected value.
   */
  selectedDate?: Date;

  /**
   * Callback issued when the year is navigated
   * @param date - The date that is navigated to
   * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
   */
  onNavigateDate?: EventHandler<CalendarMonthNavigateData>;

  /**
   * Callback function when the header is selected
   */
  onHeaderSelect?: EventHandler<CalendarMonthHeaderSelectData>;

  /**
   * Whether the year picker is hidden
   * @default false
   */
  yearPickerHidden?: boolean;
};

/**
 * Defines the CalendarMonthState contract.
 */

export type CalendarMonthState = ComponentState<CalendarMonthSlots> & {
  /**
   * When the year picker is open, CalendarMonth renders CalendarYear instead of its own grid.
   */
  isYearPickerVisible: boolean;

  yearPickerRef: React.RefObject<CalendarYearHandle | null>;

  headerIsClickable: boolean;

  isPrevYearInBounds: boolean;

  isNextYearInBounds: boolean;

  /**
   * Month cells grouped into rows of four.
   */
  monthRows: CalendarMonthCell[][];

  navigatedMonthRef: React.RefObject<HTMLButtonElement | null>;

  /**
   * The year the grid is showing, used to replay the row motions on navigation.
   */
  navigatedYear: number;

  /**
   * The formatted year shown in the header, also used as the grid's accessible name.
   */
  yearString: string;
};

/**
 * Row motion lives on CalendarMonthGridRow, so the base and styled layers share the same props.
 */
export type CalendarMonthBaseProps = CalendarMonthProps;

/**
 * Defines the CalendarMonthBaseState contract.
 */

export type CalendarMonthBaseState = CalendarMonthState;
