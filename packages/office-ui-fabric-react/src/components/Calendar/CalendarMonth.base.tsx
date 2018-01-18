import * as React from 'react';
import {
  addYears,
  compareDatePart,
  getMonthEnd,
  getMonthStart,
  getYearEnd,
  getYearStart,
  setMonth
} from '../../utilities/dateMath/DateMath';
import {
  autobind,
  BaseComponent,
  classNamesFunction,
  customizable,
  getRTL,
  KeyCodes
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import {
  ICalendarMonth,
  ICalendarMonthProps,
  ICalendarMonthStyleProps,
  ICalendarMonthStyles
} from './CalendarMonth.types';
import { Icon } from '../../Icon';
import { mergeStyles } from '../../Styling';

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>();

@customizable('CalendarMonth', ['getStyles', 'theme'])
export class CalendarMonthBase extends BaseComponent<ICalendarMonthProps, {}> implements ICalendarMonth {

  private _navigatedMonth: HTMLElement;

  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: ICalendarMonthProps) {
    super(props);

    this._selectMonthCallbacks = [];
    props.strings.shortMonths.map((month, index) => {
      this._selectMonthCallbacks[index] = this._onSelectMonth.bind(this, index);
    });

    this._isCurrentMonth = this._isCurrentMonth.bind(this);
    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);
  }

  public render() {

    let {
      navigatedDate,
      strings,
      today,
      highlightCurrentMonth,
      navigationIcons,
      dateTimeFormatter,
      minDate,
      maxDate,
      dayPickerVisible,
      onHeaderSelect,
      getStyles,
      theme,
      className } = this.props;
    let leftNavigationIcon = navigationIcons.leftNavigation;
    let rightNavigationIcon = navigationIcons.rightNavigation;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        calendarsInline: dayPickerVisible!,
        isPrevYearDisabled: !isPrevYearInBounds,
        isNextYearDisabled: !isNextYearInBounds,
        isHeaderSelectable: !!onHeaderSelect
      });

    return (
      <div className={ classNames.root }>
        <div className={ classNames.navigators }>
          <div className='ms-DatePicker-navContainer'>
            <span
              className={ classNames.prevNavigator }
              onClick={ this._onSelectPrevYear }
              onKeyDown={ this._onSelectPrevYearKeyDown }
              aria-label={ strings.prevYearAriaLabel ? strings.prevYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, -1)) : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
            </span>
            <span
              className={ classNames.nextNavigator }
              onClick={ this._onSelectNextYear }
              onKeyDown={ this._onSelectNextYearKeyDown }
              aria-label={ strings.nextYearAriaLabel ? strings.nextYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, 1)) : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
            </span>
          </div>
        </div>
        <div className={ classNames.header }>
          { this.props.onHeaderSelect ?
            <div
              className={ classNames.headerLabel }
              onClick={ this._onHeaderSelect }
              onKeyDown={ this._onHeaderKeyDown }
              aria-label={ dateTimeFormatter.formatYear(navigatedDate) }
              role='button'
              tabIndex={ 0 }
            >
              { dateTimeFormatter.formatYear(navigatedDate) }
            </div>
            :
            <div className={ classNames.headerLabel }>
              { dateTimeFormatter.formatYear(navigatedDate) }
            </div>
          }
        </div>
        <FocusZone>
          <div
            className={ classNames.monthsGrid }
            role='grid'
          >
            { strings.shortMonths.map((month, index) => {

              const indexedMonth = setMonth(navigatedDate, index);
              const isCurrentMonth = this._isCurrentMonth(index, navigatedDate.getFullYear(), today!);
              const isNavigatedMonth = navigatedDate.getMonth() === index;
              const isInBounds = (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);

              const monthOptionStyle = mergeStyles(
                classNames.month,
                highlightCurrentMonth && isNavigatedMonth && classNames.monthSelected,
                !isInBounds && classNames.monthDisabled,
                highlightCurrentMonth && isCurrentMonth! && classNames.monthCurrent
              );

              return <span
                role={ 'gridcell' }
                className={ monthOptionStyle }
                key={ index }
                onClick={ isInBounds ? this._selectMonthCallbacks[index] : undefined }
                aria-label={ dateTimeFormatter.formatMonthYear(indexedMonth, strings) }
                aria-selected={ isCurrentMonth || isNavigatedMonth }
                data-is-focusable={ isInBounds ? true : undefined }
                ref={ isNavigatedMonth ? this._resolveRef('_navigatedMonth') : undefined }
              >
                { month }
              </span>;
            }
            ) }
          </div>
        </FocusZone>
      </div>
    );
  }

  public focus() {
    if (this._navigatedMonth) {
      this._navigatedMonth.tabIndex = 0;
      this._navigatedMonth.focus();
    }
  }

  private _isCurrentMonth(month: number, year: number, today: Date) {
    return today.getFullYear() === year && today.getMonth() === month;
  }

  @autobind
  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  @autobind
  private _onSelectNextYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  }

  @autobind
  private _onSelectNextYearKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectNextYear, ev);
  }

  @autobind
  private _onSelectPrevYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  }

  @autobind
  private _onSelectPrevYearKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectPrevYear, ev);
  }

  @autobind
  private _onSelectMonth(newMonth: number) {
    let { navigatedDate, onNavigateDate, onHeaderSelect } = this.props;

    // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  }

  @autobind
  private _onHeaderSelect() {
    let { onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
  }

  @autobind
  private _onHeaderKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    let { onHeaderSelect } = this.props;
    if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      onHeaderSelect(true);
    }
  }
}
