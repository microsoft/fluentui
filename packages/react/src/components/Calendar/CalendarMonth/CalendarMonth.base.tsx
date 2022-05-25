import * as React from 'react';
import { FocusZone } from '../../../FocusZone';
import {
  addYears,
  setMonth,
  getYearStart,
  getYearEnd,
  getMonthStart,
  getMonthEnd,
  compareDatePart,
  DEFAULT_DATE_FORMATTING,
} from '@fluentui/date-time-utilities';
import { Icon } from '../../../Icon';
import { getStyles } from './CalendarMonth.styles';
import { css, getRTL, classNamesFunction, KeyCodes, format, getPropsWithDefaults } from '@fluentui/utilities';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import { usePrevious } from '@fluentui/react-hooks';
import { defaultCalendarNavigationIcons } from '../defaults';
import type { ICalendarMonthProps, ICalendarMonthStyles, ICalendarMonthStyleProps } from './CalendarMonth.types';
import type { ICalendarYear, ICalendarYearRange } from '../CalendarYear/CalendarYear.types';

const MONTHS_PER_ROW = 4;

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>();

const DEFAULT_PROPS: Readonly<Partial<ICalendarMonthProps>> = {
  styles: getStyles,
  strings: undefined,
  navigationIcons: defaultCalendarNavigationIcons,
  dateTimeFormatter: DEFAULT_DATE_FORMATTING,
  yearPickerHidden: false,
};

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

  const focus = React.useCallback(() => {
    if (calendarYearRef.current) {
      calendarYearRef.current.focus();
    } else if (navigatedMonthRef.current) {
      navigatedMonthRef.current.focus();
    }
  }, []);

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

export const CalendarMonthBase: React.FunctionComponent<ICalendarMonthProps> = propsWithoutDefaults => {
  const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);
  const [navigatedMonthRef, calendarYearRef, focusOnNextUpdate] = useFocusLogic(props);
  const [isYearPickerVisible, setIsYearPickerVisible] = React.useState(false);

  const animateBackwards = useAnimateBackwards(props);

  const {
    navigatedDate,
    selectedDate,
    strings,
    today = new Date(),
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
    animationDirection,
    yearPickerHidden,
    onNavigateDate,
  } = props;

  const selectMonthCallback = (newMonth: number): (() => void) => {
    return () => onSelectMonth(newMonth);
  };

  const onSelectNextYear = (): void => {
    onNavigateDate(addYears(navigatedDate, 1), false);
  };

  const onSelectPrevYear = (): void => {
    onNavigateDate(addYears(navigatedDate, -1), false);
  };

  const onSelectMonth = (newMonth: number): void => {
    // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
    props.onHeaderSelect?.();
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  };

  const onHeaderSelect = (): void => {
    if (!yearPickerHidden) {
      focusOnNextUpdate();
      setIsYearPickerVisible(true);
    } else {
      props.onHeaderSelect?.();
    }
  };

  const onSelectYear = (selectedYear: number) => {
    focusOnNextUpdate();
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
    setIsYearPickerVisible(false);
  };

  const onYearPickerHeaderSelect = (focus: boolean): void => {
    focusOnNextUpdate();
    setIsYearPickerVisible(false);
  };

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
    hasHeaderClickCallback: !!props.onHeaderSelect || !yearPickerHidden,
    highlightCurrent: highlightCurrentMonth,
    highlightSelected: highlightSelectedMonth,
    animateBackwards: animateBackwards,
    animationDirection: animationDirection,
  });

  if (isYearPickerVisible) {
    const [onRenderYear, yearStrings] = getYearStrings(props);
    // use navigated date for the year picker
    return (
      <CalendarYear
        key={'calendarYear'}
        minYear={minDate ? minDate.getFullYear() : undefined}
        maxYear={maxDate ? maxDate.getFullYear() : undefined}
        // eslint-disable-next-line react/jsx-no-bind
        onSelectYear={onSelectYear}
        navigationIcons={navigationIcons}
        // eslint-disable-next-line react/jsx-no-bind
        onHeaderSelect={onYearPickerHeaderSelect}
        selectedYear={
          selectedDate ? selectedDate.getFullYear() : navigatedDate ? navigatedDate.getFullYear() : undefined
        }
        onRenderYear={onRenderYear}
        strings={yearStrings}
        componentRef={calendarYearRef}
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
    <div className={classNames.root}>
      <div className={classNames.headerContainer}>
        <button
          className={classNames.currentItemButton}
          onClick={onHeaderSelect}
          onKeyDown={onButtonKeyDown(onHeaderSelect)}
          aria-label={headerAriaLabel}
          data-is-focusable={!!props.onHeaderSelect || !yearPickerHidden}
          tabIndex={!!props.onHeaderSelect || !yearPickerHidden ? 0 : -1}
          type="button"
        >
          <span aria-live="polite" aria-atomic="true">
            {yearString}
          </span>
        </button>
        <div className={classNames.navigationButtonsContainer}>
          <button
            className={css(classNames.navigationButton, {
              [classNames.disabled]: !isPrevYearInBounds,
            })}
            aria-disabled={!isPrevYearInBounds}
            tabIndex={isPrevYearInBounds ? undefined : allFocusable ? 0 : -1}
            onClick={isPrevYearInBounds ? onSelectPrevYear : undefined}
            onKeyDown={isPrevYearInBounds ? onButtonKeyDown(onSelectPrevYear) : undefined}
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
            aria-disabled={!isNextYearInBounds}
            tabIndex={isNextYearInBounds ? undefined : allFocusable ? 0 : -1}
            onClick={isNextYearInBounds ? onSelectNextYear : undefined}
            onKeyDown={isNextYearInBounds ? onButtonKeyDown(onSelectNextYear) : undefined}
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
        <div className={classNames.gridContainer} role="grid" aria-label={yearString}>
          {rowIndexes.map((rowNum: number) => {
            const monthsForRow = strings.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW);
            return (
              <div key={'monthRow_' + rowNum + navigatedDate.getFullYear()} role="row" className={classNames.buttonRow}>
                {monthsForRow.map((month: string, index: number) => {
                  const monthIndex = rowNum * MONTHS_PER_ROW + index;
                  const indexedMonth = setMonth(navigatedDate, monthIndex);
                  const isNavigatedMonth = navigatedDate.getMonth() === monthIndex;
                  const isSelectedMonth = selectedDate.getMonth() === monthIndex;
                  const isSelectedYear = selectedDate.getFullYear() === navigatedDate.getFullYear();
                  const isInBounds =
                    (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                    (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);

                  return (
                    <button
                      ref={isNavigatedMonth ? navigatedMonthRef : undefined}
                      role={'gridcell'}
                      className={css(classNames.itemButton, {
                        [classNames.current]:
                          highlightCurrentMonth && isCurrentMonth(monthIndex, navigatedDate.getFullYear(), today),
                        [classNames.selected]: highlightSelectedMonth && isSelectedMonth && isSelectedYear,
                        [classNames.disabled]: !isInBounds,
                      })}
                      disabled={!allFocusable && !isInBounds}
                      key={monthIndex}
                      onClick={isInBounds ? selectMonthCallback(monthIndex) : undefined}
                      onKeyDown={isInBounds ? onButtonKeyDown(selectMonthCallback(monthIndex)) : undefined}
                      aria-label={dateFormatter.formatMonth(indexedMonth, strings)}
                      aria-selected={isNavigatedMonth}
                      data-is-focusable={isInBounds ? true : undefined}
                      type="button"
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
};
CalendarMonthBase.displayName = 'CalendarMonthBase';

function getYearStrings({ strings, navigatedDate, dateTimeFormatter }: ICalendarMonthProps) {
  const yearToString = (year: number) => {
    if (dateTimeFormatter) {
      // create a date based on the current nav date
      const yearFormattingDate = new Date(navigatedDate.getTime());
      yearFormattingDate.setFullYear(year);
      return dateTimeFormatter.formatYear(yearFormattingDate);
    }
    return String(year);
  };

  const yearRangeToString = (yearRange: ICalendarYearRange) => {
    return `${yearToString(yearRange.fromYear)} - ${yearToString(yearRange.toYear)}`;
  };

  const yearRangeToNextDecadeLabel = (yearRange: ICalendarYearRange) => {
    return strings.nextYearRangeAriaLabel ? `${strings.nextYearRangeAriaLabel} ${yearRangeToString(yearRange)}` : '';
  };

  const yearRangeToPrevDecadeLabel = (yearRange: ICalendarYearRange) => {
    return strings.prevYearRangeAriaLabel ? `${strings.prevYearRangeAriaLabel} ${yearRangeToString(yearRange)}` : '';
  };

  return [
    yearToString,
    {
      rangeAriaLabel: yearRangeToString,
      prevRangeAriaLabel: yearRangeToPrevDecadeLabel,
      nextRangeAriaLabel: yearRangeToNextDecadeLabel,
      headerAriaLabelFormatString: strings.yearPickerHeaderAriaLabel,
    } as const,
  ] as const;
}

function isCurrentMonth(month: number, year: number, today: Date): boolean {
  return today.getFullYear() === year && today.getMonth() === month;
}

function onButtonKeyDown(callback: () => void): (ev: React.KeyboardEvent<HTMLButtonElement>) => void {
  return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.enter:
        callback();
        break;
    }
  };
}
