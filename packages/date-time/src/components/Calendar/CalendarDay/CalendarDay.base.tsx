import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, classNamesFunction } from '@uifabric/utilities';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { addMonths, compareDatePart, getMonthStart, getMonthEnd } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { IProcessedStyleSet } from '@uifabric/styling';
import { CalendarDayGrid } from '../../CalendarDayGrid/CalendarDayGrid';
import { ICalendarDayGrid } from '../../CalendarDayGrid/CalendarDayGrid.types';

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

export interface ICalendarDayState {
  previousNavigatedDate?: Date;
  animateBackwards?: boolean;
}

export class CalendarDayBase extends BaseComponent<ICalendarDayProps, ICalendarDayState> {
  private _dayGrid = React.createRef<ICalendarDayGrid>();

  public static getDerivedStateFromProps(
    nextProps: Readonly<ICalendarDayProps>,
    prevState: Readonly<ICalendarDayState>
  ): Partial<ICalendarDayState> | null {
    const { dateTimeFormatter, strings } = nextProps;

    const previousDate = prevState && prevState.previousNavigatedDate;
    const nextDate = nextProps.navigatedDate;
    if (!previousDate) {
      return {
        previousNavigatedDate: nextProps.navigatedDate
      };
    }

    if (dateTimeFormatter.formatMonthYear(previousDate, strings) !== dateTimeFormatter.formatMonthYear(nextDate, strings)) {
      if (previousDate < nextDate) {
        return {
          animateBackwards: false,
          previousNavigatedDate: nextProps.navigatedDate
        };
      } else if (previousDate > nextDate) {
        return {
          animateBackwards: true,
          previousNavigatedDate: nextProps.navigatedDate
        };
      }
    }

    return {
      previousNavigatedDate: nextProps.navigatedDate
    };
  }

  public constructor(props: ICalendarDayProps) {
    super(props);

    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);

    this.state = {};
  }

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
      animationDirection
    } = this.props;
    const dayPickerId = getId();
    const monthAndYearId = getId();

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      headerIsClickable: !!onHeaderSelect,
      showWeekNumbers: showWeekNumbers,
      animateBackwards: this.state.animateBackwards,
      animationDirection: animationDirection
    });

    return (
      <div className={classNames.root} id={dayPickerId}>
        <div className={classNames.header}>
          <button
            aria-live="polite" // if this component rerenders when text changes, aria-live will not be announced, so make key consistent
            aria-atomic="true"
            id={monthAndYearId}
            className={classNames.monthAndYear}
            onClick={this._onHeaderSelect}
            data-is-focusable={!!onHeaderSelect}
            tabIndex={!!onHeaderSelect ? 0 : -1} // prevent focus if there's no action for the button
            onKeyDown={this._onButtonKeyDown(this._onHeaderSelect)}
            type="button"
          >
            {dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
          </button>
          {this.renderMonthNavigationButtons(classNames, dayPickerId)}
        </div>
        <CalendarDayGrid
          {...this.props}
          styles={styles}
          componentRef={this._dayGrid}
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

  public focus(): void {
    if (this._dayGrid && this._dayGrid.current) {
      this._dayGrid.current.focus();
    }
  }

  private renderMonthNavigationButtons = (classNames: IProcessedStyleSet<ICalendarDayStyles>, dayPickerId: string): JSX.Element => {
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
            [classNames.disabledStyle]: !prevMonthInBounds
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
            [classNames.disabledStyle]: !nextMonthInBounds
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
            onClick={this._onClose}
            onKeyDown={this._onButtonKeyDown(this._onClose)}
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

  private _onClose = (): void => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  private _onHeaderSelect = (): void => {
    if (this.props.onHeaderSelect) {
      this.props.onHeaderSelect();
    }
  };

  private _onButtonKeyDown = (callback: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (ev.which) {
        case KeyCodes.enter:
          callback();
          break;
      }
    };
  };
}
