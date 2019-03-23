import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, getRTL, getRTLSafeKeyCode, format, IRefObject, findIndex } from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
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
  getWeekNumber,
  getWeekNumbersInMonth,
  getMonthStart,
  getMonthEnd
} from '../../utilities/dateMath/DateMath';

import * as stylesImport from './Calendar.scss';
const styles: any = stylesImport;

const DAYS_IN_WEEK = 7;

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: (ev: React.SyntheticEvent<HTMLElement>) => void;
}

export interface ICalendarDay {
  focus(): void;
}

export interface ICalendarDayProps extends React.ClassAttributes<CalendarDay> {
  componentRef?: IRefObject<ICalendarDay>;
  strings: ICalendarStrings;
  selectedDate: Date;
  navigatedDate: Date;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  onDismiss?: () => void;
  firstDayOfWeek: DayOfWeek;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
  navigationIcons: ICalendarIconStrings;
  today?: Date;
  onHeaderSelect?: (focus: boolean) => void;
  showWeekNumbers?: boolean;
  firstWeekOfYear: FirstWeekOfYear;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  showSixWeeksByDefault?: boolean;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  workWeekDays?: DayOfWeek[];
  showCloseButton?: boolean;
  allFocusable?: boolean;
}

export interface ICalendarDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

interface IWeekCorners {
  [key: string]: string;
}

export class CalendarDay extends BaseComponent<ICalendarDayProps, ICalendarDayState> {
  private navigatedDay: HTMLElement | null;
  private days: { [key: string]: HTMLElement | null } = {};

  public constructor(props: ICalendarDayProps) {
    super(props);

    this.state = {
      activeDescendantId: getId('DatePickerDay-active'),
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
      firstDayOfWeek,
      strings,
      navigatedDate,
      selectedDate,
      dateRangeType,
      navigationIcons,
      showWeekNumbers,
      firstWeekOfYear,
      dateTimeFormatter,
      minDate,
      maxDate,
      showCloseButton,
      allFocusable
    } = this.props;
    const dayPickerId = getId('DatePickerDay-dayPicker');
    const monthAndYearId = getId('DatePickerDay-monthAndYear');
    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;
    const closeNavigationIcon = navigationIcons.closeIcon;
    const weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;
    const selectedDateWeekNumber = showWeekNumbers ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear) : undefined;

    // When the month is highlighted get the corner dates so that styles can be added to them
    const weekCorners: IWeekCorners = this._getWeekCornerStyles(weeks!, dateRangeType);

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div
        className={css(
          'ms-DatePicker-dayPicker',
          styles.dayPicker,
          showWeekNumbers && 'ms-DatePicker-showWeekNumbers' && (getRTL() ? styles.showWeekNumbersRTL : styles.showWeekNumbers)
        )}
        id={dayPickerId}
      >
        <div className={css('ms-DatePicker-header', styles.header)}>
          <div aria-live="polite" aria-relevant="text" aria-atomic="true" id={monthAndYearId} className={styles.monthAndYear}>
            {this.props.onHeaderSelect ? (
              <div
                className={css('ms-DatePicker-monthAndYear js-showMonthPicker', styles.headerToggleView)}
                onClick={this._onHeaderSelect}
                onKeyDown={this._onHeaderKeyDown}
                aria-label={dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
                role="button"
                tabIndex={0}
              >
                {dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
              </div>
            ) : (
              <div className={css('ms-DatePicker-monthAndYear', styles.monthAndYear)}>
                {dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
              </div>
            )}
          </div>
          <div className={css('ms-DatePicker-monthComponents', styles.monthComponents)}>
            <div className={css('ms-DatePicker-navContainer', styles.navContainer)}>
              <button
                className={css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth, {
                  ['ms-DatePicker-prevMonth--disabled ' + styles.prevMonthIsDisabled]: !prevMonthInBounds
                })}
                disabled={!allFocusable && !prevMonthInBounds}
                aria-disabled={!prevMonthInBounds}
                onClick={prevMonthInBounds ? this._onSelectPrevMonth : undefined}
                onKeyDown={prevMonthInBounds ? this._onPrevMonthKeyDown : undefined}
                aria-controls={dayPickerId}
                aria-label={
                  strings.prevMonthAriaLabel
                    ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
                    : undefined
                }
                role="button"
                type="button"
              >
                <Icon iconName={leftNavigationIcon} />
              </button>
              <button
                className={css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth, {
                  ['ms-DatePicker-nextMonth--disabled ' + styles.nextMonthIsDisabled]: !nextMonthInBounds
                })}
                disabled={!allFocusable && !nextMonthInBounds}
                aria-disabled={!nextMonthInBounds}
                onClick={nextMonthInBounds ? this._onSelectNextMonth : undefined}
                onKeyDown={nextMonthInBounds ? this._onNextMonthKeyDown : undefined}
                aria-controls={dayPickerId}
                aria-label={
                  strings.nextMonthAriaLabel
                    ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
                    : undefined
                }
                role="button"
                type="button"
              >
                <Icon iconName={rightNavigationIcon} />
              </button>
              {showCloseButton && (
                <button
                  className={css('ms-DatePicker-closeButton js-closeButton', styles.closeButton)}
                  onClick={this._onClose}
                  onKeyDown={this._onCloseButtonKeyDown}
                  aria-label={strings.closeButtonAriaLabel}
                  role="button"
                  type="button"
                >
                  <Icon iconName={closeNavigationIcon} />
                </button>
              )}
            </div>
          </div>
        </div>
        <FocusZone>
          <table
            className={css('ms-DatePicker-table', styles.table)}
            aria-readonly="true"
            aria-multiselectable="false"
            aria-labelledby={monthAndYearId}
            aria-activedescendant={activeDescendantId}
            role="grid"
          >
            <thead>
              <tr>
                {showWeekNumbers && <th className={css('ms-DatePicker-weekday', styles.weekday)} />}
                {strings.shortDays.map((val, index) => (
                  <th
                    className={css('ms-DatePicker-weekday', styles.weekday)}
                    role="columnheader"
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
            </thead>
            <tbody
              onMouseLeave={dateRangeType !== DateRangeType.Day ? this._onTableMouseLeave : undefined}
              onMouseUp={dateRangeType !== DateRangeType.Day ? this._onTableMouseUp : undefined}
            >
              {weeks!.map((week, weekIndex) => (
                <tr key={weekNumbers ? weekNumbers[weekIndex] : weekIndex}>
                  {showWeekNumbers && weekNumbers && (
                    <th
                      className={css('ms-DatePicker-weekNumbers', 'ms-DatePicker-weekday', styles.weekday, styles.weekNumbers)}
                      key={weekIndex}
                      title={
                        weekNumbers && strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
                      }
                      aria-label={
                        weekNumbers && strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
                      }
                      scope="row"
                    >
                      <div
                        className={css('ms-DatePicker-day', styles.day, {
                          ['ms-DatePicker-week--highlighted ' + styles.weekIsHighlighted]: selectedDateWeekNumber === weekNumbers[weekIndex]
                        })}
                      >
                        <span>{weekNumbers[weekIndex]}</span>
                      </div>
                    </th>
                  )}
                  {week.map((day, dayIndex) => {
                    const isNavigatedDate = compareDates(navigatedDate, day.originalDate);
                    return (
                      <td
                        key={day.key}
                        onClick={day.isInBounds ? day.onSelected : undefined}
                        className={css(
                          styles.dayWrapper,
                          'ms-DatePicker-day',
                          this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex),
                          {
                            ['ms-DatePicker-weekBackground ' + styles.weekBackground]:
                              day.isSelected && (dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek),
                            ['ms-DatePicker-dayBackground ' + styles.dayBackground]: dateRangeType === DateRangeType.Day,
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]:
                              day.isSelected && dateRangeType === DateRangeType.Day,
                            ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInBounds && day.isInMonth,
                            ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: day.isInBounds && !day.isInMonth,
                            [styles.daySelection]: dateRangeType === DateRangeType.Day,
                            [styles.weekSelection]: dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek,
                            [styles.monthSelection]: dateRangeType === DateRangeType.Month
                          }
                        )}
                        ref={element => this._setDayCellRef(element, day, isNavigatedDate)}
                        onMouseOver={
                          dateRangeType !== DateRangeType.Day && day.isInBounds
                            ? this._onDayMouseOver(day.originalDate, weekIndex, dayIndex, dateRangeType)
                            : undefined
                        }
                        onMouseLeave={
                          dateRangeType !== DateRangeType.Day && day.isInBounds
                            ? this._onDayMouseLeave(day.originalDate, weekIndex, dayIndex, dateRangeType)
                            : undefined
                        }
                        onMouseDown={
                          dateRangeType !== DateRangeType.Day && day.isInBounds
                            ? this._onDayMouseDown(day.originalDate, weekIndex, dayIndex, dateRangeType)
                            : undefined
                        }
                        onMouseUp={
                          dateRangeType !== DateRangeType.Day && day.isInBounds
                            ? this._onDayMouseUp(day.originalDate, weekIndex, dayIndex, dateRangeType)
                            : undefined
                        }
                        role={'gridcell'}
                      >
                        <button
                          key={day.key + 'button'}
                          onClick={day.isInBounds ? day.onSelected : undefined}
                          className={css(styles.day, 'ms-DatePicker-day-button', {
                            ['ms-DatePicker-day--disabled ' + styles.dayIsDisabled]: !day.isInBounds,
                            ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday
                          })}
                          role="gridcell"
                          onKeyDown={this._onDayKeyDown(day.originalDate, weekIndex, dayIndex)}
                          aria-label={dateTimeFormatter.formatMonthDayYear(day.originalDate, strings)}
                          id={isNavigatedDate ? activeDescendantId : undefined}
                          aria-selected={day.isInBounds ? day.isSelected : undefined}
                          data-is-focusable={allFocusable || (day.isInBounds ? true : undefined)}
                          ref={element => this._setDayRef(element, day, isNavigatedDate)}
                          disabled={!allFocusable && !day.isInBounds}
                          aria-disabled={!day.isInBounds}
                          type="button"
                        >
                          <span aria-hidden="true">{dateTimeFormatter.formatDay(day.originalDate)}</span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
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

  private _setDayRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    if (isNavigatedDate) {
      this.navigatedDay = element;
    }
  }

  private _setDayCellRef(element: HTMLElement | null, day: IDayInfo, isNavigatedDate: boolean): void {
    this.days[day.key] = element;
  }

  private _getWeekCornerStyles(weeks: IDayInfo[][], dateRangeType: DateRangeType): IWeekCorners {
    const weekCornersStyled: any = {};

    switch (dateRangeType) {
      case DateRangeType.Month:
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
              weeks[weekIndex - 1][dayIndex].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
            const below =
              weeks[weekIndex + 1] &&
              weeks[weekIndex + 1][dayIndex] &&
              weeks[weekIndex + 1][dayIndex].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
            const left =
              weeks[weekIndex][dayIndex - 1] &&
              weeks[weekIndex][dayIndex - 1].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
            const right =
              weeks[weekIndex][dayIndex + 1] &&
              weeks[weekIndex][dayIndex + 1].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();

            const roundedTopLeft = !above && !left;
            const roundedTopRight = !above && !right;
            const roundedBottomLeft = !below && !left;
            const roundedBottomRight = !below && !right;

            let style = '';
            if (roundedTopLeft) {
              style = getRTL() ? style.concat(styles.topRightCornerDate + ' ') : style.concat(styles.topLeftCornerDate + ' ');
            }
            if (roundedTopRight) {
              style = getRTL() ? style.concat(styles.topLeftCornerDate + ' ') : style.concat(styles.topRightCornerDate + ' ');
            }
            if (roundedBottomLeft) {
              style = getRTL() ? style.concat(styles.bottomRightCornerDate + ' ') : style.concat(styles.bottomLeftCornerDate + ' ');
            }
            if (roundedBottomRight) {
              style = getRTL() ? style.concat(styles.bottomLeftCornerDate + ' ') : style.concat(styles.bottomRightCornerDate + ' ');
            }

            if (!above) {
              style = style.concat(styles.topDate + ' ');
            }

            if (!below) {
              style = style.concat(styles.bottomDate + ' ');
            }

            if (!right) {
              style = style.concat(styles.rightDate + ' ');
            }

            if (!left) {
              style = style.concat(styles.leftdate + ' ');
            }

            weekCornersStyled[weekIndex + '_' + dayIndex] = style;
          });
        });
        break;
      case DateRangeType.Week:
      case DateRangeType.WorkWeek:
        weeks.forEach((week: IDayInfo[], weekIndex: number) => {
          const minIndex = findIndex(week, (item: IDayInfo) => {
            return item.isInBounds;
          });
          const maxIndex = this._findLastIndex(week, (item: IDayInfo) => {
            return item.isInBounds;
          });

          const leftStyle = styles.topLeftCornerDate + ' ' + styles.bottomLeftCornerDate;
          const rightStyle = styles.topRightCornerDate + ' ' + styles.bottomRightCornerDate;
          weekCornersStyled[weekIndex + '_' + minIndex] = getRTL() ? rightStyle : leftStyle;
          weekCornersStyled[weekIndex + '_' + maxIndex] = getRTL() ? leftStyle : rightStyle;
        });
        break;
    }

    return weekCornersStyled;
  }

  private _getHighlightedCornerStyle(weekCorners: IWeekCorners, dayIndex: number, weekIndex: number): string {
    const cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';
    return cornerStyle;
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

  private _onKeyDown = (callback: () => void, ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  };

  private _onDayKeyDown = (originalDate: Date, weekIndex: number, dayIndex: number): ((ev: React.KeyboardEvent<HTMLElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.which === KeyCodes.enter) {
        this._onSelectDate(originalDate, ev);
      } else {
        this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
      }
    };
  };

  private _onDayMouseDown = (
    originalDate: Date,
    weekIndex: number,
    dayIndex: number,
    dateRangeType: DateRangeType
  ): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      // set the press styling
      if (dateRangeType === DateRangeType.Month) {
        this._applyFunctionToDayRefs((ref, day) => {
          if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
            ref.classList.add(styles.dayPress);
          }
        });
      } else {
        // week or work week view
        this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
          if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
            ref.classList.add(styles.dayPress);
            ref.classList.add(styles.dayIsHighlighted);
          } else if (ref) {
            ref.classList.remove(styles.dayIsHighlighted);
          }
        });
      }
    };
  };

  private _onDayMouseUp = (
    originalDate: Date,
    weekIndex: number,
    dayIndex: number,
    dateRangeType: DateRangeType
  ): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      // remove press styling
      if (dateRangeType === DateRangeType.Month) {
        this._applyFunctionToDayRefs((ref, day) => {
          if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
            ref.classList.remove(styles.dayPress);
          }
        });
      } else {
        // week or work week view
        this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
          if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
            ref.classList.remove(styles.dayPress);
          }
        });
      }
    };
  };

  private _onDayMouseOver = (
    originalDate: Date,
    weekIndex: number,
    dayIndex: number,
    dateRangeType: DateRangeType
  ): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      // set the hover styling on every day in the same month
      if (dateRangeType === DateRangeType.Month) {
        this._applyFunctionToDayRefs((ref, day) => {
          if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
            ref.classList.add(styles.dayHover);
          }
        });
      } else {
        // week or work week view
        this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
          if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
            ref.classList.add(styles.dayHover);
          }
        });
      }
    };
  };

  private _onDayMouseLeave = (
    originalDate: Date,
    weekIndex: number,
    dayIndex: number,
    dateRangeType: DateRangeType
  ): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      // remove the hover and pressed styling
      if (dateRangeType === DateRangeType.Month) {
        this._applyFunctionToDayRefs((ref, day) => {
          if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
            ref.classList.remove(styles.dayHover);
          }
        });
      } else {
        // week or work week view
        this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
          if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
            ref.classList.remove(styles.dayHover);
          }
        });
      }
    };
  };

  private _onTableMouseLeave = (ev: React.MouseEvent<HTMLElement>): void => {
    if (
      (ev.target as HTMLElement).contains &&
      ev.relatedTarget &&
      (ev.relatedTarget as HTMLElement).contains &&
      (ev.target as HTMLElement).contains(ev.relatedTarget as HTMLElement)
    ) {
      return;
    }

    this._applyFunctionToDayRefs((ref, day) => {
      if (ref) {
        ref.classList.remove(styles.dayHover);
        ref.classList.remove(styles.dayPress);
      }
    });
  };

  private _onTableMouseUp = (ev: React.MouseEvent<HTMLElement>): void => {
    if (
      (ev.target as HTMLElement).contains &&
      ev.relatedTarget &&
      (ev.relatedTarget as HTMLElement).contains &&
      (ev.target as HTMLElement).contains(ev.relatedTarget as HTMLElement)
    ) {
      return;
    }

    this._applyFunctionToDayRefs((ref, day) => {
      if (ref) {
        ref.classList.remove(styles.dayPress);
      }
    });
  };

  private _applyFunctionToDayRefs(func: (ref: HTMLElement | null, day: IDayInfo, weekIndex?: number) => void) {
    if (this.state.weeks) {
      this.state.weeks.map((week: IDayInfo[], weekIndex: number) => {
        week.map(day => {
          const ref = this.days[day.key];
          func(ref, day, weekIndex);
        });
      });
    }
  }

  private _onSelectDate = (selectedDate: Date, ev: React.SyntheticEvent<HTMLElement>): void => {
    const {
      onSelectDate,
      dateRangeType,
      firstDayOfWeek,
      navigatedDate,
      autoNavigateOnSelection,
      minDate,
      maxDate,
      workWeekDays
    } = this.props;

    if (ev) {
      ev.stopPropagation();
    }

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
    if (dateRangeType !== DateRangeType.Day) {
      dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
    }
    dateRange = dateRange.filter(d => {
      return !this._getIsRestrictedDate(d);
    });

    if (onSelectDate) {
      onSelectDate(selectedDate, dateRange);
    }

    // Navigate to next or previous month if needed
    if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
      const compareResult = compareDatePart(selectedDate, navigatedDate);
      if (compareResult < 0) {
        this._onSelectPrevMonth();
      } else if (compareResult > 0) {
        this._onSelectNextMonth();
      }
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
    const { onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
  };

  private _onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { onHeaderSelect } = this.props;
    if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      onHeaderSelect(true);
    }
  };

  private _onPrevMonthKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      this._onKeyDown(this._onSelectPrevMonth, ev);
    }
  };

  private _onNextMonthKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      this._onKeyDown(this._onSelectNextMonth, ev);
    }
  };

  private _onCloseButtonKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      this._onKeyDown(this._onClose, ev);
    }
  };

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

    // a flag to indicate whether all days of the week are in the month
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
          isInBounds:
            (minDate ? compareDatePart(minDate, date) < 1 : true) &&
            (maxDate ? compareDatePart(date, maxDate) < 1 : true) &&
            !this._getIsRestrictedDate(date)
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

  private _getIsRestrictedDate(date: Date): boolean {
    const { restrictedDates } = this.props;
    if (!restrictedDates) {
      return false;
    }
    const restrictedDate = restrictedDates.find(rd => {
      return compareDates(rd, date);
    });
    return restrictedDate ? true : false;
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
   * Returns the index of the last element in the array where the predicate is true, and -1
   * otherwise
   * @param items Array of items to be iterated over using the predicate
   * @param predicate find calls predicate once for each element of the array, in descending
   * order, until it finds one where predicate returns true if such an element is found.
   */
  private _findLastIndex<T>(items: T[], predicate: (item: T) => boolean): number {
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];

      if (predicate(item)) {
        return i;
      }
    }

    return -1;
  }
}
