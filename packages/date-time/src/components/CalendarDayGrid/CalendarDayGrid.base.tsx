import * as React from 'react';
import {
  KeyCodes,
  css,
  getRTL,
  getRTLSafeKeyCode,
  format,
  classNamesFunction,
  findIndex,
  initializeComponentRef,
} from '@uifabric/utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  addDays,
  addWeeks,
  compareDates,
  getDateRangeArray,
  getWeekNumbersInMonth,
  getDayGrid,
  getBoundedDateRange,
  findAvailableDate,
  isRestrictedDate,
  IDay,
  IAvailableDateOptions,
  DAYS_IN_WEEK,
} from '@fluentui/date-time-utilities';
import { ICalendarDayGridProps, ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import { IProcessedStyleSet } from '@uifabric/styling';
import { DateRangeType, DayOfWeek } from '../Calendar/Calendar.types';
import { usePrevious, useId } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<ICalendarDayGridStyleProps, ICalendarDayGridStyles>();

interface IWeekCorners {
  [key: string]: string;
}

export interface IDayInfo extends IDay {
  onSelected: () => void;
}

function useWeeks(props: ICalendarDayGridProps, onSelectDate: (date: Date) => void): IDayInfo[][] {
  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects in callbacks.
   */
  const weeks = React.useMemo((): IDayInfo[][] => {
    const weeksGrid = getDayGrid(props);

    /**
     * Weeks is a 2D array. Weeks[0] contains the last week of the prior range,
     * Weeks[weeks.length - 1] contains first week of next range. These are for transition states.
     *
     * Weeks[1... weeks.length - 2] contains the actual visible data
     */
    const returnValue: IDayInfo[][] = [];

    for (let weekIndex = 0; weekIndex < weeksGrid.length; weekIndex++) {
      const week: IDayInfo[] = [];
      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const day = weeksGrid[weekIndex][dayIndex];
        const dayInfo: IDayInfo = {
          onSelected: () => onSelectDate(day.originalDate),
          ...day,
        };

        week.push(dayInfo);
      }
      returnValue.push(week);
    }

    return returnValue;
  }, [props]);

  return weeks;
}

/**
 * Hook to determine whether to animate the CalendarDayGrid forwards or backwards
 * @returns true if the grid should animate backwards; false otherwise
 */
function useAnimateBackwards(weeks: IDayInfo[][]): boolean {
  const previousNavigatedDate = usePrevious(weeks[0][0].originalDate);

  if (!previousNavigatedDate || previousNavigatedDate <= weeks[0][0].originalDate) {
    return false;
  } else {
    return true;
  }
}

export const CalendarDayGridBase = React.forwardRef(
  (props: ICalendarDayGridProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const navigatedDayRef = React.useRef<HTMLButtonElement>(null);

    const activeDescendantId = useId();

    const onSelectDate = (selectedDate: Date): void => {
      const {
        dateRangeType,
        firstDayOfWeek,
        minDate,
        maxDate,
        workWeekDays,
        daysToSelectInDayView,
        restrictedDates,
      } = props;
      const restrictedDatesOptions = { minDate, maxDate, restrictedDates };

      let dateRange = getDateRangeArray(
        selectedDate,
        dateRangeType,
        firstDayOfWeek,
        workWeekDays,
        daysToSelectInDayView,
      );
      dateRange = getBoundedDateRange(dateRange, minDate, maxDate);

      dateRange = dateRange.filter((d: Date) => {
        return !isRestrictedDate(d, restrictedDatesOptions);
      });

      props.onSelectDate?.(selectedDate, dateRange);
      props.onNavigateDate?.(selectedDate, true);
    };

    const weeks = useWeeks(props, onSelectDate);
    const animateBackwards = useAnimateBackwards(weeks);

    return (
      <CalendarDayGridBaseClass
        {...props}
        hoisted={{ animateBackwards, navigatedDayRef, weeks, onSelectDate, activeDescendantId }}
      />
    );
  },
);
CalendarDayGridBase.displayName = 'CalendarDayGridBase';

interface ICalendarDayGridClassProps extends ICalendarDayGridProps {
  hoisted: {
    animateBackwards: boolean;
    navigatedDayRef: React.RefObject<HTMLButtonElement>;
    weeks: IDayInfo[][];
    activeDescendantId: string;
    onSelectDate(date: Date): void;
  };
}

class CalendarDayGridBaseClass extends React.Component<ICalendarDayGridClassProps, {}> {
  private days: { [key: string]: HTMLElement | null } = {};
  private classNames: IProcessedStyleSet<ICalendarDayGridStyles>;

  public constructor(props: ICalendarDayGridClassProps) {
    super(props);

    initializeComponentRef(this);

    this._onClose = this._onClose.bind(this);
  }

  public render(): JSX.Element {
    const {
      styles,
      theme,
      className,
      dateRangeType,
      showWeekNumbers,
      labelledBy,
      lightenDaysOutsideNavigatedMonth,
      animationDirection,
      hoisted: { animateBackwards, weeks, activeDescendantId },
    } = this.props;

    this.classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      dateRangeType: dateRangeType,
      showWeekNumbers: showWeekNumbers,
      lightenDaysOutsideNavigatedMonth:
        lightenDaysOutsideNavigatedMonth === undefined ? true : lightenDaysOutsideNavigatedMonth,
      animationDirection: animationDirection,
      animateBackwards: animateBackwards,
    });
    const classNames = this.classNames;

    // When the month is highlighted get the corner dates so that styles can be added to them
    const weekCorners: IWeekCorners = this._getWeekCornerStyles(classNames, weeks!);

    return (
      <FocusZone className={classNames.wrapper}>
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
            {this.renderRow(
              classNames,
              weeks![0],
              -1,
              weekCorners,
              classNames.firstTransitionWeek,
              'presentation',
              true /*aria-hidden*/,
            )}
            {weeks!
              .slice(1, weeks!.length - 1)
              .map((week: IDayInfo[], weekIndex: number) =>
                this.renderRow(classNames, week, weekIndex, weekCorners, classNames.weekRow),
              )}
            {this.renderRow(
              classNames,
              weeks![weeks!.length - 1],
              -2,
              weekCorners,
              classNames.lastTransitionWeek,
              'presentation',
              true /*aria-hidden*/,
            )}
          </tbody>
        </table>
      </FocusZone>
    );
  }

  public focus(): void {
    this.props.hoisted.navigatedDayRef.current?.focus();
  }

  private renderMonthHeaderRow = (classNames: IProcessedStyleSet<ICalendarDayGridStyles>): JSX.Element => {
    const {
      showWeekNumbers,
      strings,
      firstDayOfWeek,
      allFocusable,
      weeksToShow,
      hoisted: { weeks },
    } = this.props;
    const dayLabels = strings.shortDays.slice();
    const firstOfMonthIndex = findIndex(weeks![1], (day: IDayInfo) => day.originalDate.getDate() === 1);
    if (weeksToShow === 1 && firstOfMonthIndex >= 0) {
      // if we only show one week, replace the header with short month name
      dayLabels[firstOfMonthIndex] = strings.shortMonths[weeks![1][firstOfMonthIndex].originalDate.getMonth()];
    }

    return (
      <tr>
        {showWeekNumbers && <th className={classNames.dayCell} />}
        {dayLabels.map((val: string, index: number) => {
          const i = (index + firstDayOfWeek) % DAYS_IN_WEEK;
          const label = index === firstOfMonthIndex ? strings.days[i] + ' ' + dayLabels[i] : strings.days[i];
          return (
            <th
              className={css(classNames.dayCell, classNames.weekDayLabelCell)}
              scope="col"
              key={dayLabels[i] + ' ' + index}
              title={label}
              aria-label={label}
              data-is-focusable={allFocusable ? true : undefined}
            >
              {dayLabels[i]}
            </th>
          );
        })}
      </tr>
    );
  };

  private renderRow = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    week: IDayInfo[],
    weekIndex: number,
    weekCorners?: IWeekCorners,
    rowClassName?: string,
    ariaRole?: string,
    ariaHidden?: boolean,
  ): JSX.Element => {
    const {
      showWeekNumbers,
      firstDayOfWeek,
      firstWeekOfYear,
      navigatedDate,
      strings,
      hoisted: { weeks },
    } = this.props;
    const weekNumbers = showWeekNumbers
      ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate)
      : null;

    const titleString = weekNumbers
      ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
      : '';

    return (
      <tr role={ariaRole} className={rowClassName} key={weekIndex + '_' + week[0].key}>
        {showWeekNumbers && weekNumbers && (
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
        {week.map((day: IDayInfo, dayIndex: number) =>
          this.renderDayCells(classNames, day, dayIndex, weekIndex, weekCorners, ariaHidden),
        )}
      </tr>
    );
  };

  private renderDayCells = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    day: IDayInfo,
    dayIndex: number,
    weekIndex: number,
    weekCorners?: IWeekCorners,
    ariaHidden?: boolean,
  ): JSX.Element => {
    const {
      navigatedDate,
      dateTimeFormatter,
      allFocusable,
      strings,
      hoisted: { activeDescendantId },
    } = this.props;
    const isNavigatedDate = compareDates(navigatedDate, day.originalDate);

    return (
      <td
        key={day.key}
        className={css(
          classNames.dayCell,
          weekCorners && this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex),
          day.isSelected && classNames.daySelected,
          !day.isInBounds && classNames.dayOutsideBounds,
          !day.isInMonth && classNames.dayOutsideNavigatedMonth,
        )}
        ref={(element: HTMLTableCellElement) => {
          this.props.customDayCellRef && this.props.customDayCellRef(element, day.originalDate, classNames);
          this._setDayCellRef(element, day, isNavigatedDate);
        }}
        aria-hidden={ariaHidden}
        onClick={day.isInBounds && !ariaHidden ? day.onSelected : undefined}
        onMouseOver={!ariaHidden ? this.onMouseOverDay(day) : undefined}
        onMouseDown={!ariaHidden ? this.onMouseDownDay(day) : undefined}
        onMouseUp={!ariaHidden ? this.onMouseUpDay(day) : undefined}
        onMouseOut={!ariaHidden ? this.onMouseOutDay(day) : undefined}
      >
        <button
          key={day.key + 'button'}
          aria-hidden={ariaHidden}
          className={css(classNames.dayButton, day.isToday && classNames.dayIsToday)}
          onKeyDown={!ariaHidden ? this._onDayKeyDown(day.originalDate, weekIndex, dayIndex) : undefined}
          aria-label={dateTimeFormatter.formatMonthDayYear(day.originalDate, strings)}
          id={isNavigatedDate ? activeDescendantId : undefined}
          aria-selected={day.isInBounds ? day.isSelected : undefined}
          data-is-focusable={!ariaHidden && (allFocusable || (day.isInBounds ? true : undefined))}
          ref={isNavigatedDate ? this.props.hoisted.navigatedDayRef : undefined}
          disabled={!allFocusable && !day.isInBounds}
          aria-disabled={!ariaHidden && !day.isInBounds}
          type="button"
          role="gridcell" // create grid structure
          aria-readonly={true} // prevent grid from being "editable"
          tabIndex={isNavigatedDate ? 0 : undefined}
        >
          <span aria-hidden="true">{dateTimeFormatter.formatDay(day.originalDate)}</span>
        </button>
      </td>
    );
  };

  private _setDayCellRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    this.days[day.key] = element;
  }

  private _navigateMonthEdge(
    ev: React.KeyboardEvent<HTMLElement>,
    date: Date,
    weekIndex: number,
    dayIndex: number,
  ): void {
    let targetDate: Date | undefined = undefined;
    let direction = 1; // by default search forward
    const { restrictedDates, minDate, maxDate } = this.props;

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

    const findAvailableDateOptions: IAvailableDateOptions = {
      initialDate: date,
      targetDate,
      direction,
      restrictedDates,
      minDate,
      maxDate,
    };

    // target date is restricted, search in whatever direction until finding the next possible date,
    // stopping at boundaries
    let nextDate = findAvailableDate(findAvailableDateOptions);

    if (!nextDate) {
      // if no dates available in initial direction, try going backwards
      findAvailableDateOptions.direction = -direction;
      nextDate = findAvailableDate(findAvailableDateOptions);
    }

    // if the nextDate is still inside the same focusZone area, let the focusZone handle setting the focus so we
    // don't jump the view unnecessarily
    const isInCurrentView =
      this.props.hoisted.weeks &&
      nextDate &&
      this.props.hoisted.weeks.slice(1, this.props.hoisted.weeks.length - 1).some((week: IDayInfo[]) => {
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

  private _onDayKeyDown = (
    originalDate: Date,
    weekIndex: number,
    dayIndex: number,
  ): ((ev: React.KeyboardEvent<HTMLElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.which === KeyCodes.enter) {
        this.props.hoisted.onSelectDate(originalDate);
      } else {
        this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
      }
    };
  };

  private _onClose = (): void => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  /**
   *
   * Section for setting the rounded corner styles on individual day cells. Individual day cells need different
   * corners to be rounded depending on which date range type and where the cell is located in the current grid.
   * If we just round all of the corners, there isn't a good overlap and we get gaps between contiguous day boxes
   * in Edge browser.
   *
   */

  private _getWeekCornerStyles(
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    initialWeeks: IDayInfo[][],
  ): IWeekCorners {
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

    // cut off the animation transition weeks
    const weeks = initialWeeks.slice(1, initialWeeks.length - 1);

    // if there's an item above, lose both top corners. Item below, lose both bottom corners, etc.
    weeks.forEach((week: IDayInfo[], weekIndex: number) => {
      week.forEach((day: IDayInfo, dayIndex: number) => {
        const above =
          weeks[weekIndex - 1] &&
          weeks[weekIndex - 1][dayIndex] &&
          this.isInSameHoverRange(
            weeks[weekIndex - 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex - 1][dayIndex].isSelected,
            day.isSelected,
          );
        const below =
          weeks[weekIndex + 1] &&
          weeks[weekIndex + 1][dayIndex] &&
          this.isInSameHoverRange(
            weeks[weekIndex + 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex + 1][dayIndex].isSelected,
            day.isSelected,
          );
        const left =
          weeks[weekIndex][dayIndex - 1] &&
          this.isInSameHoverRange(
            weeks[weekIndex][dayIndex - 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex - 1].isSelected,
            day.isSelected,
          );
        const right =
          weeks[weekIndex][dayIndex + 1] &&
          this.isInSameHoverRange(
            weeks[weekIndex][dayIndex + 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex + 1].isSelected,
            day.isSelected,
          );

        const style = this._calculateRoundedStyles(classNames, above, below, left, right);

        weekCornersStyled[weekIndex + '_' + dayIndex] = style;
      });
    });

    return weekCornersStyled;
  }

  private _calculateRoundedStyles(
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string {
    let style = '';
    const roundedTopLeft = !above && !left;
    const roundedTopRight = !above && !right;
    const roundedBottomLeft = !below && !left;
    const roundedBottomRight = !below && !right;

    if (roundedTopLeft) {
      style = getRTL()
        ? style.concat(classNames.topRightCornerDate + ' ')
        : style.concat(classNames.topLeftCornerDate + ' ');
    }
    if (roundedTopRight) {
      style = getRTL()
        ? style.concat(classNames.topLeftCornerDate + ' ')
        : style.concat(classNames.topRightCornerDate + ' ');
    }
    if (roundedBottomLeft) {
      style = getRTL()
        ? style.concat(classNames.bottomRightCornerDate + ' ')
        : style.concat(classNames.bottomLeftCornerDate + ' ');
    }
    if (roundedBottomRight) {
      style = getRTL()
        ? style.concat(classNames.bottomLeftCornerDate + ' ')
        : style.concat(classNames.bottomRightCornerDate + ' ');
    }

    return style;
  }

  private isInSameHoverRange = (date1: Date, date2: Date, date1Selected: boolean, date2Selected: boolean): boolean => {
    const { dateRangeType, firstDayOfWeek, workWeekDays } = this.props;

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;

    // we do not pass daysToSelectInDayView because we handle setting those styles dyanamically in onMouseOver
    const dateRange = getDateRangeArray(date1, dateRangeHoverType, firstDayOfWeek, workWeekDays);

    if (date1Selected !== date2Selected) {
      // if one is selected and the other is not, they can't be in the same range
      return false;
    } else if (date1Selected && date2Selected) {
      // if they're both selected at the same time they must be in the same range
      return true;
    }

    // otherwise, both must be unselected, so check the dateRange
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

  private getDayInfosInRangeOfDay = (day: IDayInfo): IDayInfo[] => {
    const {
      dateRangeType,
      firstDayOfWeek,
      workWeekDays,
      daysToSelectInDayView,
      hoisted: { weeks },
    } = this.props;

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = this.getDateRangeTypeToUse(dateRangeType, workWeekDays);

    // gets all the dates for the given date range type that are in the same date range as the given day
    const dateRange = getDateRangeArray(
      day.originalDate,
      dateRangeHoverType,
      firstDayOfWeek,
      workWeekDays,
      daysToSelectInDayView,
    ).map((date: Date) => date.getTime());

    // gets all the day refs for the given dates
    const dayInfosInRange = weeks!.reduce((accumulatedValue: IDayInfo[], currentWeek: IDayInfo[]) => {
      return accumulatedValue.concat(
        currentWeek.filter((weekDay: IDayInfo) => dateRange.indexOf(weekDay.originalDate.getTime()) !== -1),
      );
    }, []);

    return dayInfosInRange;
  };

  private getRefsFromDayInfos = (dayInfosInRange: IDayInfo[]): (HTMLElement | null)[] => {
    let dayRefs: (HTMLElement | null)[] = [];
    if (this.days) {
      dayRefs = dayInfosInRange.map((dayInfo: IDayInfo) => this.days[dayInfo.key]);
    }

    return dayRefs;
  };

  private onMouseOverDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayInfos = this.getDayInfosInRangeOfDay(day);
      const dayRefs = this.getRefsFromDayInfos(dayInfos);

      dayRefs.forEach((dayRef: HTMLElement, index: number) => {
        if (dayRef) {
          dayRef.classList.add('ms-CalendarDay-hoverStyle');
          if (
            !dayInfos[index].isSelected &&
            this.props.dateRangeType === DateRangeType.Day &&
            this.props.daysToSelectInDayView &&
            this.props.daysToSelectInDayView > 1
          ) {
            // remove the static classes first to overwrite them
            dayRef.classList.remove(
              this.classNames.bottomLeftCornerDate!,
              this.classNames.bottomRightCornerDate!,
              this.classNames.topLeftCornerDate!,
              this.classNames.topRightCornerDate!,
            );

            const classNames = this._calculateRoundedStyles(
              this.classNames,
              false,
              false,
              index > 0,
              index < dayRefs.length - 1,
            ).trim();
            if (classNames) {
              dayRef.classList.add(...classNames.split(' '));
            }
          }
        }
      });
    };
  };

  private onMouseDownDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayInfos = this.getDayInfosInRangeOfDay(day);
      const dayRefs = this.getRefsFromDayInfos(dayInfos);

      dayRefs.forEach((dayRef: HTMLElement) => {
        if (dayRef) {
          dayRef.classList.add('ms-CalendarDay-pressedStyle');
        }
      });
    };
  };

  private onMouseUpDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayInfos = this.getDayInfosInRangeOfDay(day);
      const dayRefs = this.getRefsFromDayInfos(dayInfos);

      dayRefs.forEach((dayRef: HTMLElement) => {
        if (dayRef) {
          dayRef.classList.remove('ms-CalendarDay-pressedStyle');
        }
      });
    };
  };

  private onMouseOutDay = (day: IDayInfo) => {
    return (ev: React.MouseEvent<HTMLElement>) => {
      const dayInfos = this.getDayInfosInRangeOfDay(day);
      const dayRefs = this.getRefsFromDayInfos(dayInfos);

      dayRefs.forEach((dayRef: HTMLElement, index: number) => {
        if (dayRef) {
          dayRef.classList.remove('ms-CalendarDay-hoverStyle');
          dayRef.classList.remove('ms-CalendarDay-pressedStyle');
          if (
            !dayInfos[index].isSelected &&
            this.props.dateRangeType === DateRangeType.Day &&
            this.props.daysToSelectInDayView &&
            this.props.daysToSelectInDayView > 1
          ) {
            const classNames = this._calculateRoundedStyles(
              this.classNames,
              false,
              false,
              index > 0,
              index < dayRefs.length - 1,
            ).trim();
            if (classNames) {
              dayRef.classList.remove(...classNames.split(' '));
            }
          }
        }
      });
    };
  };

  /**
   * When given work week, if the days are non-contiguous, the hover states look really weird. So for non-contiguous
   * work weeks, we'll just show week view instead.
   */
  private getDateRangeTypeToUse = (
    dateRangeType: DateRangeType,
    workWeekDays: DayOfWeek[] | undefined,
  ): DateRangeType => {
    if (workWeekDays && dateRangeType === DateRangeType.WorkWeek) {
      const sortedWWDays = workWeekDays.slice().sort();
      let isContiguous = true;
      for (let i = 1; i < sortedWWDays.length; i++) {
        if (sortedWWDays[i] !== sortedWWDays[i - 1] + 1) {
          isContiguous = false;
          break;
        }
      }

      if (!isContiguous || workWeekDays.length === 0) {
        return DateRangeType.Week;
      }
    }

    return dateRangeType;
  };
}
