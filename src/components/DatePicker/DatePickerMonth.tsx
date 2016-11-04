import * as React from 'react';
import { IDatePickerStrings } from './DatePicker.Props';
import { FocusZone } from '../../FocusZone';
import { KeyCodes } from '../../utilities/KeyCodes';
import { addYears, setMonth } from '../../utilities/dateMath/DateMath';
import { getRTL } from '../../utilities/rtl';
import { css } from '../../utilities/css';

export interface IDatePickerMonthProps {
   navigatedDate: Date;
   strings: IDatePickerStrings;
   onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
}

export class DatePickerMonth extends React.Component<IDatePickerMonthProps, {}> {
  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: IDatePickerMonthProps) {
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
            { strings.shortMonths.map((month, index) => {
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
}
