import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  getRTL,
  autobind
} from '../../Utilities';
import { ICalendarStrings } from './Calendar.Props';
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
  onHeaderClick?: (focus: boolean) => void;
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

    this.isCurrentMonth = this.isCurrentMonth.bind(this);
    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);
  }

  public render() {

    let { navigatedDate, strings, today, highlightCurrentMonth } = this.props;

    return (
      <div className={ css('ms-DatePicker-monthPicker', styles.monthPicker) }>
        <div className={ css('ms-DatePicker-header', styles.header) }>
          <div className={ css(
            'ms-DatePicker-yearComponents ms-DatePicker-navContainer',
            styles.yearComponents,
            styles.navContainer
          ) }>
            <span
              className={ css('ms-DatePicker-prevYear js-prevYear', styles.prevYear) }
              onClick={ this._onSelectPrevYear }
              onKeyDown={ this._onSelectPrevYear }
              aria-label={ strings.prevYearAriaLabel }
              role='button'
              tabIndex={ 0 }>
              <Icon iconName={ getRTL() ? 'ChevronRight' : 'ChevronLeft' } />
            </span>
            <span
              className={ css('ms-DatePicker-nextYear js-nextYear', styles.nextYear) }
              onClick={ this._onSelectNextYear }
              onKeyDown={ this._onSelectNextYear }
              aria-label={ strings.nextYearAriaLabel }
              role='button'
              tabIndex={ 0 }>
              <Icon iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' } />
            </span>
          </div>
          <div className={ css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear) }>{ navigatedDate.getFullYear() }</div>
          {
            this.props.onHeaderClick ?
              <div
                className={ css('ms-DatePicker-headerToggleView js-showYearPicker', styles.headerToggleView) }
                onClick={ () => this._onHeaderClick(false) }
                onKeyDown={ () => this._onHeaderClick(true) }
                aria-label={ strings.dayPickerAriaLabel }
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
                      ['ms-DatePicker-day--today ' + styles.monthIsCurrentMonth]: highlightCurrentMonth && this.isCurrentMonth(index, navigatedDate.getFullYear(), today!)
                    })
                }
                key={ index }
                onClick={ this._selectMonthCallbacks[index] }
                aria-label={ setMonth(navigatedDate, index).toLocaleString([], { month: 'long', year: 'numeric' }) }
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

  private isCurrentMonth(month: number, year: number, today: Date) {
    return today.getFullYear() === year && today.getMonth() === month;
  }

  // @autobind
  // private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
  //   if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
  //     callback();
  //   }
  // }

  @autobind
  private _onSelectNextYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  }

  @autobind
  private _onSelectPrevYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  }

  @autobind
  private _onSelectMonth(newMonth: number) {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  }

  @autobind
  private _onHeaderClick(focus: boolean) {
    this.props.onHeaderClick ? this.props.onHeaderClick(focus) : null
  }
}
