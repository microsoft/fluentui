import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, getRTL, getRTLSafeKeyCode, format, classNamesFunction } from '../../../Utilities';
import { DateRangeType } from '../../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray,
  getWeekNumbersInMonth,
  getMonthStart,
  getMonthEnd
} from '../../../utilities/dateMath/DateMath';
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { IProcessedStyleSet } from '@uifabric/styling';

const DAYS_IN_WEEK = 7;

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: () => void;
}

interface ICalendarDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

interface IWeekCorners {
  [key: string]: string;
}

export class CalendarDayBase extends BaseComponent<ICalendarDayProps, ICalendarDayState> {
  private navigatedDay: HTMLElement | null;
  private days: { [key: string]: HTMLElement | null } = {};

  public constructor(props: ICalendarDayProps) {
    super(props);

    this.state = {
      activeDescendantId: getId(),
      weeks: this._getWeeks(props)
    };

    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  public componentWillReceiveProps(nextProps: ICalendarDayProps): void {
    this.setState({
      weeks: this._getWeeks(nextProps)
    });
  }

  public render(): JSX.Element {
    const { activeDescendantId, weeks } = this.state;
    const {
      strings,
      navigatedDate,
      dateTimeFormatter,
      styles,
      theme,
      className,
      onHeaderSelect,
      dateRangeType,
      showWeekNumbers
    } = this.props;
    const dayPickerId = getId();
    const monthAndYearId = getId();

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      headerIsClickable: !!onHeaderSelect,
      dateRangeType: dateRangeType,
      showWeekNumbers: showWeekNumbers
    });

    return (
      <div
        className={classNames.root}
        id={dayPickerId}
      >
        <div className={classNames.header}>
          <button
            aria-live="polite"
            aria-relevant="text"
            aria-atomic="true"
            id={monthAndYearId}
            className={classNames.monthAndYear}
            onClick={this._onHeaderSelect}
            onKeyDown={this._onButtonKeyDown(this._onHeaderSelect)}>
            {dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
          </button>
          {this.renderMonthNavigationButtons(classNames, dayPickerId)}
        </div>
        <FocusZone>
          <table
            className={classNames.table}
            aria-readonly="true"
            aria-multiselectable="false"
            aria-labelledby={monthAndYearId}
            aria-activedescendant={activeDescendantId}
            role="grid"
          >
            <tbody>
              {this.renderMonthHeaderRow(classNames)}
              {weeks!.map((week, weekIndex) => this.renderWeekRow(classNames, week, weekIndex))}
            </tbody>
          </table>
        </FocusZone>
      </div>
    );
  }

  public focus() {
    if (this.navigatedDay) {
      this.navigatedDay.tabIndex = 0;
      this.navigatedDay.focus();
    }
  }

  private renderMonthNavigationButtons = (classNames: IProcessedStyleSet<ICalendarDayStyles>, dayPickerId: string): JSX.Element => {
    const { minDate, maxDate, navigatedDate, allFocusable, strings, navigationIcons, showCloseButton } = this.props;
    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;
    const closeNavigationIcon = navigationIcons.closeIcon;

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div className={classNames.monthComponents}>
        <button
          className={css(classNames.headerIconButton, {
            [classNames.disabledStyle]: !prevMonthInBounds
          })}
          disabled={!allFocusable && !prevMonthInBounds}
          aria-disabled={!prevMonthInBounds}
          onClick={prevMonthInBounds ? this._onSelectPrevMonth : undefined}
          onKeyDown={prevMonthInBounds ? this._onButtonKeyDown(this._onSelectPrevMonth) : undefined}
          aria-controls={dayPickerId}
          aria-label={
            strings.prevMonthAriaLabel
              ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
              : undefined
          }
          role="button"
        >
          <Icon iconName={leftNavigationIcon} />
        </button>
        <button
          className={css(classNames.headerIconButton, {
            [classNames.disabledStyle]: !nextMonthInBounds
          })}
          disabled={!allFocusable && !nextMonthInBounds}
          aria-disabled={!nextMonthInBounds}
          onClick={nextMonthInBounds ? this._onSelectNextMonth : undefined}
          onKeyDown={nextMonthInBounds ? this._onButtonKeyDown(this._onSelectNextMonth) : undefined}
          aria-controls={dayPickerId}
          aria-label={
            strings.nextMonthAriaLabel
              ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
              : undefined
          }
          role="button"
        >
          <Icon iconName={rightNavigationIcon} />
        </button>
        {showCloseButton && (
          <button
            className={css(classNames.headerIconButton)}
            onClick={this._onClose}
            onKeyDown={this._onButtonKeyDown(this._onClose)}
            aria-label={strings.closeButtonAriaLabel}
            role="button"
          >
            <Icon iconName={closeNavigationIcon} />
          </button>
        )}
      </div>);
  }

  private renderMonthHeaderRow = (classNames: IProcessedStyleSet<ICalendarDayStyles>): JSX.Element => {
    const { showWeekNumbers, strings, firstDayOfWeek, allFocusable } = this.props;
    return (
      <tr>
        {showWeekNumbers && <th className={classNames.dayCell} />}
        {strings.shortDays.map((val, index) => (
          <th
            className={classNames.dayCell}
            role="gridcell"
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
  }

  private renderWeekRow = (classNames: IProcessedStyleSet<ICalendarDayStyles>, week: IDayInfo[], weekIndex: number): JSX.Element => {
    const { showWeekNumbers, firstDayOfWeek, firstWeekOfYear, navigatedDate, strings } = this.props;
    const { weeks } = this.state;
    const weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;

    const titleString = weekNumbers
      ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
      : '';

    return (
      <tr key={weekNumbers ? weekNumbers[weekIndex] : weekIndex}>
        {showWeekNumbers &&
          weekNumbers && (
            <th
              className={classNames.weekNumberCell}
              key={weekIndex}
              title={titleString}
              aria-label={titleString}
              scope="row"
            >
              <span>{weekNumbers[weekIndex]}</span>
            </th>
          )}
        {week.map((day, dayIndex) => this.renderDayCells(classNames, day, dayIndex, weekIndex))}
      </tr>
    );
  }

  private renderDayCells = (
    classNames: IProcessedStyleSet<ICalendarDayStyles>,
    day: IDayInfo,
    dayIndex: number,
    weekIndex: number): JSX.Element => {
    const { navigatedDate, dateRangeType, dateTimeFormatter, allFocusable, strings } = this.props;
    const { activeDescendantId, weeks } = this.state;
    const isNavigatedDate = compareDates(navigatedDate, day.originalDate);

    // When the month is highlighted get the corner dates so that styles can be added to them
    const weekCorners: IWeekCorners = this._getWeekCornerStyles(classNames, weeks!, dateRangeType);

    return (
      <td
        key={day.key}
        className={css(
          classNames.dayCell,
          this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex),
          {
            [classNames.daySelected]: day.isSelected,
            [classNames.dayOutsideBounds]: !day.isInBounds,
            [classNames.dayOutsideNavigatedMonth]: !day.isInMonth
          }
        )}
        ref={element => this._setDayCellRef(element, day, isNavigatedDate)}
        role={'gridcell'}
        onClick={day.isInBounds ? day.onSelected : undefined}
        onMouseOver={this.onMouseOverDay(day)}
        onMouseDown={this.onMouseDownDay(day)}
        onMouseUp={this.onMouseUpDay(day)}
        onMouseOut={this.onMouseOutDay(day)}
      >
        <button
          key={day.key + 'button'}
          className={css(classNames.dayButton, {
            [classNames.dayIsToday]: day.isToday
          })}
          role={'button'}
          onKeyDown={this._onDayKeyDown(day.originalDate, weekIndex, dayIndex)}
          onClick={day.isInBounds ? day.onSelected : undefined}
          aria-label={dateTimeFormatter.formatMonthDayYear(day.originalDate, strings)}
          id={isNavigatedDate ? activeDescendantId : undefined}
          aria-selected={day.isInBounds ? day.isSelected : undefined}
          data-is-focusable={allFocusable || (day.isInBounds ? true : undefined)}
          ref={element => this._setDayRef(element, day, isNavigatedDate)}
          disabled={!allFocusable && !day.isInBounds}
          aria-disabled={!day.isInBounds}
        >
          <span aria-hidden="true">{dateTimeFormatter.formatDay(day.originalDate)}</span>
        </button>
      </td>
    );
  }

  private _setDayRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    if (isNavigatedDate) {
      this.navigatedDay = element;
    }
  }

  private _setDayCellRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    this.days[day.key] = element;
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number): void {
    const { minDate, maxDate } = this.props;
    let targetDate: Date | undefined = undefined;

    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      targetDate = addWeeks(date, -1);
    } else if (weekIndex === this.state.weeks!.length - 1 && ev.which === KeyCodes.down) {
      targetDate = addWeeks(date, 1);
    } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      targetDate = addDays(date, -1);
    } else if (dayIndex === DAYS_IN_WEEK - 1 && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      targetDate = addDays(date, 1);
    }

    // Don't navigate to out-of-bounds date
    if (
      targetDate &&
      (minDate ? compareDatePart(minDate, targetDate) < 1 : true) &&
      (maxDate ? compareDatePart(targetDate, maxDate) < 1 : true)
    ) {
      this.props.onNavigateDate(targetDate, true);
      ev.preventDefault();
    }
  }

  private _onDayKeyDown = (originalDate: Date, weekIndex: number, dayIndex: number): ((ev: React.KeyboardEvent<HTMLElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
        this._onSelectDate(originalDate);
      } else {
        this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
      }
    };
  };

  private _onSelectDate = (selectedDate: Date): void => {
    const {
      onSelectDate,
      dateRangeType,
      firstDayOfWeek,
      minDate,
      maxDate,
      workWeekDays
    } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
    if (dateRangeType !== DateRangeType.Day) {
      dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
    }

    if (onSelectDate) {
      onSelectDate(selectedDate, dateRange);
    }
  };

  private _onSelectNextMonth = (): void => {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  };

  private _onSelectPrevMonth = (): void => {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  };

  private _onClose = (): void => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  private _onHeaderSelect = (): void => {
    if (this.props.onHeaderSelect) {
      this.props.onHeaderSelect();
    }
  };

  private _onButtonKeyDown = (callback: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (ev.which) {
        case KeyCodes.enter:
        case KeyCodes.space:
          callback();
          break;
      }
    };
  };

  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects during callbacks.
   */
  private _getWeeks(propsToUse: ICalendarDayProps): IDayInfo[][] {
    const {
      navigatedDate,
      selectedDate,
      dateRangeType,
      firstDayOfWeek,
      today,
      minDate,
      maxDate,
      showSixWeeksByDefault,
      workWeekDays
    } = propsToUse;
    const date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
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
          isInBounds: (minDate ? compareDatePart(minDate, date) < 1 : true) && (maxDate ? compareDatePart(date, maxDate) < 1 : true)
        };

        week.push(dayInfo);

        if (dayInfo.isInMonth) {
          isAllDaysOfWeekOutOfMonth = false;
        }

        date.setDate(date.getDate() + 1);
      }

      // We append the condition of the loop depending upon the showSixWeeksByDefault prop.
      shouldGetWeeks = showSixWeeksByDefault ? !isAllDaysOfWeekOutOfMonth || weekIndex <= 5 : !isAllDaysOfWeekOutOfMonth;
      if (shouldGetWeeks) {
        weeks.push(week);
      }
    }

    return weeks;
  }

  private _getBoundedDateRange(dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] {
    let boundedDateRange = [...dateRange];
    if (minDate) {
      boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, minDate as Date) >= 0);
    }
    if (maxDate) {
      boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, maxDate as Date) <= 0);
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

  private _getWeekCornerStyles(classNames: IProcessedStyleSet<ICalendarDayStyles>, weeks: IDayInfo[][], dateRangeType: DateRangeType): IWeekCorners {
    const weekCornersStyled: any = {};
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
          this.isInSameRange(weeks[weekIndex - 1][dayIndex].originalDate, weeks[weekIndex][dayIndex].originalDate);
        const below =
          weeks[weekIndex + 1] &&
          weeks[weekIndex + 1][dayIndex] &&
          this.isInSameRange(weeks[weekIndex + 1][dayIndex].originalDate, weeks[weekIndex][dayIndex].originalDate);
        const left =
          weeks[weekIndex][dayIndex - 1] &&
          this.isInSameRange(weeks[weekIndex][dayIndex - 1].originalDate, weeks[weekIndex][dayIndex].originalDate);
        const right =
          weeks[weekIndex][dayIndex + 1] &&
          this.isInSameRange(weeks[weekIndex][dayIndex + 1].originalDate, weeks[weekIndex][dayIndex].originalDate);

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

  private isInSameRange = (date1: Date, date2: Date): boolean => {
    const { dateRangeType, firstDayOfWeek, workWeekDays } = this.props;
    let dateRange = getDateRangeArray(date1, dateRangeType, firstDayOfWeek, workWeekDays);

    return dateRange.filter(date => date.getTime() == date2.getTime()).length > 0;
  }

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

    // gets all the dates for the given date range type that are in the same date range as the given day
    let dateRange = getDateRangeArray(day.originalDate, dateRangeType, firstDayOfWeek, workWeekDays).map(date => date.getTime());

    // gets all the day refs for the given dates
    let dayInfosInRange = weeks!.reduce((accumulatedValue: IDayInfo[], currentWeek: IDayInfo[]) => {
      return accumulatedValue.concat(currentWeek.filter(day => dateRange.includes(day.originalDate.getTime())));
    }, []);

    let dayRefs: (HTMLElement | null)[] = [];
    if (this.days) {
      dayRefs = dayInfosInRange.map(dayInfo => this.days[dayInfo.key]);
    }

    return dayRefs;
  }

  private onMouseOverDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      let dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach(dayRef => {
        if (dayRef) {
          dayRef.classList.add('ms-CalendarDay-hoverStyle');
        }
      })
    }
  }

  private onMouseDownDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      let dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach(dayRef => {
        if (dayRef) {
          dayRef.classList.add('ms-CalendarDay-pressedStyle');
        }
      })
    }
  }

  private onMouseUpDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      let dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach(dayRef => {
        if (dayRef) {
          dayRef.classList.remove('ms-CalendarDay-pressedStyle');
        }
      })
    }
  }

  private onMouseOutDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      let dayRefs = this.getRefsInRangeOfDay(day);

      dayRefs.forEach(dayRef => {
        if (dayRef) {
          dayRef.classList.remove('ms-CalendarDay-hoverStyle');
          dayRef.classList.remove('ms-CalendarDay-pressedStyle');
        }
      })
    }
  }
}
