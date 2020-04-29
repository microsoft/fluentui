import * as React from 'react';
import { KeyCodes, css, getRTL, IRefObject } from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { FocusZone } from '../../FocusZone';
import {
  addYears,
  setMonth,
  getYearStart,
  getYearEnd,
  getMonthStart,
  getMonthEnd,
  compareDatePart,
} from '../../utilities/dateMath/DateMath';
import { Icon } from '../../Icon';
import * as stylesImport from './Calendar.scss';
import { CalendarYear, ICalendarYearRange, ICalendarYear } from './CalendarYear';
const styles: any = stylesImport;
const MONTHS_PER_ROW: number = 4;

export interface ICalendarMonth {
  focus(): void;
}

export interface ICalendarMonthProps {
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

function useFocusHandler(
  { componentRef }: ICalendarMonthProps,
  _calendarYearRef: React.RefObject<ICalendarYear | null>,
  _navigatedMonthRef: React.RefObject<HTMLButtonElement | null>,
) {
  const _focusOnUpdate = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (_focusOnUpdate.current) {
      focus();
      _focusOnUpdate.current = false;
    }
  });

  const focus = React.useCallback(() => {
    if (_calendarYearRef.current) {
      _calendarYearRef.current.focus();
    } else if (_navigatedMonthRef.current) {
      _navigatedMonthRef.current.tabIndex = 0;
      _navigatedMonthRef.current.focus();
    }
  }, []);

  React.useImperativeHandle(componentRef, () => ({ focus }), [focus]);

  const setFocusOnUpdate = React.useCallback((shouldFocus: boolean) => {
    _focusOnUpdate.current = shouldFocus;
  }, []);

  return setFocusOnUpdate;
}

function useYearSelectionCallbacks(
  props: ICalendarMonthProps,
  setFocusOnUpdate: (shouldFocus: boolean) => void,
  setIsYearPickerVisible: (isVisible: boolean) => void,
) {
  const _onSelectYear = React.useCallback(
    (selectedYear: number) => {
      setFocusOnUpdate(true);
      const { navigatedDate, onNavigateDate, maxDate, minDate } = props;
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
    },
    [props.navigatedDate, props.onNavigateDate, props.maxDate, props.minDate, setFocusOnUpdate],
  );

  const _createSelectAdjacentYearCallback = React.useCallback(
    (offset: number) => () => {
      const { navigatedDate, onNavigateDate } = props;
      onNavigateDate(addYears(navigatedDate, offset), false);
    },
    [props.navigatedDate, props.onNavigateDate],
  );

  const _onSelectNextYear = React.useCallback(_createSelectAdjacentYearCallback(1), [
    _createSelectAdjacentYearCallback,
  ]);

  const _onSelectNextYearKeyDown = React.useCallback(_onKeyDown(_onSelectNextYear), [_onSelectNextYear]);

  const _onSelectPrevYear = React.useCallback(_createSelectAdjacentYearCallback(-1), [
    _createSelectAdjacentYearCallback,
  ]);

  const _onSelectPrevYearKeyDown = React.useCallback(_onKeyDown(_onSelectPrevYear), [_onSelectPrevYear]);

  return [
    _onSelectYear,
    _onSelectNextYear,
    _onSelectNextYearKeyDown,
    _onSelectPrevYear,
    _onSelectPrevYearKeyDown,
  ] as const;
}

function useStringFunctions(props: ICalendarMonthProps) {
  const _yearToString = React.useCallback(
    (year: number) => {
      const { navigatedDate, dateTimeFormatter } = props;
      if (dateTimeFormatter) {
        // create a date based on the current nav date
        const yearFormattingDate = new Date(navigatedDate.getTime());
        yearFormattingDate.setFullYear(year);
        return dateTimeFormatter.formatYear(yearFormattingDate);
      }
      return String(year);
    },
    [props.navigatedDate, props.dateTimeFormatter],
  );

  const _yearRangeToString = React.useCallback(
    (yearRange: ICalendarYearRange) => {
      return `${_yearToString(yearRange.fromYear)} - ${_yearToString(yearRange.toYear)}`;
    },
    [_yearToString],
  );

  const _yearRangeToAriaLabel = React.useCallback(
    (baseAriaLabel?: string) => (yearRange: ICalendarYearRange) => {
      return baseAriaLabel ? `${baseAriaLabel} ${_yearRangeToString(yearRange)}` : '';
    },
    [_yearRangeToString],
  );

  const _yearRangeToNextDecadeLabel = React.useCallback(_yearRangeToAriaLabel(props.strings.nextYearRangeAriaLabel), [
    props.strings.nextYearRangeAriaLabel,
  ]);

  const _yearRangeToPrevDecadeLabel = React.useCallback(_yearRangeToAriaLabel(props.strings.prevYearRangeAriaLabel), [
    props.strings.nextYearRangeAriaLabel,
  ]);

  return [_yearToString, _yearRangeToString, _yearRangeToNextDecadeLabel, _yearRangeToPrevDecadeLabel] as const;
}

export const CalendarMonth = React.memo(
  React.forwardRef((props: ICalendarMonthProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const [isYearPickerVisible, setIsYearPickerVisible] = React.useState(false);
    const _calendarYearRef = React.useRef<ICalendarYear | null>(null);
    const _navigatedMonthRef = React.useRef<HTMLButtonElement | null>(null);

    const setFocusOnUpdate = useFocusHandler(props, _calendarYearRef, _navigatedMonthRef);
    const [
      _onSelectYear,
      _onSelectNextYear,
      _onSelectNextYearKeyDown,
      _onSelectPrevYear,
      _onSelectPrevYearKeyDown,
    ] = useYearSelectionCallbacks(props, setFocusOnUpdate, setIsYearPickerVisible);

    const [
      _yearToString,
      _yearRangeToString,
      _yearRangeToNextDecadeLabel,
      _yearRangeToPrevDecadeLabel,
    ] = useStringFunctions(props);

    const {
      navigatedDate,
      strings,
      navigationIcons,
      dateTimeFormatter,
      minDate,
      maxDate,
      yearPickerHidden,
      onHeaderSelect,
    } = props;

    const _onYearPickerHeaderSelect = React.useCallback(
      (focus: boolean): void => {
        setFocusOnUpdate(focus);
        setIsYearPickerVisible(false);
      },
      [setFocusOnUpdate],
    );

    const _onHeaderSelect = React.useCallback((): void => {
      if (!yearPickerHidden) {
        setFocusOnUpdate(true);
        setIsYearPickerVisible(true);
      } else if (onHeaderSelect) {
        onHeaderSelect(true);
      }
    }, [onHeaderSelect, yearPickerHidden, setFocusOnUpdate]);

    const _onHeaderKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement>): void => {
        if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
          _onHeaderSelect();
        }
      },
      [_onHeaderSelect],
    );

    if (isYearPickerVisible) {
      // default the year picker to the current navigated date
      const currentSelectedDate = navigatedDate ? navigatedDate.getFullYear() : undefined;
      return (
        <CalendarYear
          key={'calendarYear_' + (currentSelectedDate && currentSelectedDate.toString())}
          minYear={minDate ? minDate.getFullYear() : undefined}
          maxYear={maxDate ? maxDate.getFullYear() : undefined}
          onSelectYear={_onSelectYear}
          navigationIcons={navigationIcons}
          onHeaderSelect={_onYearPickerHeaderSelect}
          selectedYear={currentSelectedDate}
          onRenderYear={_yearToString}
          strings={{
            rangeAriaLabel: _yearRangeToString,
            prevRangeAriaLabel: _yearRangeToPrevDecadeLabel,
            nextRangeAriaLabel: _yearRangeToNextDecadeLabel,
          }}
          componentRef={_calendarYearRef}
          ref={forwardedRef}
        />
      );
    }

    const rowIndexes = [];
    for (let i = 0; i < strings.shortMonths.length / MONTHS_PER_ROW; i++) {
      rowIndexes.push(i);
    }

    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div className={css('ms-DatePicker-monthPicker', styles.monthPicker)} ref={forwardedRef}>
        <div className={css('ms-DatePicker-header', styles.header)}>
          {props.onHeaderSelect || !yearPickerHidden ? (
            <div
              className={css(
                'ms-DatePicker-currentYear js-showYearPicker',
                styles.currentYear,
                styles.headerToggleView,
              )}
              onClick={_onHeaderSelect}
              onKeyDown={_onHeaderKeyDown}
              aria-label={dateTimeFormatter.formatYear(navigatedDate)}
              role="button"
              aria-atomic={true}
              aria-live="polite"
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
                  ['ms-DatePicker-prevYear--disabled ' + styles.prevYearIsDisabled]: !isPrevYearInBounds,
                })}
                disabled={!isPrevYearInBounds}
                onClick={isPrevYearInBounds ? _onSelectPrevYear : undefined}
                onKeyDown={isPrevYearInBounds ? _onSelectPrevYearKeyDown : undefined}
                title={
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
                  ['ms-DatePicker-nextYear--disabled ' + styles.nextYearIsDisabled]: !isNextYearInBounds,
                })}
                disabled={!isNextYearInBounds}
                onClick={isNextYearInBounds ? _onSelectNextYear : undefined}
                onKeyDown={isNextYearInBounds ? _onSelectNextYearKeyDown : undefined}
                title={
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
            {rowIndexes.map((rowNum: number) => {
              const monthsForRow = strings.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW);
              return (
                <div key={'monthRow_' + rowNum} role="row">
                  {monthsForRow.map((month: string, index: number) => {
                    const monthIndex = rowNum * MONTHS_PER_ROW + index;
                    return (
                      <CalendarMonthButton
                        key={monthIndex}
                        monthIndex={monthIndex}
                        {...props}
                        ref={navigatedDate.getMonth() === monthIndex ? _navigatedMonthRef : undefined}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </FocusZone>
      </div>
    );
  }),
);

const CalendarMonthButton = React.memo(
  React.forwardRef(
    (
      {
        navigatedDate,
        monthIndex,
        today,
        selectedDate,
        minDate,
        maxDate,
        highlightCurrentMonth,
        highlightSelectedMonth,
        strings,
        dateTimeFormatter,
        onNavigateDate,
        onHeaderSelect,
      }: {
        monthIndex: number;
      } & ICalendarMonthProps,
      forwardedRef: React.Ref<HTMLButtonElement>,
    ) => {
      const indexedMonth = setMonth(navigatedDate, monthIndex);
      const isCurrentMonth = _isCurrentMonth(monthIndex, navigatedDate.getFullYear(), today!);
      const isNavigatedMonth = navigatedDate.getMonth() === monthIndex;
      const isSelectedMonth = selectedDate.getMonth() === monthIndex;
      const isSelectedYear = selectedDate.getFullYear() === navigatedDate.getFullYear();
      const isInBounds =
        (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
        (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);

      const _onSelectMonth = React.useCallback((): void => {
        // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
        onHeaderSelect?.(true);
        onNavigateDate(setMonth(navigatedDate, monthIndex), true);
      }, [onHeaderSelect, onNavigateDate, navigatedDate, monthIndex]);

      const _onSelectMonthKeyDown = React.useCallback(_onKeyDown(_onSelectMonth), [_onSelectMonth]);

      return (
        <button
          role={'gridcell'}
          className={css('ms-DatePicker-monthOption', styles.monthOption, {
            ['ms-DatePicker-day--today ' + styles.monthIsCurrentMonth]: highlightCurrentMonth && isCurrentMonth!,
            ['ms-DatePicker-day--highlighted ' + styles.monthIsHighlighted]:
              (highlightCurrentMonth || highlightSelectedMonth) && isSelectedMonth && isSelectedYear,
            ['ms-DatePicker-monthOption--disabled ' + styles.monthOptionIsDisabled]: !isInBounds,
          })}
          disabled={!isInBounds}
          key={monthIndex}
          onClick={isInBounds ? _onSelectMonth : undefined}
          onKeyDown={isInBounds ? _onSelectMonthKeyDown : undefined}
          aria-label={dateTimeFormatter.formatMonthYear(indexedMonth, strings)}
          aria-selected={isNavigatedMonth}
          data-is-focusable={isInBounds ? true : undefined}
          ref={forwardedRef}
          type="button"
        >
          {strings.shortMonths[monthIndex]}
        </button>
      );
    },
  ),
);

function _isCurrentMonth(month: number, year: number, today: Date): boolean {
  return today.getFullYear() === year && today.getMonth() === month;
}

const _onKeyDown = (callback: () => void) => (ev: React.KeyboardEvent<HTMLElement>): void => {
  if (ev.which === KeyCodes.enter) {
    callback();
  }
};
