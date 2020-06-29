import * as React from 'react';
import { KeyCodes, css, getId, classNamesFunction } from '@uifabric/utilities';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
  addMonths,
  compareDatePart,
  getMonthStart,
  getMonthEnd,
} from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { IProcessedStyleSet } from '@uifabric/styling';
import { CalendarDayGrid } from '../../CalendarDayGrid/CalendarDayGrid';
import { ICalendarDayGrid } from '../../CalendarDayGrid/CalendarDayGrid.types';

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

export const CalendarDayBase = React.forwardRef((props: ICalendarDayProps, forwardedRef: React.Ref<HTMLDivElement>) => {
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

  return <CalendarDayBaseClass {...props} hoisted={{ forwardedRef, dayGrid }} />;
});
CalendarDayBase.displayName = 'CalendarDayBase';

interface ICalendarDayClassProps extends ICalendarDayProps {
  hoisted: {
    forwardedRef: React.Ref<HTMLDivElement>;
    dayGrid: React.RefObject<ICalendarDayGrid>;
  };
}

class CalendarDayBaseClass extends React.Component<ICalendarDayClassProps, {}> {
  public render(): JSX.Element {
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
    } = this.props;
    const dayPickerId = getId();
    const monthAndYearId = getId();

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      headerIsClickable: !!onHeaderSelect,
      showWeekNumbers: showWeekNumbers,
      animationDirection: animationDirection,
    });

    const monthAndYear = dateTimeFormatter.formatMonthYear(navigatedDate, strings);

    return (
      <div className={classNames.root} id={dayPickerId}>
        <div className={classNames.header}>
          <button
            // if this component rerenders when text changes, aria-live will not be announced, so make key consistent
            aria-live="polite"
            aria-atomic="true"
            key={monthAndYear}
            id={monthAndYearId}
            className={classNames.monthAndYear}
            onClick={this.props.onHeaderSelect}
            data-is-focusable={!!onHeaderSelect}
            tabIndex={!!onHeaderSelect ? 0 : -1} // prevent focus if there's no action for the button
            onKeyDown={this._onButtonKeyDown(this.props.onHeaderSelect)}
            type="button"
          >
            {monthAndYear}
          </button>
          {this.renderMonthNavigationButtons(classNames, dayPickerId)}
        </div>
        <CalendarDayGrid
          {...this.props}
          styles={styles}
          componentRef={this.props.hoisted.dayGrid}
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
  }

  private renderMonthNavigationButtons = (
    classNames: IProcessedStyleSet<ICalendarDayStyles>,
    dayPickerId: string,
  ): JSX.Element => {
    const { minDate, maxDate, navigatedDate, allFocusable, strings, navigationIcons, showCloseButton } = this.props;
    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;
    const closeNavigationIcon = navigationIcons.closeIcon;

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div className={classNames.monthComponents}>
        <button
          className={css(classNames.headerIconButton, {
            [classNames.disabledStyle]: !prevMonthInBounds,
          })}
          disabled={!allFocusable && !prevMonthInBounds}
          aria-disabled={!prevMonthInBounds}
          onClick={prevMonthInBounds ? this._onSelectPrevMonth : undefined}
          onKeyDown={prevMonthInBounds ? this._onButtonKeyDown(this._onSelectPrevMonth) : undefined}
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
          disabled={!allFocusable && !nextMonthInBounds}
          aria-disabled={!nextMonthInBounds}
          onClick={nextMonthInBounds ? this._onSelectNextMonth : undefined}
          onKeyDown={nextMonthInBounds ? this._onButtonKeyDown(this._onSelectNextMonth) : undefined}
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
            onClick={this.props.onDismiss}
            onKeyDown={this._onButtonKeyDown(this.props.onDismiss)}
            title={strings.closeButtonAriaLabel}
            type="button"
          >
            <Icon iconName={closeNavigationIcon} />
          </button>
        )}
      </div>
    );
  };

  private _onSelectNextMonth = (): void => {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  };

  private _onSelectPrevMonth = (): void => {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  };

  private _onButtonKeyDown = (callback?: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (ev.which) {
        case KeyCodes.enter:
          callback?.();
          break;
      }
    };
  };
}
