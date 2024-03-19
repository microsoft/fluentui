import * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { useId } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { addMonths, compareDatePart, getMonthEnd, getMonthStart } from '../../utils';
import { CalendarDayGrid } from '../CalendarDayGrid/CalendarDayGrid';
import { useCalendarDayStyles_unstable } from './useCalendarDayStyles.styles';
import type { ICalendarDayGrid } from '../CalendarDayGrid/CalendarDayGrid.types';
import type { CalendarDayProps, CalendarDayStyles } from './CalendarDay.types';

/**
 * @internal
 */
export const CalendarDay: React.FunctionComponent<CalendarDayProps> = props => {
  const dayGrid = React.useRef<ICalendarDayGrid>(null);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus() {
        dayGrid.current?.focus?.();
      },
    }),
    [],
  );

  const {
    strings,
    navigatedDate,
    dateTimeFormatter,
    className,
    onHeaderSelect,
    showSixWeeksByDefault,
    minDate,
    maxDate,
    restrictedDates,
    onNavigateDate,
    showWeekNumbers,
    dateRangeType,
    animationDirection,
  } = props;
  const monthAndYearId = useId();

  const classNames = useCalendarDayStyles_unstable({
    className,
    headerIsClickable: !!onHeaderSelect,
    showWeekNumbers,
    animationDirection,
  });

  const monthAndYear = dateTimeFormatter.formatMonthYear(navigatedDate, strings);
  const HeaderButtonComponentType = onHeaderSelect ? 'button' : 'div';
  const headerAriaLabel = strings.yearPickerHeaderAriaLabel
    ? strings.yearPickerHeaderAriaLabel.replace('{0}', monthAndYear)
    : monthAndYear;

  const { ...propsWithoutStyles } = props;

  return (
    <div className={classNames.root}>
      <div className={classNames.header}>
        <HeaderButtonComponentType
          aria-label={onHeaderSelect ? headerAriaLabel : undefined}
          className={classNames.monthAndYear}
          onClick={onHeaderSelect}
          tabIndex={onHeaderSelect ? 0 : -1} // prevent focus if there's no action for the button
          onKeyDown={onButtonKeyDown(onHeaderSelect)}
          type="button"
        >
          <span id={monthAndYearId} aria-live="polite" aria-atomic="true">
            {monthAndYear}
          </span>
        </HeaderButtonComponentType>
        <CalendarDayNavigationButtons {...props} classNames={classNames} />
      </div>
      <CalendarDayGrid
        {...propsWithoutStyles}
        componentRef={dayGrid}
        strings={strings}
        navigatedDate={navigatedDate!}
        weeksToShow={showSixWeeksByDefault ? 6 : undefined}
        dateTimeFormatter={dateTimeFormatter!}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        onNavigateDate={onNavigateDate}
        labelledBy={monthAndYearId}
        dateRangeType={dateRangeType}
      />
    </div>
  );
};
CalendarDay.displayName = 'CalendarDay';

interface CalendarDayNavigationButtonsProps extends CalendarDayProps {
  classNames: Record<keyof CalendarDayStyles, string>;
}

const CalendarDayNavigationButtons = (props: CalendarDayNavigationButtonsProps): JSX.Element => {
  const {
    minDate,
    maxDate,
    navigatedDate,
    navigationIcons,
    allFocusable,
    strings,
    showCloseButton,
    classNames,
    onNavigateDate,
    onDismiss,
  } = props;

  const onSelectNextMonth = (): void => {
    onNavigateDate(addMonths(navigatedDate, 1), false);
  };

  const onSelectPrevMonth = (): void => {
    onNavigateDate(addMonths(navigatedDate, -1), false);
  };

  // determine if previous/next months are in bounds
  const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
  const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

  // use aria-disabled instead of disabled so focus is not lost
  // when a prev/next button becomes disabled after being clicked
  return (
    <div className={classNames.monthComponents}>
      <button
        className={mergeClasses(classNames.headerIconButton, !prevMonthInBounds && classNames.disabledStyle)}
        tabIndex={prevMonthInBounds ? undefined : allFocusable ? 0 : -1}
        aria-disabled={!prevMonthInBounds}
        onClick={prevMonthInBounds ? onSelectPrevMonth : undefined}
        onKeyDown={prevMonthInBounds ? onButtonKeyDown(onSelectPrevMonth) : undefined}
        title={
          strings.prevMonthAriaLabel
            ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
            : undefined
        }
        type="button"
      >
        {navigationIcons.upNavigation}
      </button>
      <button
        className={mergeClasses(classNames.headerIconButton, !nextMonthInBounds && classNames.disabledStyle)}
        tabIndex={nextMonthInBounds ? undefined : allFocusable ? 0 : -1}
        aria-disabled={!nextMonthInBounds}
        onClick={nextMonthInBounds ? onSelectNextMonth : undefined}
        onKeyDown={nextMonthInBounds ? onButtonKeyDown(onSelectNextMonth) : undefined}
        title={
          strings.nextMonthAriaLabel
            ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
            : undefined
        }
        type="button"
      >
        {navigationIcons.downNavigation}
      </button>
      {showCloseButton && (
        <button
          className={classNames.headerIconButton}
          onClick={onDismiss}
          onKeyDown={onButtonKeyDown(onDismiss)}
          title={strings.closeButtonAriaLabel}
          type="button"
        >
          {navigationIcons.dismiss}
        </button>
      )}
    </div>
  );
};
CalendarDayNavigationButtons.displayName = 'CalendarDayNavigationButtons';

const onButtonKeyDown =
  (callback?: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => void) =>
  (ev: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
    switch (ev.key) {
      case Enter:
        callback?.();
        break;
    }
  };
