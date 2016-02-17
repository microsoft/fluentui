import * as React from 'react';
import TextField from '../TextField/index';
import DatePickerDay from './DatePickerDay';
import DatePickerMonth from './DatePickerMonth';

import './DatePicker.scss';

const DayPickerStrings = {
  titleFormat: '{month} {year}',

  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today'
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0)'
};

export interface IDatePickerProps {
  onSelectDate?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  value?: Date;
  format?: (date: Date) => string;
}

export interface IDatePickerState {
  selectedDate?: Date;
  isDatePickerShown?: boolean;
  isFocused?: boolean;
  value?: Date;
}

export default class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  static defaultProps: IDatePickerProps = {
    format: function(date: Date) {
      console.log(date);

      if (date) {
        return date.toDateString();
      }

      return null;
    }
  }

  constructor(props: IDatePickerProps) {
    super();

    this.state = {
      selectedDate: new Date(),
      isDatePickerShown: false,
      isFocused: false,
      value: props.value ? props.value : null
    }
  }

  setDate(date: Date) {
    this.setState({ selectedDate: date, value: date });
    if (this.props.onSelectDate) {
      this.props.onSelectDate(date);
    }
  }

  onSelectDate = (date: Date) => {
    this.setDate(date);
  }

  // TODO: need proper date math logic
  onSelectNextMonth = () => {
    let date = this.state.selectedDate;
    this.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  // TODO: need proper date math logic
  onSelectPrevMonth = () => {
    let date = this.state.selectedDate;
    this.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }

  // TODO: need proper date math logic
  onSelectNextYear = () => {
    let date = this.state.selectedDate;
    this.setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));
  }

  // TODO: need proper date math logic
  onSelectPrevYear = () => {
    let date = this.state.selectedDate;
    this.setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  }

  onSelectMonth = (month: number) => {
    let date = this.state.selectedDate;
    this.setDate(new Date(date.getFullYear(), month, 1));
  }

  onSelectYear = (year: number) => {
    let date = this.state.selectedDate;
    this.setDate(new Date(year, date.getMonth(), 1));
  }

  onGotoToday = () => {
    this.setDate(new Date());
  }

  onClick: React.MouseEventHandler = (evt) => {
    this.setState({ isDatePickerShown: true, isFocused: true });
  }

  onClickOverlay: React.MouseEventHandler = (evt) => {
    this.setState({ isDatePickerShown: false, isFocused: false });
  }

  render() {
    let rootClass = 'ms-DatePicker';

    return (
      <div className={ rootClass }>
        <TextField
          onClick={this.onClick}
          label={this.props.label}
          placeholder={this.props.placeholder}
          iconClass="ms-DatePicker-event ms-Icon ms-Icon--event"
          value={this.props.format && this.state.value ? this.props.format(this.state.value) : null}>
            {this.state.isDatePickerShown ? (
              <div className={
                "ms-DatePicker-picker" +
                (this.state.isFocused ? " ms-DatePicker-picker--focused" : "") +
                " ms-DatePicker-picker--opened"}>
                <div className="ms-DatePicker-holder" onClick={this.onClickOverlay}>
                  <div className="ms-DatePicker-frame">
                    <div className="ms-DatePicker-wrap">
                      <DatePickerDay
                        selectedDate={ this.state.selectedDate }
                        onSelectDate={ this.onSelectDate }
                        onSelectPrevMonth={ this.onSelectPrevMonth }
                        onSelectNextMonth={ this.onSelectNextMonth }
                        strings={DayPickerStrings}></DatePickerDay>
                      <span className="ms-DatePicker-goToday js-goToday"
                        onClick={ this.onGotoToday }>{DayPickerStrings.goToToday}</span>
                      <DatePickerMonth
                        selectedDate={ this.state.selectedDate }
                        strings={ DayPickerStrings }
                        onSelectPrevYear={ this.onSelectPrevYear }
                        onSelectNextYear={ this.onSelectNextYear }
                        onSelectMonth={ this.onSelectMonth }></DatePickerMonth>
                  </div>
                  </div>
                </div>
              </div>
            ) : null}
          </TextField>
        {this.state.isDatePickerShown ? (<div onClick={this.onClickOverlay} style={overlayStyles}></div>) : null}
      </div>
    );
  }
}