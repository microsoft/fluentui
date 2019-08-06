import * as React from 'react';
import { BaseComponent, classNamesFunction, css, KeyCodes, getRTL } from '@uifabric/utilities';
import { IProcessedStyleSet } from '@uifabric/styling';
import { IWeeklyDayPickerProps, IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles } from './WeeklyDayPicker.types';
import {
  DateRangeType,
  DayOfWeek,
  FirstWeekOfYear,
  ICalendarFormatDateCallbacks,
  ICalendarStrings,
  ICalendarIconStrings,
  AnimationDirection
} from '../Calendar/Calendar.types';
import { CalendarDayGrid } from '../CalendarDayGrid/CalendarDayGrid';
import { ICalendarDayGrid } from '../CalendarDayGrid/CalendarDayGrid.types';
import { compareDatePart, getStartDateOfWeek, addDays, compareDates } from '../../utilities/dateMath/DateMath';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const getClassNames = classNamesFunction<IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles>();

const DEFAULT_STRINGS = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close date picker',
  weekNumberFormatString: 'Week number {0}',
  prevWeekAriaLabel: 'Go to previous week',
  nextWeekAriaLabel: 'Go to next week'
};

export const defaultIconStrings: ICalendarIconStrings = {
  leftNavigation: 'ChevronLeft',
  rightNavigation: 'ChevronRight'
};

const defaultDateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear: (date: Date, strings: ICalendarStrings) =>
    strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
  formatMonthYear: (date: Date, strings: ICalendarStrings) => strings.months[date.getMonth()] + ' ' + date.getFullYear(),
  formatDay: (date: Date) => date.getDate().toString(),
  formatYear: (date: Date) => date.getFullYear().toString()
};

export interface IWeeklyDayPickerState {
  /** The currently focused date in the week picker, but not necessarily selected */
  navigatedDate: Date;

  /** The currently selected date in the calendar */
  selectedDate: Date;
}

export class WeeklyDayPickerBase extends BaseComponent<IWeeklyDayPickerProps, IWeeklyDayPickerState> {
  public static defaultProps: IWeeklyDayPickerProps = {
    onSelectDate: undefined,
    initialDate: undefined,
    today: new Date(),
    firstDayOfWeek: DayOfWeek.Sunday,
    strings: DEFAULT_STRINGS,
    navigationIcons: defaultIconStrings,
    dateTimeFormatter: defaultDateTimeFormatterCallbacks,
    animationDirection: AnimationDirection.Horizontal
  };

  private _dayGrid = React.createRef<ICalendarDayGrid>();
  private _focusOnUpdate: boolean;
  private _initialTouchX: number | undefined;

  public static getDerivedStateFromProps(props: IWeeklyDayPickerProps, state: IWeeklyDayPickerState): IWeeklyDayPickerState {
    const currentDate = props.initialDate && !isNaN(props.initialDate.getTime()) ? props.initialDate : props.today || new Date();

    if (!compareDates(currentDate, state.selectedDate)) {
      return {
        selectedDate: currentDate,
        navigatedDate: currentDate
      };
    }

    return {
      selectedDate: currentDate,
      navigatedDate: state.navigatedDate
    };
  }

  public constructor(props: IWeeklyDayPickerProps) {
    super(props);
    const currentDate = props.initialDate && !isNaN(props.initialDate.getTime()) ? props.initialDate : props.today || new Date();

    this.state = {
      selectedDate: currentDate,
      navigatedDate: currentDate
    };
    this._focusOnUpdate = false;
  }

  public focus(): void {
    if (this._dayGrid && this._dayGrid.current) {
      this._dayGrid.current.focus();
    }
  }

  public render(): JSX.Element {
    const {
      strings,
      dateTimeFormatter,
      firstDayOfWeek,
      minDate,
      maxDate,
      restrictedDates,
      today,
      styles,
      theme,
      className,
      animationDirection
    } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    return (
      <div className={classNames.root} onKeyDown={this._onWrapperKeyDown} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove}>
        {this.renderPreviousWeekNavigationButton(classNames)}
        <CalendarDayGrid
          styles={styles}
          componentRef={this._dayGrid}
          strings={strings}
          selectedDate={this.state.selectedDate!}
          navigatedDate={this.state.navigatedDate!}
          firstDayOfWeek={firstDayOfWeek!}
          firstWeekOfYear={FirstWeekOfYear.FirstDay}
          dateRangeType={DateRangeType.Day}
          weeksToShow={1}
          dateTimeFormatter={dateTimeFormatter!}
          minDate={minDate}
          maxDate={maxDate}
          restrictedDates={restrictedDates}
          onSelectDate={this._onSelectDate}
          onNavigateDate={this._onNavigateDate}
          today={today}
          lightenDaysOutsideNavigatedMonth={false}
          animationDirection={animationDirection}
        />
        {this.renderNextWeekNavigationButton(classNames)}
      </div>
    );
  }

  public componentDidUpdate(): void {
    if (this._focusOnUpdate) {
      this.focus();
      this._focusOnUpdate = false;
    }
  }

  private _onSelectDate = (date: Date): void => {
    const { onSelectDate } = this.props;

    // don't set the navigated date on selection because selection never causes navigation
    this.setState({
      selectedDate: date
    });
    this._focusOnUpdate = true;

    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  private _onNavigateDate = (date: Date, focusOnNavigatedDay: boolean): void => {
    const { onNavigateDate } = this.props;

    this.setState({
      navigatedDate: date
    });
    this._focusOnUpdate = focusOnNavigatedDay;

    if (onNavigateDate) {
      onNavigateDate(date);
    }
  };

  private renderPreviousWeekNavigationButton = (classNames: IProcessedStyleSet<IWeeklyDayPickerStyles>): JSX.Element => {
    const { minDate, firstDayOfWeek, strings, navigationIcons } = this.props;
    const { navigatedDate } = this.state;
    const leftNavigationIcon = navigationIcons!.leftNavigation;

    // determine if previous week in bounds
    const prevWeekInBounds = minDate ? compareDatePart(minDate, getStartDateOfWeek(navigatedDate, firstDayOfWeek!)) < 0 : true;

    return (
      <button
        className={css(classNames.navigationIconButton, {
          [classNames.disabledStyle]: !prevWeekInBounds
        })}
        disabled={!prevWeekInBounds}
        aria-disabled={!prevWeekInBounds}
        onClick={prevWeekInBounds ? this._onSelectPrevWeek : undefined}
        onKeyDown={prevWeekInBounds ? this._onButtonKeyDown(this._onSelectPrevWeek) : undefined}
        title={
          strings.prevWeekAriaLabel ? strings.prevWeekAriaLabel + ' ' + strings.months[addDays(navigatedDate!, -7).getMonth()] : undefined
        }
        type="button"
      >
        <Icon iconName={leftNavigationIcon} />
      </button>
    );
  };

  private renderNextWeekNavigationButton = (classNames: IProcessedStyleSet<IWeeklyDayPickerStyles>): JSX.Element => {
    const { maxDate, firstDayOfWeek, strings, navigationIcons } = this.props;
    const { navigatedDate } = this.state;
    const rightNavigationIcon = navigationIcons!.rightNavigation;

    // determine if next week in bounds
    const nextWeekInBounds = maxDate ? compareDatePart(addDays(getStartDateOfWeek(navigatedDate, firstDayOfWeek!), 7), maxDate) < 0 : true;

    return (
      <button
        className={css(classNames.navigationIconButton, {
          [classNames.disabledStyle]: !nextWeekInBounds
        })}
        disabled={!nextWeekInBounds}
        aria-disabled={!nextWeekInBounds}
        onClick={nextWeekInBounds ? this._onSelectNextWeek : undefined}
        onKeyDown={nextWeekInBounds ? this._onButtonKeyDown(this._onSelectNextWeek) : undefined}
        title={
          strings.nextWeekAriaLabel ? strings.nextWeekAriaLabel + ' ' + strings.months[addDays(navigatedDate!, -7).getMonth()] : undefined
        }
        type="button"
      >
        <Icon iconName={rightNavigationIcon} />
      </button>
    );
  };

  private _onSelectPrevWeek = () => {
    this._navigateDate(addDays(this.state.navigatedDate, -7));
  };

  private _onSelectNextWeek = () => {
    this._navigateDate(addDays(this.state.navigatedDate, 7));
  };

  private _navigateDate = (date: Date) => {
    this.setState({
      navigatedDate: date
    });
    if (this.props.onNavigateDate) {
      this.props.onNavigateDate(date);
    }
  };

  private _onWrapperKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    switch (ev.which) {
      case KeyCodes.enter:
        ev.preventDefault();
        break;

      case KeyCodes.backspace:
        ev.preventDefault();
        break;

      default:
        break;
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

  private _onTouchStart = (ev: React.TouchEvent<HTMLDivElement>) => {
    const touch = ev.touches[0];
    if (touch) {
      this._initialTouchX = touch.clientX;
    }
  };

  private _onTouchMove = (ev: React.TouchEvent<HTMLDivElement>) => {
    const isRtl = getRTL();
    const touch = ev.touches[0];
    if (touch && this._initialTouchX !== undefined && touch.clientX !== this._initialTouchX) {
      if ((touch.clientX - this._initialTouchX) * (isRtl ? -1 : 1) < 0) {
        // swipe right
        this._onSelectNextWeek();
      } else {
        // swipe left
        this._onSelectPrevWeek();
      }
      this._initialTouchX = undefined;
    }
  };
}
