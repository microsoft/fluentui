import * as React from 'react';
import { FocusZone } from '../../utilities/focus/index';
import { IDatePickerStrings } from './DatePicker.Props';
import KeyCodes from '../../utilities/KeyCodes';

export interface IDatePickerMonthProps {
   selectedDate: Date;
   strings: IDatePickerStrings;
   onSelectPrevYear: () => void;
   onSelectNextYear: () => void;
   onSelectMonth: (month: number) => void;
}

export default class DatePickerMonth extends React.Component<IDatePickerMonthProps, {}> {
  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: IDatePickerMonthProps) {
    super(props);

    this._selectMonthCallbacks = [];
    props.strings.shortMonths.map((month, index) => {
      this._selectMonthCallbacks[index] = props.onSelectMonth.bind(this, index);
    });
  }

  public render() {

    let { onSelectNextYear, onSelectPrevYear, selectedDate, strings } = this.props;

    return (
      <div className='ms-DatePicker-monthPicker'>
        <div className='ms-DatePicker-header'>
          <div className='ms-DatePicker-yearComponents ms-DatePicker-navContainer'>
            <span className='ms-DatePicker-prevYear js-prevYear' onClick={ onSelectPrevYear } onKeyDown={ this._onKeyDown.bind(this, onSelectPrevYear) } tabIndex={ 0 }><i className='ms-Icon ms-Icon--chevronLeft'></i></span>
            <span className='ms-DatePicker-nextYear js-nextYear' onClick={ onSelectNextYear } onKeyDown={ this._onKeyDown.bind(this, onSelectNextYear) } tabIndex={ 0 }><i className='ms-Icon ms-Icon--chevronRight'></i></span>
          </div>
          <div className='ms-DatePicker-currentYear js-showYearPicker'>{ selectedDate.getFullYear() }</div>
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

  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
  }
}
