import * as React from 'react';
import TextField from '../TextField/index';
import DatePickerDay from './DatePickerDay';
import DatePickerMonth from './DatePickerMonth';
import KeyCodes from '../../utilities/KeyCodes';
import { IDatePickerProps, DayOfWeek } from './DatePicker.Props';
import EventGroup from '../../utilities/eventGroup/EventGroup';

import './DatePicker.scss';

export interface IDatePickerState {
  /** The currently focused date in the drop down, but not necessarily selected */
  navigatedDate?: Date;
  selectedDate?: Date;
  formattedDate?: string;
  isDatePickerShown?: boolean;
}

export default class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  public static defaultProps: IDatePickerProps = {
    format: (date: Date) => {
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
    textFieldContainer: HTMLElement;
    dayPicker: DatePickerDay;
  };

  private _events: EventGroup;
  private _preventFocusOpeningPicker: boolean;
  private _focusOnSelectedDateOnUpdate: boolean;

  constructor(props: IDatePickerProps) {
    super();

    let { format, value } = props;

    this.state = {
      selectedDate: new Date(),
      formattedDate: format && value ? format(value) : null,
      isDatePickerShown: false,
    };

    this._events = new EventGroup(this);
    this._preventFocusOpeningPicker = false;

    this._onSelectDate = this._onSelectDate.bind(this);
    this._onNavigateDate = this._onNavigateDate.bind(this);
    this._onGotoToday = this._onGotoToday.bind(this);
    this._onGotoTodayKeyDown = this._onGotoTodayKeyDown.bind(this);
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

  public componentDidUpdate() {
    if (this._focusOnSelectedDateOnUpdate) {
      this.refs.dayPicker.focus();
      this._focusOnSelectedDateOnUpdate = false;
    }
  }

  public render() {
    let rootClass = 'ms-DatePicker';
    let { firstDayOfWeek, strings } = this.props;
    let { isDatePickerShown, formattedDate, selectedDate, navigatedDate } = this.state;

    return (
      <div className={ rootClass } ref='root'>
        <div ref='textFieldContainer'>
          <TextField
            onKeyDown={ this._onTextFieldKeyDown }
            onFocus={ this._onTextFieldFocus }
            onClick={ this._onTextFieldClick }
            label={this.props.label}
            placeholder={this.props.placeholder}
            iconClass='ms-DatePicker-event ms-Icon ms-Icon--event'
            readOnly={ true }
            value={ formattedDate }
            ref='textField' />
        </div>

          { isDatePickerShown && (
          <div
            className='ms-DatePicker-picker ms-DatePicker-picker--opened ms-DatePicker-picker--focused'
            >
            <div className='ms-DatePicker-holder'>
              <div className='ms-DatePicker-frame'>
                <div className='ms-DatePicker-wrap'>
                  <DatePickerDay
                    selectedDate={ selectedDate }
                    navigatedDate={ navigatedDate }
                    onSelectDate={ this._onSelectDate }
                    onNavigateDate={ this._onNavigateDate }
                    firstDayOfWeek={ firstDayOfWeek }
                    strings={ strings }
                    ref='dayPicker' />
                  <DatePickerMonth
                    navigatedDate={ navigatedDate }
                    strings={ strings }
                    onNavigateDate={ this._onNavigateDate } />
                  <span
                    className='ms-DatePicker-goToday js-goToday'
                    onClick={ this._onGotoToday }
                    onKeyDown={ this._onGotoTodayKeyDown }
                    tabIndex={ 0 }>
                    { strings.goToToday }
                  </span>
                </div>
              </div>
            </div>
          </div>
          ) }
      </div>
    );
  }

  private _restoreFocusToTextField() {
    this._preventFocusOpeningPicker = true;
    this.refs.textField.focus();
  }

  private _navigateDay(date: Date) {
    this.setState({
      navigatedDate: date
    });
  }

  private _onNavigateDate(date: Date, focusOnNavigatedDay: boolean) {
    this._focusOnSelectedDateOnUpdate = this._focusOnSelectedDateOnUpdate || focusOnNavigatedDay;
    this._navigateDay(date);
  }

  private _onSelectDate(date: Date) {
    let { format, onSelectDate } = this.props;

    this.setState({
      selectedDate: date,
      isDatePickerShown: false,
      formattedDate: format && date ? format(date) : null,
    });

    this._restoreFocusToTextField();

    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  private _onGotoToday() {
    this._focusOnSelectedDateOnUpdate = true;
    this._navigateDay(new Date());
  };

  private _onGotoTodayKeyDown(ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.enter) {
      this._onGotoToday();
    }
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
    } else if (evt.which === KeyCodes.escape) {
      this._restoreFocusToTextField();
      this._dismissDatePickerPopup();
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
    if (!this.state.isDatePickerShown) {
      this._focusOnSelectedDateOnUpdate = true;
      this.setState({
        isDatePickerShown: true,
        navigatedDate: this.state.selectedDate
      });
    }
  }

  private _dismissDatePickerPopup() {
    if (this.state.isDatePickerShown) {
      this.setState({
        isDatePickerShown: false
      });
    }
  }
}
