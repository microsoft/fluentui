import * as React from 'react';
import {
  KeyCodes,
  css,
  getRTL
} from '../../Utilities';
import { ICalendarStrings } from './Calendar.Props';
import { FocusZone } from '../../FocusZone';
import { addYears, setMonth } from '../../utilities/dateMath/DateMath';
let styles: any = require('./Calendar.scss');

export interface ICalendarMonthProps {
  navigatedDate: Date;
  strings: ICalendarStrings;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
}

export class CalendarMonth extends React.Component<ICalendarMonthProps, {}> {
  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: ICalendarMonthProps) {
    super(props);

    this._selectMonthCallbacks = [];
    props.strings.shortMonths.map((month, index) => {
      this._selectMonthCallbacks[index] = this._onSelectMonth.bind(this, index);
    });

    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);
  }

  public render() {

    let { navigatedDate, strings } = this.props;

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
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectPrevYear) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', { 'ms-Icon--ChevronLeft': !getRTL(), 'ms-Icon--ChevronRight': getRTL() }) } />
            </span>
            <span
              className={ css('ms-DatePicker-nextYear js-nextYear', styles.nextYear) }
              onClick={ this._onSelectNextYear }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectNextYear) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', { 'ms-Icon--ChevronLeft': getRTL(), 'ms-Icon--ChevronRight': !getRTL() }) } />
            </span>
          </div>
          <div className={ css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear) }>{ navigatedDate.getFullYear() }</div>
        </div>
        <FocusZone>
          <div className={ css('ms-DatePicker-optionGrid', styles.optionGrid) }>
            { strings.shortMonths.map((month, index) => {
              return (
                <span
                  className={ css('ms-DatePicker-monthOption', styles.monthOption) }
                  key={ index }
                  onClick={ this._selectMonthCallbacks[index] }
                  data-is-focusable={ true }
                >
                  { month }
                </span>);
            }) }
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
  }

  private _onSelectNextYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  };

  private _onSelectPrevYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  };

  private _onSelectMonth(newMonth: number) {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  }
}
