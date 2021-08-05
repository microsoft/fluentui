import * as React from 'react';
import { KeyCodes, css, classNamesFunction, format } from '@fluentui/utilities';
import { Icon } from '../../../Icon';
import { addMonths, compareDatePart, getMonthStart, getMonthEnd } from '@fluentui/date-time-utilities';
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { IProcessedStyleSet } from '@fluentui/style-utilities';
import { CalendarDayGrid } from '../../CalendarDayGrid/CalendarDayGrid';
import { ICalendarDayGrid } from '../../CalendarDayGrid/CalendarDayGrid.types';
import { useId } from '@fluentui/react-hooks';

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

export const CalendarDayBase: React.FunctionComponent<ICalendarDayProps> = props => {
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
    styles,
    theme,
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
  const dayPickerId = useId();
  const monthAndYearId = useId();

  const classNames = getClassNames(styles, {
    theme: theme!,
    className: className,
    headerIsClickable: !!onHeaderSelect,
    showWeekNumbers: showWeekNumbers,
    animationDirection: animationDirection,
  });

  const monthAndYear = dateTimeFormatter.formatMonthYear(navigatedDate, strings);
  const HeaderButtonComponentType = onHeaderSelect ? 'button' : 'div';
  const headerAriaLabel = strings.yearPickerHeaderAriaLabel
    ? format(strings.yearPickerHeaderAriaLabel, monthAndYear)
    : monthAndYear;

  return (
    <div className={classNames.root} id={dayPickerId}>
      <div className={classNames.header}>
        <HeaderButtonComponentType
          // if this component rerenders when text changes, aria-live will not be announced, so make key consistent
          aria-live="polite"
          aria-atomic="true"
          aria-label={onHeaderSelect ? headerAriaLabel : undefined}
          key={monthAndYear}
          className={classNames.monthAndYear}
          onClick={onHeaderSelect}
          data-is-focusable={!!onHeaderSelect}
          tabIndex={onHeaderSelect ? 0 : -1} // prevent focus if there's no action for the button
          onKeyDown={onButtonKeyDown(onHeaderSelect)}
          type="button"
        >
          <span id={monthAndYearId}>{monthAndYear}</span>
        </HeaderButtonComponentType>
        <CalendarDayNavigationButtons {...props} classNames={classNames} dayPickerId={dayPickerId} />
      </div>
      <CalendarDayGrid
        {...props}
        styles={styles}
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
CalendarDayBase.displayName = 'CalendarDayBase';

interface ICalendarDayNavigationButtonsProps extends ICalendarDayProps {
  classNames: IProcessedStyleSet<ICalendarDayStyles>;
  dayPickerId: string;
}

const CalendarDayNavigationButtons = (props: ICalendarDayNavigationButtonsProps): JSX.Element => {
  const {
    minDate,
    maxDate,
    navigatedDate,
    allFocusable,
    strings,
    navigationIcons,
    showCloseButton,
    classNames,
    dayPickerId,
    onNavigateDate,
    onDismiss,
  } = props;

  const onSelectNextMonth = (): void => {
    onNavigateDate(addMonths(navigatedDate, 1), false);
  };

  const onSelectPrevMonth = (): void => {
    onNavigateDate(addMonths(navigatedDate, -1), false);
  };
  const leftNavigationIcon = navigationIcons.leftNavigation;
  const rightNavigationIcon = navigationIcons.rightNavigation;
  const closeNavigationIcon = navigationIcons.closeIcon;

  // determine if previous/next months are in bounds
  const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
  const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

  // use aria-disabled instead of disabled so focus is not lost
  // when a prev/next button becomes disabled after being clicked
  return (
    <div className={classNames.monthComponents}>
      <button
        className={css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !prevMonthInBounds,
        })}
        tabIndex={prevMonthInBounds ? undefined : allFocusable ? 0 : -1}
        aria-disabled={!prevMonthInBounds}
        onClick={prevMonthInBounds ? onSelectPrevMonth : undefined}
        onKeyDown={prevMonthInBounds ? onButtonKeyDown(onSelectPrevMonth) : undefined}
        aria-controls={dayPickerId}
        title={
          strings.prevMonthAriaLabel
            ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
            : undefined
        }
        type="button"
      >
        <Icon iconName={leftNavigationIcon} />
      </button>
      <button
        className={css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !nextMonthInBounds,
        })}
        tabIndex={nextMonthInBounds ? undefined : allFocusable ? 0 : -1}
        aria-disabled={!nextMonthInBounds}
        onClick={nextMonthInBounds ? onSelectNextMonth : undefined}
        onKeyDown={nextMonthInBounds ? onButtonKeyDown(onSelectNextMonth) : undefined}
        aria-controls={dayPickerId}
        title={
          strings.nextMonthAriaLabel
            ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
            : undefined
        }
        type="button"
      >
        <Icon iconName={rightNavigationIcon} />
      </button>
      {showCloseButton && (
        <button
          className={css(classNames.headerIconButton)}
          onClick={onDismiss}
          onKeyDown={onButtonKeyDown(onDismiss)}
          title={strings.closeButtonAriaLabel}
          type="button"
        >
          <Icon iconName={closeNavigationIcon} />
        </button>
      )}
    </div>
  );
};
CalendarDayNavigationButtons.displayName = 'CalendarDayNavigationButtons';

const onButtonKeyDown = (
  callback?: () => void,
): ((ev: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => void) => (
  ev: React.KeyboardEvent<HTMLButtonElement>,
) => {
  // eslint-disable-next-line deprecation/deprecation
  switch (ev.which) {
    case KeyCodes.enter:
      callback?.();
      break;
  }
};
