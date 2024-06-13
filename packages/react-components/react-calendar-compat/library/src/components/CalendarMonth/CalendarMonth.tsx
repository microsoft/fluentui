import * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { mergeClasses } from '@griffel/react';
import {
  addYears,
  compareDatePart,
  getMonthEnd,
  getMonthStart,
  getYearEnd,
  getYearStart,
  setMonth,
  DEFAULT_DATE_FORMATTING,
} from '../../utils';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import { useCalendarMonthStyles_unstable } from './useCalendarMonthStyles.styles';
import type { CalendarMonthProps } from './CalendarMonth.types';
import type { CalendarYearRange, ICalendarYear } from '../CalendarYear/CalendarYear.types';

const MONTHS_PER_ROW = 4;

function useAnimateBackwards({ navigatedDate }: { navigatedDate: CalendarMonthProps['navigatedDate'] }) {
  const currentYear = navigatedDate.getFullYear();

  const previousYearRef = React.useRef<number | undefined>();
  React.useEffect(() => {
    previousYearRef.current = currentYear;
  });
  const previousYear = previousYearRef.current;

  if (previousYear === undefined || previousYear === currentYear) {
    return undefined;
  } else {
    return previousYear > currentYear;
  }
}

function useFocusLogic({ componentRef }: { componentRef: CalendarMonthProps['componentRef'] }) {
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

/**
 * @internal
 */
export const CalendarMonth: React.FunctionComponent<CalendarMonthProps> = props => {
  const {
    allFocusable,
    animationDirection,
    className,
    componentRef,
    dateTimeFormatter = DEFAULT_DATE_FORMATTING,
    highlightCurrentMonth,
    highlightSelectedMonth,
    maxDate,
    minDate,
    navigatedDate,
    navigationIcons,
    onHeaderSelect: onUserHeaderSelect,
    onNavigateDate,
    selectedDate,
    strings,
    today = new Date(),
    yearPickerHidden = false,
  } = props;

  const [navigatedMonthRef, calendarYearRef, focusOnNextUpdate] = useFocusLogic({ componentRef });
  const [isYearPickerVisible, setIsYearPickerVisible] = React.useState(false);

  const animateBackwards = useAnimateBackwards({ navigatedDate });

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
    onUserHeaderSelect?.();
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  };

  const onHeaderSelect = (): void => {
    if (!yearPickerHidden) {
      focusOnNextUpdate();
      setIsYearPickerVisible(true);
    } else {
      onUserHeaderSelect?.();
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

  const dateFormatter = dateTimeFormatter!;

  // determine if previous/next years are in bounds
  const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
  const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

  const classNames = useCalendarMonthStyles_unstable({
    className,
    hasHeaderClickCallback: !!onUserHeaderSelect || !yearPickerHidden,
    highlightCurrent: highlightCurrentMonth,
    highlightSelected: highlightSelectedMonth,
    animateBackwards,
    animationDirection,
  });

  const arrowNavigationAttributes = useArrowNavigationGroup({ axis: 'grid' });

  if (isYearPickerVisible) {
    const [onRenderYear, yearStrings] = getYearStrings({ dateTimeFormatter, navigatedDate, strings });
    // use navigated date for the year picker
    return (
      <CalendarYear
        key={'calendarYear'}
        minYear={minDate ? minDate.getFullYear() : undefined}
        maxYear={maxDate ? maxDate.getFullYear() : undefined}
        // eslint-disable-next-line react/jsx-no-bind
        onSelectYear={onSelectYear}
        // eslint-disable-next-line react/jsx-no-bind
        onHeaderSelect={onYearPickerHeaderSelect}
        selectedYear={
          selectedDate ? selectedDate.getFullYear() : navigatedDate ? navigatedDate.getFullYear() : undefined
        }
        navigatedYear={navigatedDate.getFullYear()}
        navigationIcons={navigationIcons}
        onRenderYear={onRenderYear}
        strings={yearStrings}
        componentRef={calendarYearRef}
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
    ? strings.monthPickerHeaderAriaLabel.replace('{0}', yearString)
    : yearString;

  return (
    <div className={classNames.root}>
      <div className={classNames.headerContainer}>
        <button
          className={classNames.currentItemButton}
          onClick={onHeaderSelect}
          onKeyDown={onButtonKeyDown(onHeaderSelect)}
          aria-label={headerAriaLabel}
          tabIndex={!!onUserHeaderSelect || !yearPickerHidden ? 0 : -1}
          type="button"
        >
          <span aria-live="polite" aria-atomic="true">
            {yearString}
          </span>
        </button>
        <div className={classNames.navigationButtonsContainer}>
          <button
            className={mergeClasses(classNames.navigationButton, !isPrevYearInBounds && classNames.disabled)}
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
            {navigationIcons.upNavigation}
          </button>
          <button
            className={mergeClasses(classNames.navigationButton, !isNextYearInBounds && classNames.disabled)}
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
            {navigationIcons.downNavigation}
          </button>
        </div>
      </div>
      <div {...arrowNavigationAttributes} className={classNames.gridContainer} role="grid" aria-label={yearString}>
        {rowIndexes.map((rowNum: number) => {
          const monthsForRow = strings!.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW);
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
                    className={mergeClasses(
                      classNames.itemButton,
                      highlightCurrentMonth &&
                        isCurrentMonth(monthIndex, navigatedDate.getFullYear(), today) &&
                        classNames.current,
                      highlightSelectedMonth && isSelectedMonth && isSelectedYear && classNames.selected,
                      !isInBounds && classNames.disabled,
                    )}
                    disabled={!allFocusable && !isInBounds}
                    key={monthIndex}
                    onClick={isInBounds ? selectMonthCallback(monthIndex) : undefined}
                    onKeyDown={isInBounds ? onButtonKeyDown(selectMonthCallback(monthIndex)) : undefined}
                    aria-label={dateFormatter.formatMonth(indexedMonth, strings!)}
                    aria-selected={isNavigatedMonth}
                    tabIndex={isInBounds ? 0 : -1}
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
    </div>
  );
};
CalendarMonth.displayName = 'CalendarMonth';

function getYearStrings({
  dateTimeFormatter,
  navigatedDate,
  strings,
}: Pick<CalendarMonthProps, 'dateTimeFormatter' | 'navigatedDate' | 'strings'>) {
  const yearToString = (year: number) => {
    if (dateTimeFormatter) {
      // create a date based on the current nav date
      const yearFormattingDate = new Date(navigatedDate.getTime());
      yearFormattingDate.setFullYear(year);
      return dateTimeFormatter.formatYear(yearFormattingDate);
    }
    return String(year);
  };

  const yearRangeToString = (yearRange: CalendarYearRange) => {
    return `${yearToString(yearRange.fromYear)} - ${yearToString(yearRange.toYear)}`;
  };

  const yearRangeToNextDecadeLabel = (yearRange: CalendarYearRange) => {
    return strings.nextYearRangeAriaLabel ? `${strings.nextYearRangeAriaLabel} ${yearRangeToString(yearRange)}` : '';
  };

  const yearRangeToPrevDecadeLabel = (yearRange: CalendarYearRange) => {
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
    switch (ev.key) {
      case Enter:
        callback();
        break;
    }
  };
}
