import * as React from 'react';
import { BaseComponent, KeyCodes, css, getRTL, IRefObject } from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { FocusZone } from '../../FocusZone';
import {
  addYears,
  setMonth,
  getYearStart,
  getYearEnd,
  getMonthStart,
  getMonthEnd,
  compareDatePart
} from '../../utilities/dateMath/DateMath';
import { Icon } from '../../Icon';
import * as stylesImport from './Calendar.scss';
import { CalendarYear, ICalendarYearRange } from './CalendarYear';
const styles: any = stylesImport;

export interface ICalendarMonth {
  focus(): void;
}

export interface ICalendarMonthProps extends React.ClassAttributes<CalendarMonth> {
  componentRef?: IRefObject<ICalendarMonth>;
  navigatedDate: Date;
  selectedDate: Date;
  strings: ICalendarStrings;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  today?: Date;
  highlightCurrentMonth: boolean;
  highlightSelectedMonth: boolean;
  onHeaderSelect?: (focus: boolean) => void;
  navigationIcons: ICalendarIconStrings;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  minDate?: Date;
  maxDate?: Date;
  yearPickerHidden?: boolean;
}

export interface ICalendarMonthState {
  /** State used to show/hide month picker */
  isYearPickerVisible?: boolean;
}

export class CalendarMonth extends BaseComponent<ICalendarMonthProps, ICalendarMonthState> {
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedMonth: HTMLElement;
  };

  private _selectMonthCallbacks: (() => void)[];
  private _calendarYearRef: CalendarYear;
  private _focusOnUpdate: boolean;

  public constructor(props: ICalendarMonthProps) {
    super(props);

    this._selectMonthCallbacks = [];
    props.strings.shortMonths.map((month, index) => {
      this._selectMonthCallbacks[index] = this._onSelectMonth.bind(this, index);
    });

    this._isCurrentMonth = this._isCurrentMonth.bind(this);
    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);

    this.state = { isYearPickerVisible: false };
  }

  public componentDidUpdate(): void {
    if (this._focusOnUpdate) {
      this.focus();
      this._focusOnUpdate = false;
    }
  }

  public render(): JSX.Element {
    const {
      navigatedDate,
      selectedDate,
      strings,
      today,
      highlightCurrentMonth,
      highlightSelectedMonth,
      navigationIcons,
      dateTimeFormatter,
      minDate,
      maxDate,
      yearPickerHidden
    } = this.props;

    if (this.state.isYearPickerVisible) {
      return (
        <CalendarYear
          minYear={minDate ? minDate.getFullYear() : undefined}
          maxYear={maxDate ? maxDate.getFullYear() : undefined}
          onSelectYear={this._onSelectYear}
          navigationIcons={navigationIcons}
          onHeaderSelect={this._onYearPickerHeaderSelect}
          selectedYear={selectedDate ? selectedDate.getFullYear() : navigatedDate ? navigatedDate.getFullYear() : undefined}
          onRenderYear={this._onRenderYear}
          strings={{
            rangeAriaLabel: this._yearRangeToString
          }}
          ref={this._onCalendarYearRef}
        />
      );
    }

    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div className={css('ms-DatePicker-monthPicker', styles.monthPicker)}>
        <div className={css('ms-DatePicker-header', styles.header)}>
          {this.props.onHeaderSelect || !yearPickerHidden ? (
            <div
              className={css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear, styles.headerToggleView)}
              onClick={this._onHeaderSelect}
              onKeyDown={this._onHeaderKeyDown}
              aria-label={dateTimeFormatter.formatYear(navigatedDate)}
              role="button"
              tabIndex={0}
            >
              {dateTimeFormatter.formatYear(navigatedDate)}
            </div>
          ) : (
            <div className={css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear)}>
              {dateTimeFormatter.formatYear(navigatedDate)}
            </div>
          )}
          <div className={css('ms-DatePicker-yearComponents', styles.yearComponents)}>
            <div className={css('ms-DatePicker-navContainer', styles.navContainer)}>
              <button
                className={css('ms-DatePicker-prevYear js-prevYear', styles.prevYear, {
                  ['ms-DatePicker-prevYear--disabled ' + styles.prevYearIsDisabled]: !isPrevYearInBounds
                })}
                disabled={!isPrevYearInBounds}
                onClick={isPrevYearInBounds ? this._onSelectPrevYear : undefined}
                onKeyDown={isPrevYearInBounds ? this._onSelectPrevYearKeyDown : undefined}
                aria-label={
                  strings.prevYearAriaLabel
                    ? strings.prevYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, -1))
                    : undefined
                }
                role="button"
                type="button"
              >
                <Icon iconName={getRTL() ? rightNavigationIcon : leftNavigationIcon} />
              </button>
              <button
                className={css('ms-DatePicker-nextYear js-nextYear', styles.nextYear, {
                  ['ms-DatePicker-nextYear--disabled ' + styles.nextYearIsDisabled]: !isNextYearInBounds
                })}
                disabled={!isNextYearInBounds}
                onClick={isNextYearInBounds ? this._onSelectNextYear : undefined}
                onKeyDown={isNextYearInBounds ? this._onSelectNextYearKeyDown : undefined}
                aria-label={
                  strings.nextYearAriaLabel
                    ? strings.nextYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, 1))
                    : undefined
                }
                role="button"
                type="button"
              >
                <Icon iconName={getRTL() ? leftNavigationIcon : rightNavigationIcon} />
              </button>
            </div>
          </div>
        </div>
        <FocusZone>
          <div className={css('ms-DatePicker-optionGrid', styles.optionGrid)} role="grid" aria-readonly="true">
            <div role="row">
              {strings.shortMonths.map((month, index) => {
                const indexedMonth = setMonth(navigatedDate, index);
                const isCurrentMonth = this._isCurrentMonth(index, navigatedDate.getFullYear(), today!);
                const isNavigatedMonth = navigatedDate.getMonth() === index;
                const isSelectedMonth = selectedDate.getMonth() === index;
                const isSelectedYear = selectedDate.getFullYear() === navigatedDate.getFullYear();
                const isInBounds =
                  (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                  (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);

                return (
                  <button
                    role={'gridcell'}
                    className={css('ms-DatePicker-monthOption', styles.monthOption, {
                      ['ms-DatePicker-day--today ' + styles.monthIsCurrentMonth]: highlightCurrentMonth && isCurrentMonth!,
                      ['ms-DatePicker-day--highlighted ' + styles.monthIsHighlighted]:
                        (highlightCurrentMonth || highlightSelectedMonth) && isSelectedMonth && isSelectedYear,
                      ['ms-DatePicker-monthOption--disabled ' + styles.monthOptionIsDisabled]: !isInBounds
                    })}
                    disabled={!isInBounds}
                    key={index}
                    onClick={isInBounds ? this._selectMonthCallbacks[index] : undefined}
                    onKeyDown={isInBounds ? this._onSelectMonthKeyDown(index) : undefined}
                    aria-label={dateTimeFormatter.formatMonthYear(indexedMonth, strings)}
                    aria-selected={isCurrentMonth || isNavigatedMonth}
                    data-is-focusable={isInBounds ? true : undefined}
                    ref={isNavigatedMonth ? 'navigatedMonth' : undefined}
                    type="button"
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>
        </FocusZone>
      </div>
    );
  }

  public focus() {
    if (this._calendarYearRef) {
      this._calendarYearRef.focus();
    } else if (this.refs.navigatedMonth) {
      this.refs.navigatedMonth.tabIndex = 0;
      this.refs.navigatedMonth.focus();
    }
  }

  private _onCalendarYearRef = (ref: CalendarYear) => {
    this._calendarYearRef = ref;
  };

  private _isCurrentMonth(month: number, year: number, today: Date): boolean {
    return today.getFullYear() === year && today.getMonth() === month;
  }

  private _onKeyDown = (callback: () => void, ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
  };

  private _onSelectYear = (selectedYear: number) => {
    this._focusOnUpdate = true;
    const { navigatedDate, onNavigateDate, maxDate, minDate } = this.props;
    const navYear = navigatedDate.getFullYear();
    if (navYear !== selectedYear) {
      let newNavigationDate = new Date(navigatedDate.getTime());
      newNavigationDate.setFullYear(selectedYear);
      // for min and max dates, adjust the new navigation date - perhaps this should be
      // checked on the master navigation date handler (i.e. in Calendar)
      if (maxDate && newNavigationDate > maxDate) {
        newNavigationDate = setMonth(newNavigationDate, maxDate.getMonth());
      } else if (minDate && newNavigationDate < minDate) {
        newNavigationDate = setMonth(newNavigationDate, minDate.getMonth());
      }
      onNavigateDate(newNavigationDate, true);
    }
    this.setState({ isYearPickerVisible: false });
  };

  private _yearToString = (year: number) => {
    const { navigatedDate, dateTimeFormatter } = this.props;
    if (dateTimeFormatter) {
      // create a date based on the current nav date
      const yearFormattingDate = new Date(navigatedDate.getTime());
      yearFormattingDate.setFullYear(year);
      return dateTimeFormatter.formatYear(yearFormattingDate);
    }
    return String(year);
  };

  private _yearRangeToString = (yearRange: ICalendarYearRange) => {
    return `${this._yearToString(yearRange.fromYear)} - ${this._yearToString(yearRange.toYear)}`;
  };

  private _onRenderYear = (year: number) => {
    return this._yearToString(year);
  };

  private _onSelectNextYear = (): void => {
    const { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  };

  private _onSelectNextYearKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      this._onKeyDown(this._onSelectNextYear, ev);
    }
  };

  private _onSelectPrevYear = (): void => {
    const { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  };

  private _onSelectPrevYearKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      this._onKeyDown(this._onSelectPrevYear, ev);
    }
  };

  private _onSelectMonthKeyDown = (index: number): ((ev: React.KeyboardEvent<HTMLElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLElement>) => this._onKeyDown(() => this._onSelectMonth(index), ev);
  };

  private _onSelectMonth = (newMonth: number): void => {
    const { navigatedDate, onNavigateDate, onHeaderSelect } = this.props;

    // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  };

  private _onHeaderSelect = (): void => {
    const { onHeaderSelect, yearPickerHidden } = this.props;
    if (!yearPickerHidden) {
      this._focusOnUpdate = true;
      this.setState({ isYearPickerVisible: true });
    } else if (onHeaderSelect) {
      onHeaderSelect(true);
    }
  };

  private _onYearPickerHeaderSelect = (focus: boolean): void => {
    this._focusOnUpdate = focus;
    this.setState({ isYearPickerVisible: false });
  };

  private _onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { onHeaderSelect } = this.props;
    if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      onHeaderSelect(true);
    }
  };
}
