import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { KeyCodes } from '../../utilities/KeyCodes';
import { addYears, setMonth } from '../../utilities/dateMath/DateMath';
import { getRTL } from '../../utilities/rtl';
import { css } from '../../utilities/css';

const MONTHS_IN_YEAR = 12;

export interface IDatePickerMonthProps {
   navigatedDate: Date;
   onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
   locales: string[];
}

export interface IDatePickerMonthState {
  monthStrings: string[];
}

export class DatePickerMonth extends React.Component<IDatePickerMonthProps, IDatePickerMonthState> {
  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: IDatePickerMonthProps) {
    super(props);

    this._selectMonthCallbacks = [];
    for (let i = 0; i < MONTHS_IN_YEAR; i++) {
      this._selectMonthCallbacks[i] = this._onSelectMonth.bind(this, i);
    }

    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);

    this.state = {
      monthStrings: this._getMonthStrings(props.locales),
    };
  }

  public componentWillReceiveProps (nextProps: IDatePickerMonthProps) {
    this.setState({
      monthStrings: this._getMonthStrings(nextProps.locales),
    });
  }

  public render() {

    let { monthStrings } = this.state;
    let { navigatedDate } = this.props;

    return (
      <div className='ms-DatePicker-monthPicker'>
        <div className='ms-DatePicker-header'>
          <div className='ms-DatePicker-yearComponents ms-DatePicker-navContainer'>
            <span
              className='ms-DatePicker-prevYear js-prevYear'
              onClick={ this._onSelectPrevYear }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectPrevYear) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', {'ms-Icon--ChevronLeft': !getRTL(), 'ms-Icon--ChevronRight': getRTL()}) }  />
            </span>
            <span
              className='ms-DatePicker-nextYear js-nextYear'
              onClick={ this._onSelectNextYear }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectNextYear) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', {'ms-Icon--ChevronLeft': getRTL(), 'ms-Icon--ChevronRight': !getRTL()}) }  />
            </span>
          </div>
          <div className='ms-DatePicker-currentYear js-showYearPicker'>{ navigatedDate.getFullYear() }</div>
        </div>
        <FocusZone>
          <div className='ms-DatePicker-optionGrid'>
            { monthStrings.map((month, index) => {
              return (<span className='ms-DatePicker-monthOption' key={index} onClick={ this._selectMonthCallbacks[index] } data-is-focusable={true}>{month}</span>);
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

  private _getMonthStrings(locales: string[]) {
    let strings = new Array(MONTHS_IN_YEAR);
    let date: Date = new Date();

    for (let i = 0; i < MONTHS_IN_YEAR; i++) {
      strings[i] = setMonth(date, i).toLocaleString(locales, { month: 'short' });
    }

    return strings;
  }
}
