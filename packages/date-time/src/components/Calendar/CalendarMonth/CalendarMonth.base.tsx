import * as React from 'react';
import { BaseComponent, css, getRTL, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  addYears,
  setMonth,
  getYearStart,
  getYearEnd,
  getMonthStart,
  getMonthEnd,
  compareDatePart
} from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ICalendarMonthProps, ICalendarMonthStyles, ICalendarMonthStyleProps } from './CalendarMonth.types';
import { getStyles } from './CalendarMonth.styles';
import { defaultIconStrings, defaultDateTimeFormatterCallbacks } from '../Calendar.base';
import { KeyCodes } from '@uifabric/utilities';

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>();

export class CalendarMonthBase extends BaseComponent<ICalendarMonthProps, {}> {
  public static defaultProps: Partial<ICalendarMonthProps> = {
    styles: getStyles,
    strings: undefined,
    navigationIcons: defaultIconStrings,
    dateTimeFormatter: defaultDateTimeFormatterCallbacks
  };

  private _navigatedMonth: HTMLButtonElement;

  public render(): JSX.Element {
    const {
      navigatedDate,
      selectedDate,
      strings,
      today,
      navigationIcons,
      dateTimeFormatter,
      minDate,
      maxDate,
      theme,
      styles,
      className,
      allFocusable,
      highlightCurrentMonth,
      highlightSelectedMonth,
      onHeaderSelect
    } = this.props;

    // using "!" to mark as non-null since we have a default value if it is undefined, but typescript doesn't recognize it as non-null
    const leftNavigationIcon = navigationIcons!.leftNavigation;
    const rightNavigationIcon = navigationIcons!.rightNavigation;
    const dateFormatter = dateTimeFormatter!;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!this.props.onHeaderSelect,
      highlightCurrentMonth: highlightCurrentMonth,
      highlightSelectedMonth: highlightSelectedMonth
    });

    return (
      <div className={classNames.root}>
        <div className={classNames.headerContainer}>
          <button
            className={classNames.currentYearButton}
            onClick={this._onHeaderSelect}
            onKeyDown={this._onButtonKeyDown(this._onHeaderSelect)}
            aria-label={dateFormatter.formatYear(navigatedDate)}
            data-is-focusable={!!onHeaderSelect}
            tabIndex={!!onHeaderSelect ? 0 : -1} // prevent focus if there's no action for the button
          >
            {dateFormatter.formatYear(navigatedDate)}
          </button>
          <div className={classNames.yearNavigationButtonsContainer}>
            <button
              className={css(classNames.yearNavigationButton, {
                [classNames.disabledStyle]: !isPrevYearInBounds
              })}
              disabled={!allFocusable && !isPrevYearInBounds}
              onClick={isPrevYearInBounds ? this._onSelectPrevYear : undefined}
              onKeyDown={isPrevYearInBounds ? this._onButtonKeyDown(this._onSelectPrevYear) : undefined}
              aria-label={
                strings.prevYearAriaLabel
                  ? strings.prevYearAriaLabel + ' ' + dateFormatter.formatYear(addYears(navigatedDate, -1))
                  : undefined
              }
            >
              <Icon iconName={getRTL() ? rightNavigationIcon : leftNavigationIcon} />
            </button>
            <button
              className={css(classNames.yearNavigationButton, {
                [classNames.disabledStyle]: !isNextYearInBounds
              })}
              disabled={!allFocusable && !isNextYearInBounds}
              onClick={isNextYearInBounds ? this._onSelectNextYear : undefined}
              onKeyDown={isNextYearInBounds ? this._onButtonKeyDown(this._onSelectNextYear) : undefined}
              aria-label={
                strings.nextYearAriaLabel
                  ? strings.nextYearAriaLabel + ' ' + dateFormatter.formatYear(addYears(navigatedDate, 1))
                  : undefined
              }
            >
              <Icon iconName={getRTL() ? leftNavigationIcon : rightNavigationIcon} />
            </button>
          </div>
        </div>
        <FocusZone>
          <div className={classNames.monthGridContainer} role="grid">
            {strings.shortMonths.map((month: string, index: number) => {
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
                  ref={isNavigatedMonth ? this._setNavigatedMonthRef : undefined}
                  role={'gridcell'}
                  className={css(classNames.monthButton, {
                    [classNames.currentMonth]: highlightCurrentMonth && isCurrentMonth!,
                    [classNames.selectedMonth]: highlightSelectedMonth && isSelectedMonth && isSelectedYear,
                    [classNames.disabledStyle]: !isInBounds
                  })}
                  disabled={!allFocusable && !isInBounds}
                  key={index}
                  onClick={isInBounds ? this._selectMonthCallback(index) : undefined}
                  onKeyDown={isInBounds ? this._onButtonKeyDown(this._selectMonthCallback(index)) : undefined}
                  aria-label={dateFormatter.formatMonthYear(indexedMonth, strings)}
                  aria-selected={isNavigatedMonth}
                  data-is-focusable={isInBounds ? true : undefined}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </FocusZone>
      </div>
    );
  }

  public focus = () => {
    if (this._navigatedMonth && this._navigatedMonth.value) {
      this._navigatedMonth.focus();
    }
  };

  private _setNavigatedMonthRef = (element: HTMLButtonElement) => {
    this._navigatedMonth = element;
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

  private _selectMonthCallback = (newMonth: number): (() => void) => {
    return () => this._onSelectMonth(newMonth);
  };

  private _isCurrentMonth = (month: number, year: number, today: Date): boolean => {
    return today.getFullYear() === year && today.getMonth() === month;
  };

  private _onSelectNextYear = (): void => {
    const { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  };

  private _onSelectPrevYear = (): void => {
    const { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  };

  private _onSelectMonth = (newMonth: number): void => {
    const { navigatedDate, onNavigateDate, onHeaderSelect } = this.props;

    // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
    if (onHeaderSelect) {
      onHeaderSelect();
    }
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  };

  private _onHeaderSelect = (): void => {
    const { onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      onHeaderSelect();
    }
  };
}
