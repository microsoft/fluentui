import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  addYears,
  setMonth,
  getYearStart,
  getYearEnd,
  getMonthStart,
  getMonthEnd,
  compareDatePart,
} from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ICalendarMonthProps, ICalendarMonthStyles, ICalendarMonthStyleProps } from './CalendarMonth.types';
import { getStyles } from './CalendarMonth.styles';
import { defaultIconStrings, defaultDateTimeFormatterCallbacks } from '../Calendar.base';
import {
  css,
  getRTL,
  classNamesFunction,
  KeyCodes,
  format,
  initializeComponentRef,
  getPropsWithDefaults,
} from '@uifabric/utilities';
import { ICalendarYear, ICalendarYearRange } from '../CalendarYear/CalendarYear.types';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import { usePrevious } from '@uifabric/react-hooks';

const MONTHS_PER_ROW = 4;

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>();

export interface ICalendarMonthState {
  isYearPickerVisible?: boolean;
}

const DEFAULT_PROPS = {
  styles: getStyles,
  strings: undefined,
  navigationIcons: defaultIconStrings,
  dateTimeFormatter: defaultDateTimeFormatterCallbacks,
  yearPickerHidden: false,
} as const;

function useAnimateBackwards({ navigatedDate }: ICalendarMonthProps) {
  const currentYear = navigatedDate.getFullYear();
  const previousYear = usePrevious(currentYear);

  if (previousYear === undefined || previousYear === currentYear) {
    return undefined;
  } else {
    return previousYear > currentYear;
  }
}

function useFocusLogic({ componentRef }: ICalendarMonthProps) {
  const navigatedMonthRef = React.useRef<HTMLButtonElement>(null);
  const calendarYearRef = React.useRef<ICalendarYear>(null);
  const focusOnUpdate = React.useRef(false);

  const focus = () => {
    if (calendarYearRef.current) {
      calendarYearRef.current.focus();
    } else if (navigatedMonthRef.current) {
      navigatedMonthRef.current.focus();
    }
  };

  React.useImperativeHandle(componentRef, () => ({ focus }), [focus]);

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  const focusOnNextUpdate = () => {
    focusOnUpdate.current = true;
  };

  return [navigatedMonthRef, calendarYearRef, focusOnNextUpdate] as const;
}

export const CalendarMonthBase = React.forwardRef(
  (propsWithoutDefaults: ICalendarMonthProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);
    const [navigatedMonthRef, calendarYearRef, focusOnNextUpdate] = useFocusLogic(props);

    const animateBackwards = useAnimateBackwards(props);

    return (
      <CalendarMonthBaseClass
        {...props}
        hoisted={{ forwardedRef, animateBackwards, navigatedMonthRef, calendarYearRef, focusOnNextUpdate }}
      />
    );
  },
);
CalendarMonthBase.displayName = 'CalendarMonthBase';

interface ICalendarMonthBaseClassProps extends ICalendarMonthProps {
  hoisted: {
    forwardedRef: React.Ref<HTMLDivElement>;
    animateBackwards?: boolean;
    navigatedMonthRef: React.RefObject<HTMLButtonElement>;
    calendarYearRef: React.RefObject<ICalendarYear>;
    focusOnNextUpdate(): void;
  };
}

class CalendarMonthBaseClass extends React.Component<ICalendarMonthBaseClassProps, ICalendarMonthState> {
  constructor(props: ICalendarMonthBaseClassProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      isYearPickerVisible: false,
    };
  }

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
      onHeaderSelect,
      animationDirection,
      yearPickerHidden,
    } = this.props;

    // navigationIcons has a default value in defaultProps, but typescript doesn't recognize this
    const leftNavigationIcon = navigationIcons!.leftNavigation;
    const rightNavigationIcon = navigationIcons!.rightNavigation;
    const dateFormatter = dateTimeFormatter!;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!onHeaderSelect || !yearPickerHidden,
      highlightCurrent: highlightCurrentMonth,
      highlightSelected: highlightSelectedMonth,
      animateBackwards: this.props.hoisted.animateBackwards,
      animationDirection: animationDirection,
    });

    if (this.state.isYearPickerVisible) {
      // use navigated date for the year picker
      return (
        <CalendarYear
          ref={this.props.hoisted.forwardedRef}
          key={'calendarYear'}
          minYear={minDate ? minDate.getFullYear() : undefined}
          maxYear={maxDate ? maxDate.getFullYear() : undefined}
          onSelectYear={this._onSelectYear}
          navigationIcons={navigationIcons}
          onHeaderSelect={this._onYearPickerHeaderSelect}
          selectedYear={
            selectedDate ? selectedDate.getFullYear() : navigatedDate ? navigatedDate.getFullYear() : undefined
          }
          onRenderYear={this._onRenderYear}
          strings={{
            rangeAriaLabel: this._yearRangeToString,
            prevRangeAriaLabel: this._yearRangeToPrevDecadeLabel,
            nextRangeAriaLabel: this._yearRangeToNextDecadeLabel,
            headerAriaLabelFormatString: this.props.strings.yearPickerHeaderAriaLabel,
          }}
          componentRef={this.props.hoisted.calendarYearRef}
          styles={styles}
          highlightCurrentYear={highlightCurrentMonth}
          highlightSelectedYear={highlightSelectedMonth}
          animationDirection={animationDirection}
        />
      );
    }

    const rowIndexes = [];
    for (let i = 0; i < strings.shortMonths.length / MONTHS_PER_ROW; i++) {
      rowIndexes.push(i);
    }

    const yearString = dateFormatter.formatYear(navigatedDate);
    const headerAriaLabel = strings.monthPickerHeaderAriaLabel
      ? format(strings.monthPickerHeaderAriaLabel, yearString)
      : yearString;

    return (
      <div className={classNames.root} ref={this.props.hoisted.forwardedRef}>
        <div className={classNames.headerContainer}>
          <button
            className={classNames.currentItemButton}
            onClick={this._onHeaderSelect}
            onKeyDown={this._onButtonKeyDown(this._onHeaderSelect)}
            aria-label={headerAriaLabel}
            data-is-focusable={!!onHeaderSelect || !yearPickerHidden}
            tabIndex={!!onHeaderSelect || !yearPickerHidden ? 0 : -1}
            type="button"
            aria-atomic={true}
            // if this component rerenders when text changes, aria-live will not be announced, so make key consistent
            aria-live="polite"
          >
            {yearString}
          </button>
          <div className={classNames.navigationButtonsContainer}>
            <button
              className={css(classNames.navigationButton, {
                [classNames.disabled]: !isPrevYearInBounds,
              })}
              disabled={!allFocusable && !isPrevYearInBounds}
              onClick={isPrevYearInBounds ? this._onSelectPrevYear : undefined}
              onKeyDown={isPrevYearInBounds ? this._onButtonKeyDown(this._onSelectPrevYear) : undefined}
              title={
                strings.prevYearAriaLabel
                  ? strings.prevYearAriaLabel + ' ' + dateFormatter.formatYear(addYears(navigatedDate, -1))
                  : undefined
              }
              type="button"
            >
              <Icon iconName={getRTL() ? rightNavigationIcon : leftNavigationIcon} />
            </button>
            <button
              className={css(classNames.navigationButton, {
                [classNames.disabled]: !isNextYearInBounds,
              })}
              disabled={!allFocusable && !isNextYearInBounds}
              onClick={isNextYearInBounds ? this._onSelectNextYear : undefined}
              onKeyDown={isNextYearInBounds ? this._onButtonKeyDown(this._onSelectNextYear) : undefined}
              title={
                strings.nextYearAriaLabel
                  ? strings.nextYearAriaLabel + ' ' + dateFormatter.formatYear(addYears(navigatedDate, 1))
                  : undefined
              }
              type="button"
            >
              <Icon iconName={getRTL() ? leftNavigationIcon : rightNavigationIcon} />
            </button>
          </div>
        </div>
        <FocusZone>
          <div className={classNames.gridContainer} role="grid">
            {rowIndexes.map((rowNum: number) => {
              const monthsForRow = strings.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW);
              return (
                <div
                  key={'monthRow_' + rowNum + navigatedDate.getFullYear()}
                  role="row"
                  className={classNames.buttonRow}
                >
                  {monthsForRow.map((month: string, index: number) => {
                    const monthIndex = rowNum * MONTHS_PER_ROW + index;
                    const indexedMonth = setMonth(navigatedDate, monthIndex);
                    const isCurrentMonth = this._isCurrentMonth(monthIndex, navigatedDate.getFullYear(), today!);
                    const isNavigatedMonth = navigatedDate.getMonth() === monthIndex;
                    const isSelectedMonth = selectedDate.getMonth() === monthIndex;
                    const isSelectedYear = selectedDate.getFullYear() === navigatedDate.getFullYear();
                    const isInBounds =
                      (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                      (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);

                    return (
                      <button
                        ref={isNavigatedMonth ? this.props.hoisted.navigatedMonthRef : undefined}
                        role={'gridcell'}
                        className={css(classNames.itemButton, {
                          [classNames.current]: highlightCurrentMonth && isCurrentMonth!,
                          [classNames.selected]: highlightSelectedMonth && isSelectedMonth && isSelectedYear,
                          [classNames.disabled]: !isInBounds,
                        })}
                        disabled={!allFocusable && !isInBounds}
                        key={monthIndex}
                        onClick={isInBounds ? this._selectMonthCallback(monthIndex) : undefined}
                        onKeyDown={
                          isInBounds ? this._onButtonKeyDown(this._selectMonthCallback(monthIndex)) : undefined
                        }
                        aria-label={dateFormatter.formatMonthYear(indexedMonth, strings)}
                        aria-selected={isNavigatedMonth}
                        data-is-focusable={isInBounds ? true : undefined}
                        type="button"
                        aria-readonly={true} // prevent grid from being "editable"
                      >
                        {month}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onButtonKeyDown = (callback: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (ev.which) {
        case KeyCodes.enter:
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
    const { onHeaderSelect, yearPickerHidden } = this.props;
    if (!yearPickerHidden) {
      this.props.hoisted.focusOnNextUpdate();
      this.setState({ isYearPickerVisible: true });
    } else if (onHeaderSelect) {
      onHeaderSelect();
    }
  };

  private _onSelectYear = (selectedYear: number) => {
    this.props.hoisted.focusOnNextUpdate();
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

  private _onYearPickerHeaderSelect = (focus: boolean): void => {
    this.props.hoisted.focusOnNextUpdate();
    this.setState({ isYearPickerVisible: false });
  };

  private _onRenderYear = (year: number) => {
    return this._yearToString(year);
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

  private _yearRangeToNextDecadeLabel = (yearRange: ICalendarYearRange) => {
    const { strings } = this.props;
    return strings.nextYearRangeAriaLabel
      ? `${strings.nextYearRangeAriaLabel} ${this._yearRangeToString(yearRange)}`
      : '';
  };

  private _yearRangeToPrevDecadeLabel = (yearRange: ICalendarYearRange) => {
    const { strings } = this.props;
    return strings.prevYearRangeAriaLabel
      ? `${strings.prevYearRangeAriaLabel} ${this._yearRangeToString(yearRange)}`
      : '';
  };
}
