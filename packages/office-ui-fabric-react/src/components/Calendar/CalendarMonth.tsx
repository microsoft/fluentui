import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  getRTL,
  autobind
} from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.Props';
import { FocusZone } from '../../FocusZone';
import { addYears, setMonth } from '../../utilities/dateMath/DateMath';
import { Icon } from '../../Icon';
import * as stylesImport from './Calendar.scss';
const styles: any = stylesImport;

export interface ICalendarMonthProps extends React.Props<CalendarMonth> {
  componentRef?: () => void;
  navigatedDate: Date;
  strings: ICalendarStrings;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  today?: Date;
  highlightCurrentMonth: boolean;
  onHeaderSelect?: (focus: boolean) => void;
  navigationIcons: ICalendarIconStrings;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
}

export class CalendarMonth extends BaseComponent<ICalendarMonthProps, {}> {
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedMonth: HTMLElement;
  };

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

    let { navigatedDate, strings, today, highlightCurrentMonth, navigationIcons, dateTimeFormatter } = this.props;
    let leftNavigationIcon = navigationIcons.leftNavigation;
    let rightNavigationIcon = navigationIcons.rightNavigation;

    return (
      <div className={ css('ms-DatePicker-monthPicker', styles.monthPicker) }>
        <div className={ css('ms-DatePicker-header', styles.header) }>
          <div className={ css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear) }>{ dateTimeFormatter.formatYear(navigatedDate) }</div>
          <div className={ css('ms-DatePicker-yearComponents', styles.yearComponents) }>
            <div className={ css('ms-DatePicker-navContainer', styles.navContainer) }>
              <span
                className={ css('ms-DatePicker-prevYear js-prevYear', styles.prevYear) }
                onClick={ this._onSelectPrevYear }
                onKeyDown={ this._onSelectPrevYearKeyDown }
                aria-label={ strings.prevYearAriaLabel }
                role='button'
                tabIndex={ 0 }>
                <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
              </span>
              <span
                className={ css('ms-DatePicker-nextYear js-nextYear', styles.nextYear) }
                onClick={ this._onSelectNextYear }
                onKeyDown={ this._onSelectNextYearKeyDown }
                aria-label={ strings.nextYearAriaLabel }
                role='button'
                tabIndex={ 0 }>
                <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
              </span>
            </div>
          </div>
          {
            this.props.onHeaderSelect ?
              <div
                className={ css('ms-DatePicker-headerToggleView js-showYearPicker', styles.headerToggleView) }
                onClick={ this._onHeaderSelect }
                onKeyDown={ this._onHeaderKeyDown }
                aria-label={ dateTimeFormatter.formatYear(navigatedDate) }
                role='button'
                tabIndex={ 0 }
              />
              :
              null
          }
        </div>
        <FocusZone>
          <div className={ css('ms-DatePicker-optionGrid', styles.optionGrid) }>
            { strings.shortMonths.map((month, index) =>
              <span
                role='button'
                className={
                  css('ms-DatePicker-monthOption',
                    styles.monthOption,
                    {
                      ['ms-DatePicker-day--today ' + styles.monthIsCurrentMonth]: highlightCurrentMonth && this._isCurrentMonth(index, navigatedDate.getFullYear(), today!)
                    })
                }
                key={ index }
                onClick={ this._selectMonthCallbacks[index] }
                aria-label={ dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
                data-is-focusable={ true }
                ref={ navigatedDate.getMonth() === index ? 'navigatedMonth' : undefined }
              >
                { month }
              </span>
            ) }
          </div>
        </FocusZone>
      </div>
    );
  }

  public focus() {
    if (this.refs.navigatedMonth) {
      this.refs.navigatedMonth.tabIndex = 0;
      this.refs.navigatedMonth.focus();
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
    this._onKeyDown(this._onSelectNextYear, ev);
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
