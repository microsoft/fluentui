import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, getRTL, getRTLSafeKeyCode, format, classNamesFunction, find } from '@uifabric/utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  addDays,
  addWeeks,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray,
  getWeekNumbersInMonth
} from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { ICalendarDayGridProps, ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import { IProcessedStyleSet } from '@uifabric/styling';
import { DateRangeType } from '../Calendar/Calendar.types';

const DAYS_IN_WEEK = 7;

const getClassNames = classNamesFunction<ICalendarDayGridStyleProps, ICalendarDayGridStyles>();

interface IWeekCorners {
  [key: string]: string;
}

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: () => void;
}

export interface ICalendarDayGridState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

export class CalendarDayGridBase extends BaseComponent<ICalendarDayGridProps, ICalendarDayGridState> {
  private navigatedDay: HTMLElement | null;
  private days: { [key: string]: HTMLElement | null } = {};

  public constructor(props: ICalendarDayGridProps) {
    super(props);

    this.state = {
      activeDescendantId: getId(),
      weeks: this._getWeeks(props)
    };

    this._onClose = this._onClose.bind(this);
  }

  public componentWillReceiveProps(nextProps: ICalendarDayGridProps): void {
    this.setState({
      weeks: this._getWeeks(nextProps)
    });
  }

  public render(): JSX.Element {
    const { activeDescendantId, weeks } = this.state;
    const { styles, theme, className, dateRangeType, showWeekNumbers, labelledBy, lightenDaysOutsideNavigatedMonth } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      dateRangeType: dateRangeType,
      showWeekNumbers: showWeekNumbers,
      lightenDaysOutsideNavigatedMonth: lightenDaysOutsideNavigatedMonth === undefined ? true : lightenDaysOutsideNavigatedMonth
    });

    return (
      <FocusZone>
        <table
          className={classNames.table}
          aria-readonly="true"
          aria-multiselectable="false"
          aria-labelledby={labelledBy}
          aria-activedescendant={activeDescendantId}
          role="grid"
        >
          <tbody>
            {this.renderMonthHeaderRow(classNames)}
            {weeks!.map((week: IDayInfo[], weekIndex: number) => this.renderWeekRow(classNames, week, weekIndex))}
          </tbody>
        </table>
      </FocusZone>
    );
  }

  public focus(): void {
    if (this.navigatedDay) {
      this.navigatedDay.tabIndex = 0;
      this.navigatedDay.focus();
    }
  }

  private renderMonthHeaderRow = (classNames: IProcessedStyleSet<ICalendarDayGridStyles>): JSX.Element => {
    const { showWeekNumbers, strings, firstDayOfWeek, allFocusable } = this.props;
    return (
      <tr>
        {showWeekNumbers && <th className={classNames.dayCell} />}
        {strings.shortDays.map((val: string, index: number) => (
          <th
            className={classNames.dayCell}
            scope="col"
            key={index}
            title={strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK]}
            aria-label={strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK]}
            data-is-focusable={allFocusable ? true : undefined}
          >
            {strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK]}
          </th>
        ))}
      </tr>
    );
  };

  private renderWeekRow = (classNames: IProcessedStyleSet<ICalendarDayGridStyles>, week: IDayInfo[], weekIndex: number): JSX.Element => {
    const { showWeekNumbers, firstDayOfWeek, firstWeekOfYear, navigatedDate, strings } = this.props;
    const { weeks } = this.state;
    const weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;

    const titleString = weekNumbers ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex]) : '';

    return (
      <tr key={weekNumbers ? weekNumbers[weekIndex] : weekIndex}>
        {showWeekNumbers && weekNumbers && (
          <th className={classNames.weekNumberCell} key={weekIndex} title={titleString} aria-label={titleString} scope="row">
            <span>{weekNumbers[weekIndex]}</span>
          </th>
        )}
        {week.map((day: IDayInfo, dayIndex: number) => this.renderDayCells(classNames, day, dayIndex, weekIndex))}
      </tr>
    );
  };

  private renderDayCells = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    day: IDayInfo,
    dayIndex: number,
    weekIndex: number
  ): JSX.Element => {
    const { navigatedDate, dateTimeFormatter, allFocusable, strings } = this.props;
    const { activeDescendantId, weeks } = this.state;
    const isNavigatedDate = compareDates(navigatedDate, day.originalDate);

    // When the month is highlighted get the corner dates so that styles can be added to them
    const weekCorners: IWeekCorners = this._getWeekCornerStyles(classNames, weeks!);

    return (
      <td
        key={day.key}
        className={css(
          classNames.dayCell,
          this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex),
          day.isSelected && classNames.daySelected,
          !day.isInBounds && classNames.dayOutsideBounds,
          !day.isInMonth && classNames.dayOutsideNavigatedMonth
        )}
        ref={(element: HTMLTableCellElement) => this._setDayCellRef(element, day, isNavigatedDate)}
        onClick={day.isInBounds ? day.onSelected : undefined}
        onMouseOver={this.onMouseOverDay(day)}
        onMouseDown={this.onMouseDownDay(day)}
        onMouseUp={this.onMouseUpDay(day)}
        onMouseOut={this.onMouseOutDay(day)}
      >
        <button
          key={day.key + 'button'}
          className={css(classNames.dayButton, day.isToday && classNames.dayIsToday)}
          onKeyDown={this._onDayKeyDown(day.originalDate, weekIndex, dayIndex)}
          aria-label={dateTimeFormatter.formatMonthDayYear(day.originalDate, strings)}
          id={isNavigatedDate ? activeDescendantId : undefined}
          aria-selected={day.isInBounds ? day.isSelected : undefined}
          data-is-focusable={allFocusable || (day.isInBounds ? true : undefined)}
          ref={(element: HTMLButtonElement) => this._setDayRef(element, day, isNavigatedDate)}
          disabled={!allFocusable && !day.isInBounds}
          aria-disabled={!day.isInBounds}
          type="button"
          role="gridcell" // create grid structure
          aria-readonly={true} // prevent grid from being "editable"
        >
          <span aria-hidden="true">{dateTimeFormatter.formatDay(day.originalDate)}</span>
        </button>
      </td>
    );
  };

  private _setDayRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    if (isNavigatedDate) {
      this.navigatedDay = element;
    }
  }

  private _setDayCellRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    this.days[day.key] = element;
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number): void {
    let targetDate: Date | undefined = undefined;
    let direction = 1; // by default search forward

    if (ev.which === KeyCodes.up) {
      targetDate = addWeeks(date, -1);
      direction = -1;
    } else if (ev.which === KeyCodes.down) {
      targetDate = addWeeks(date, 1);
    } else if (ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      targetDate = addDays(date, -1);
      direction = -1;
    } else if (ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      targetDate = addDays(date, 1);
    }

    if (!targetDate) {
      // if we couldn't find a target date at all, do nothing
      return;
    }

    // target date is restricted, search in whatever direction until finding the next possible date, stopping at boundaries
    let nextDate = this._findAvailableDate(date, targetDate, direction);

    if (!nextDate) {
      // if no dates available in initial direction, try going backwards
      nextDate = this._findAvailableDate(date, targetDate, -direction);
    }

    // if the nextDate is still inside the same focusZone area, let the focusZone handle setting the focus so we don't jump
    // the view unnecessarily
    const isInCurrentView =
      this.state.weeks &&
      nextDate &&
      this.state.weeks.some((week: IDayInfo[]) => {
        return week.some((day: IDayInfo) => {
          return compareDates(day.originalDate, nextDate!);
        });
      });
    if (isInCurrentView) {
      return;
    }

    // else, fire navigation on the date to change the view to show it
    if (nextDate) {
      this.props.onNavigateDate(nextDate, true);
      ev.preventDefault();
    }
  }

  private _findAvailableDate(initialDate: Date, targetDate: Date, direction: number): Date | undefined {
    // if the target date is available, return it immediately
    if (!this._getIsRestrictedDate(targetDate)) {
      return targetDate;
    }

    while (
      compareDatePart(initialDate, targetDate) !== 0 &&
      this._getIsRestrictedDate(targetDate) &&
      !this._getIsAfterMaxDate(targetDate) &&
      !this._getIsBeforeMinDate(targetDate)
    ) {
      targetDate = addDays(targetDate, direction);
    }

    if (compareDatePart(initialDate, targetDate) !== 0 && !this._getIsRestrictedDate(targetDate)) {
      return targetDate;
    }

    return undefined;
  }

  private _onDayKeyDown = (originalDate: Date, weekIndex: number, dayIndex: number): ((ev: React.KeyboardEvent<HTMLElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.which === KeyCodes.enter) {
        this._onSelectDate(originalDate);
      } else {
        this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
      }
    };
  };

  private _onSelectDate = (selectedDate: Date): void => {
    const { onSelectDate, onNavigateDate, dateRangeType, firstDayOfWeek, minDate, maxDate, workWeekDays } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
    if (dateRangeType !== DateRangeType.Day) {
      dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
    }
    dateRange = dateRange.filter((d: Date) => {
      return !this._getIsRestrictedDate(d);
    });

    if (onSelectDate) {
      onSelectDate(selectedDate, dateRange);
    }

    if (onNavigateDate) {
      onNavigateDate(selectedDate, true);
    }
  };

  private _onClose = (): void => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects during callbacks.
   */
  private _getWeeks(propsToUse: ICalendarDayGridProps): IDayInfo[][] {
    const { navigatedDate, selectedDate, dateRangeType, firstDayOfWeek, today, minDate, maxDate, weeksToShow, workWeekDays } = propsToUse;

    let date;
    if (weeksToShow && weeksToShow <= 4) {
      // if showing less than a full month, just use date == navigatedDate
      date = new Date(navigatedDate.toString());
    } else {
      date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
    }
    const todaysDate = today || new Date();
    const weeks: IDayInfo[][] = [];

    // Cycle the date backwards to get to the first day of the week.
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }

    // a flag to indicate whether all days of the week are outside the month
    let isAllDaysOfWeekOutOfMonth = false;

    // in work week view we want to select the whole week
    const selectedDateRangeType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;
    let selectedDates = getDateRangeArray(selectedDate, selectedDateRangeType, firstDayOfWeek, workWeekDays);
    if (dateRangeType !== DateRangeType.Day) {
      selectedDates = this._getBoundedDateRange(selectedDates, minDate, maxDate);
    }

    let shouldGetWeeks = true;

    for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
      const week: IDayInfo[] = [];

      isAllDaysOfWeekOutOfMonth = true;

      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const originalDate = new Date(date.toString());
        const dayInfo: IDayInfo = {
          key: date.toString(),
          date: date.getDate().toString(),
          originalDate: originalDate,
          isInMonth: date.getMonth() === navigatedDate.getMonth(),
          isToday: compareDates(todaysDate, date),
          isSelected: isInDateRangeArray(date, selectedDates),
          onSelected: this._onSelectDate.bind(this, originalDate),
          isInBounds: !this._getIsRestrictedDate(date)
        };

        week.push(dayInfo);

        if (dayInfo.isInMonth) {
          isAllDaysOfWeekOutOfMonth = false;
        }

        date.setDate(date.getDate() + 1);
      }

      // We append the condition of the loop depending upon the showSixWeeksByDefault prop.
      shouldGetWeeks = weeksToShow ? weekIndex < weeksToShow : !isAllDaysOfWeekOutOfMonth;
      if (shouldGetWeeks) {
        weeks.push(week);
      }
    }

    return weeks;
  }

  private _getIsRestrictedDate(date: Date): boolean {
    const { restrictedDates, minDate, maxDate } = this.props;
    if (!restrictedDates && !minDate && !maxDate) {
      return false;
    }
    const inRestrictedDates =
      restrictedDates &&
      !!find(restrictedDates, (rd: Date) => {
        return compareDates(rd, date);
      });
    return inRestrictedDates || this._getIsBeforeMinDate(date) || this._getIsAfterMaxDate(date);
  }

  private _getIsBeforeMinDate(date: Date): boolean {
    const { minDate } = this.props;
    return minDate ? compareDatePart(minDate, date) >= 1 : false;
  }

  private _getIsAfterMaxDate(date: Date): boolean {
    const { maxDate } = this.props;
    return maxDate ? compareDatePart(date, maxDate) >= 1 : false;
  }

  private _getBoundedDateRange(dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] {
    let boundedDateRange = [...dateRange];
    if (minDate) {
      boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, minDate as Date) >= 0);
    }
    if (maxDate) {
      boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, maxDate as Date) <= 0);
    }
    return boundedDateRange;
  }

  /**
   *
   * Section for setting the rounded corner styles on individual day cells. Individual day cells need different
   * corners to be rounded depending on which date range type and where the cell is located in the current grid.
   * If we just round all of the corners, there isn't a good overlap and we get gaps between contiguous day boxes
   * in Edge browser.
   *
   */

  private _getWeekCornerStyles(classNames: IProcessedStyleSet<ICalendarDayGridStyles>, weeks: IDayInfo[][]): IWeekCorners {
    const weekCornersStyled: { [key: string]: string } = {};
    /* need to handle setting all of the corners on arbitrarily shaped blobs
          __
       __|A |
      |B |C |__
      |D |E |F |

      in this case, A needs top left rounded, top right rounded
      B needs top left rounded
      C doesn't need any rounding
      D needs bottom left rounded
      E doesn't need any rounding
      F needs top right rounding
    */

    // if there's an item above, lose both top corners. Item below, lose both bottom corners, etc.
    weeks.forEach((week: IDayInfo[], weekIndex: number) => {
      week.forEach((day: IDayInfo, dayIndex: number) => {
        const above =
          weeks[weekIndex - 1] &&
          weeks[weekIndex - 1][dayIndex] &&
          this.isInSameHoverRange(weeks[weekIndex - 1][dayIndex].originalDate, weeks[weekIndex][dayIndex].originalDate);
        const below =
          weeks[weekIndex + 1] &&
          weeks[weekIndex + 1][dayIndex] &&
          this.isInSameHoverRange(weeks[weekIndex + 1][dayIndex].originalDate, weeks[weekIndex][dayIndex].originalDate);
        const left =
          weeks[weekIndex][dayIndex - 1] &&
          this.isInSameHoverRange(weeks[weekIndex][dayIndex - 1].originalDate, weeks[weekIndex][dayIndex].originalDate);
        const right =
          weeks[weekIndex][dayIndex + 1] &&
          this.isInSameHoverRange(weeks[weekIndex][dayIndex + 1].originalDate, weeks[weekIndex][dayIndex].originalDate);

        const roundedTopLeft = !above && !left;
        const roundedTopRight = !above && !right;
        const roundedBottomLeft = !below && !left;
        const roundedBottomRight = !below && !right;

        let style = '';
        if (roundedTopLeft) {
          style = getRTL() ? style.concat(classNames.topRightCornerDate + ' ') : style.concat(classNames.topLeftCornerDate + ' ');
        }
        if (roundedTopRight) {
          style = getRTL() ? style.concat(classNames.topLeftCornerDate + ' ') : style.concat(classNames.topRightCornerDate + ' ');
        }
        if (roundedBottomLeft) {
          style = getRTL() ? style.concat(classNames.bottomRightCornerDate + ' ') : style.concat(classNames.bottomLeftCornerDate + ' ');
        }
        if (roundedBottomRight) {
          style = getRTL() ? style.concat(classNames.bottomLeftCornerDate + ' ') : style.concat(classNames.bottomRightCornerDate + ' ');
        }

        weekCornersStyled[weekIndex + '_' + dayIndex] = style;
      });
    });

    return weekCornersStyled;
  }

  private isInSameHoverRange = (date1: Date, date2: Date): boolean => {
    const { dateRangeType, firstDayOfWeek, workWeekDays } = this.props;

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;

    const dateRange = getDateRangeArray(date1, dateRangeHoverType, firstDayOfWeek, workWeekDays);

    return dateRange.filter((date: Date) => date.getTime() === date2.getTime()).length > 0;
  };

  private _getHighlightedCornerStyle(weekCorners: IWeekCorners, dayIndex: number, weekIndex: number): string {
    const cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';
    return cornerStyle;
  }

  /**
   *
   * Section for setting hover/pressed styles. Because we want arbitrary blobs of days to be selectable, to support
   * highlighting every day in the month for month view, css :hover style isn't enough, so we need mouse callbacks
   * to set classnames on all relevant child refs to apply the styling
   *
   */

  private getRefsInRangeOfDay = (day: IDayInfo) => {
    const { weeks } = this.state;
    const { dateRangeType, firstDayOfWeek, workWeekDays } = this.props;

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;

    // gets all the dates for the given date range type that are in the same date range as the given day
    const dateRange = getDateRangeArray(day.originalDate, dateRangeHoverType, firstDayOfWeek, workWeekDays).map((date: Date) =>
      date.getTime()
    );

    // gets all the day refs for the given dates
    const dayInfosInRange = weeks!.reduce((accumulatedValue: IDayInfo[], currentWeek: IDayInfo[]) => {
      return accumulatedValue.concat(currentWeek.filter((weekDay: IDayInfo) => dateRange.indexOf(weekDay.originalDate.getTime()) !== -1));
    }, []);

    let dayRefs: (HTMLElement | null)[] = [];
    if (this.days) {
      dayRefs = dayInfosInRange.map((dayInfo: IDayInfo) => this.days[dayInfo.key]);
    }

    return dayRefs;
  };

  private onMouseOverDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach((dayRef: HTMLElement) => {
        if (dayRef) {
          dayRef.classList.add('ms-CalendarDay-hoverStyle');
        }
      });
    };
  };

  private onMouseDownDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach((dayRef: HTMLElement) => {
        if (dayRef) {
          dayRef.classList.add('ms-CalendarDay-pressedStyle');
        }
      });
    };
  };

  private onMouseUpDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach((dayRef: HTMLElement) => {
        if (dayRef) {
          dayRef.classList.remove('ms-CalendarDay-pressedStyle');
        }
      });
    };
  };

  private onMouseOutDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach((dayRef: HTMLElement) => {
        if (dayRef) {
          dayRef.classList.remove('ms-CalendarDay-hoverStyle');
          dayRef.classList.remove('ms-CalendarDay-pressedStyle');
        }
      });
    };
  };
}
