import * as React from 'react';
import TextField from '../TextField/index';
import DatePickerDay from './DatePickerDay';
import DatePickerMonth from './DatePickerMonth';
import KeyCodes from '../../utilities/KeyCodes';
import { css } from '../../utilities/css';
import { IDatePickerProps, DayOfWeek } from './DatePicker.Props';
import EventGroup from '../../utilities/eventGroup/EventGroup';

import './DatePicker.scss';

const MONTHS_IN_YEAR = 12;

export interface IDatePickerState {
  selectedDate?: Date;
  formattedDate?: string;
  isDatePickerShown?: boolean;
  isFocused?: boolean;
  value?: Date;
}

export default class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  public static defaultProps: IDatePickerProps = {
    format: function(date: Date) {
      if (date) {
        return date.toDateString();
      }

      return null;
    },
    firstDayOfWeek: DayOfWeek.Sunday,
    strings: null
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
    textField: TextField;
    picker: HTMLElement;
  };

  private _events: EventGroup;
  private _preventFocusOpeningPicker: boolean;

  constructor(props: IDatePickerProps) {
    super();

    let { format, value } = props;

    this.state = {
      selectedDate: new Date(),
      formattedDate: format && value ? format(value) : null,
      isDatePickerShown: false,
      isFocused: false,
      value: props.value ? props.value : null
    };

    this._events = new EventGroup(this);
    this._preventFocusOpeningPicker = false;

    this._onSelectDate = this._onSelectDate.bind(this);
    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);
    this._onGotoToday = this._onGotoToday.bind(this);
    this._onTextFieldFocus = this._onTextFieldFocus.bind(this);
    this._onTextFieldKeyDown = this._onTextFieldKeyDown.bind(this);
    this._onTextFieldClick = this._onTextFieldClick.bind(this);
  }

  public componentDidMount() {
    this._events.on(window, 'scroll', this._dismissDatePickerPopup);
    this._events.on(window, 'resize', this._dismissDatePickerPopup);
    this._events.on(window, 'click', this._onClickCapture, true);
    this._events.on(window, 'touchstart', this._onClickCapture, true);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let rootClass = 'ms-DatePicker';
    let { firstDayOfWeek, strings } = this.props;
    let { isFocused, isDatePickerShown, formattedDate } = this.state;

    return (
      <div className={ rootClass } ref='root' key='root'>
        <TextField
          onKeyDown={ this._onTextFieldKeyDown }
          onFocus={ this._onTextFieldFocus }
          onClick={ this._onTextFieldClick }
          label={this.props.label}
          placeholder={this.props.placeholder}
          iconClass='ms-DatePicker-event ms-Icon ms-Icon--event'
          readOnly={ true }
          value={ formattedDate }
          ref='textField' key='textField'>
            {isDatePickerShown ? (
              <div className={ css('ms-DatePicker-picker ms-DatePicker-picker--opened', {
                'ms-DatePicker-picker--focused': isFocused
              })} key='picker' ref='picker'>
                <div className='ms-DatePicker-holder'>
                  <div className='ms-DatePicker-frame'>
                    <div className='ms-DatePicker-wrap'>
                      <DatePickerDay
                        selectedDate={ this.state.selectedDate }
                        onSelectDate={ this._onSelectDate }
                        onSelectPrevMonth={ this._onSelectPrevMonth }
                        onSelectNextMonth={ this._onSelectNextMonth }
                        firstDayOfWeek={ firstDayOfWeek }
                        strings={ strings }></DatePickerDay>
                      <span className='ms-DatePicker-goToday js-goToday'
                        onClick={ this._onGotoToday }>{ strings.goToToday }</span>
                      <DatePickerMonth
                        selectedDate={ this.state.selectedDate }
                        strings={ strings }
                        onSelectPrevYear={ this._onSelectPrevYear }
                        onSelectNextYear={ this._onSelectNextYear }
                        onSelectMonth={ this._onSelectMonth }></DatePickerMonth>
                  </div>
                  </div>
                </div>
              </div>
            ) : null}
          </TextField>
      </div>
    );
  }

  private _setDate(date: Date) {
    this.setState({
      selectedDate: date,
      value: date
    });
  }

  private _onSelectDate(date: Date) {
    let { format, onSelectDate } = this.props;

    this._setDate(date);
    this.setState({
      isDatePickerShown: false,
      isFocused: false,
      formattedDate: format && date ? format(date) : null,
    });

    this._preventFocusOpeningPicker = true;
    this.refs.textField.refs.singlelineText.focus();

    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  private _onSelectNextMonth() {
    let date = this.state.selectedDate;
    this._onSelectMonth(date.getMonth() + 1);
  };

  private _onSelectPrevMonth() {
    let date = this.state.selectedDate;
    this._onSelectMonth(date.getMonth() - 1);
  };

  private _onSelectNextYear() {
    let date = this.state.selectedDate;
    this._selectYear(date.getFullYear() + 1);
  };

  private _onSelectPrevYear() {
    let date = this.state.selectedDate;
    this._selectYear(date.getFullYear() - 1);
  };

  private _selectYear(newYear: number) {
    let date = this.state.selectedDate;
    let newMonth = date.getMonth();
    let newDate = new Date(newYear, newMonth, date.getDate());

    // We want to maintain the same day-of-month, but that may not be possible if the new month doesn't have enough days.
    // Loop until we back up to a day the new month has.
    while (newDate.getMonth() !== newMonth) {
      newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1);
    }
    this._setDate(newDate);

  }

  private _onSelectMonth(newMonth: number) {
    let date = this.state.selectedDate;
    let newDate = new Date(date.getFullYear(), newMonth, date.getDate());

    // We want to maintain the same day-of-month, but that may not be possible if the new month doesn't have enough days.
    // Loop until we back up to a day the new month has.
    // (Weird modulo math is due to Javascript's treatment of negative numbers in modulo)
    for (let i = 1; newDate.getMonth() !== ((newMonth % MONTHS_IN_YEAR) + MONTHS_IN_YEAR) % MONTHS_IN_YEAR; i++) {
      newDate = new Date(date.getFullYear(), newMonth, date.getDate() - i);
    }
    this._setDate(newDate);
  };

  private _onGotoToday() {
    this._setDate(new Date());
  };

  private _onTextFieldFocus(evt: React.FocusEvent) {
    if (!this._preventFocusOpeningPicker) {
      this._showDatePickerPopup();
    }

    this._preventFocusOpeningPicker = false;
  };

  private _onTextFieldKeyDown(evt: React.KeyboardEvent) {
    if (evt.which === KeyCodes.enter) {
      this._showDatePickerPopup();
    }
  };

  private _onClickCapture(ev: React.MouseEvent) {
    if (!this.refs.root.contains(ev.target as HTMLElement)) {
      this._dismissDatePickerPopup();
    }
  }

  private _onTextFieldClick(ev: React.MouseEvent) {
    if (!this.state.isDatePickerShown) {
      this._showDatePickerPopup();
    }
  }

  private _showDatePickerPopup() {
    this.setState({
      isDatePickerShown: true,
      isFocused: true
    });
  }

  private _dismissDatePickerPopup() {
    this.setState({
      isDatePickerShown: false,
      isFocused: false
    });
  }
}
