import * as React from 'react';
import { BaseComponent, KeyCodes, css, getRTL } from '../../Utilities';
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
const styles: any = stylesImport;

export interface ICalendarMonth {
  focus(): void;
}

export interface ICalendarMonthProps extends React.Props<CalendarMonth> {
  componentRef?: (c: ICalendarMonth) => void;
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
}

export class CalendarMonth extends BaseComponent<ICalendarMonthProps, {}> {
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedMonth: HTMLElement;
  };

  private _selectMonthCallbacks: (() => void)[];

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
      maxDate
    } = this.props;
    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div className={css('ms-DatePicker-monthPicker', styles.monthPicker)}>
        <div className={css('ms-DatePicker-header', styles.header)}>
          {this.props.onHeaderSelect ? (
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
    if (this.refs.navigatedMonth) {
      this.refs.navigatedMonth.tabIndex = 0;
      this.refs.navigatedMonth.focus();
    }
  }

  private _isCurrentMonth(month: number, year: number, today: Date): boolean {
    return today.getFullYear() === year && today.getMonth() === month;
  }

  private _onKeyDown = (callback: () => void, ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
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
}
