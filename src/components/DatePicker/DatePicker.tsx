import * as React from 'react';
import {
  DayOfWeek,
  IDatePickerProps
} from './DatePicker.Props';
import { DatePickerDay } from './DatePickerDay';
import { DatePickerMonth } from './DatePickerMonth';
import { TextField } from '../../TextField';
import { KeyCodes } from '../../utilities/KeyCodes';
import { css } from '../../utilities/css';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import './DatePicker.scss';

export interface IDatePickerState {
  /** The currently focused date in the drop down, but not necessarily selected */
  navigatedDate?: Date;
  selectedDate?: Date;
  formattedDate?: string;
  isDatePickerShown?: boolean;
  errorMessage?: string;
}

export class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  public static defaultProps: IDatePickerProps = {
    allowTextInput: false,
    formatDate: (date: Date) => {
      if (date) {
        return date.toDateString();
      }

      return null;
    },
    parseDateFromString: (dateStr: string) => {
      const date = Date.parse(dateStr);
      if (date) {
        return new Date(date);
      }

      return null;
    },
    firstDayOfWeek: DayOfWeek.Sunday,
    isRequired: false,
    isMonthPickerVisible: true,
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

    let { formatDate, value } = props;

    this.state = {
      selectedDate: value || new Date(),
      formattedDate: formatDate && value ? formatDate(value) : null,
      isDatePickerShown: false,
      errorMessage: ''
    };

    this._events = new EventGroup(this);
    this._preventFocusOpeningPicker = false;

    this._onSelectDate = this._onSelectDate.bind(this);
    this._onNavigateDate = this._onNavigateDate.bind(this);
    this._onGotoToday = this._onGotoToday.bind(this);
    this._onGotoTodayKeyDown = this._onGotoTodayKeyDown.bind(this);
    this._onDatePickerPopupKeyDown = this._onDatePickerPopupKeyDown.bind(this);
    this._onTextFieldFocus = this._onTextFieldFocus.bind(this);
    this._onTextFieldBlur = this._onTextFieldBlur.bind(this);
    this._onTextFieldKeyDown = this._onTextFieldKeyDown.bind(this);
    this._onTextFieldClick = this._onTextFieldClick.bind(this);
    this._onTextFieldChanged = this._onTextFieldChanged.bind(this);
    this._handleEscKey = this._handleEscKey.bind(this);
    this._validateTextInput = this._validateTextInput.bind(this);
  }

  public componentWillReceiveProps(nextProps: IDatePickerProps) {
    let { formatDate, isRequired, strings, value } = nextProps;
    const errorMessage = isRequired && !value ? (strings.isRequiredErrorMessage || '*') : '';

    this.setState({
      selectedDate: value || new Date(),
      formattedDate: formatDate && value ? formatDate(value) : null,
      errorMessage: errorMessage
    });
  }

  public componentDidMount() {
    this._events.on(window, 'scroll', this._dismissDatePickerPopup);
    this._events.on(window, 'resize', this._dismissDatePickerPopup);
    this._events.on(window, 'click', this._onClickCapture, true);
    this._events.on(window, 'focus', this._onClickCapture, true);
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
    let { firstDayOfWeek, strings, label, isRequired, ariaLabel, placeholder, allowTextInput } = this.props;
    let { isDatePickerShown, formattedDate, selectedDate, navigatedDate, errorMessage } = this.state;

    return (
      <div className={ rootClass } ref='root'>
        <div ref='textFieldContainer'>
          <TextField
            ariaLabel={ ariaLabel }
            aria-haspopup='true'
            required={ isRequired }
            onKeyDown={ this._onTextFieldKeyDown }
            onFocus={ this._onTextFieldFocus }
            onBlur={ this._onTextFieldBlur }
            onClick={ this._onTextFieldClick }
            onChanged={ this._onTextFieldChanged }
            errorMessage={ errorMessage }
            label={ label }
            placeholder={ placeholder }
            iconClass={ css(
              'ms-Icon ms-Icon--Calendar',
              label ? 'ms-DatePicker-event--with-label' : 'ms-DatePicker-event--without-label'
              ) }
            readOnly={ !allowTextInput }
            value={ formattedDate }
            ref='textField' />
        </div>

        { isDatePickerShown && (
          <div className={'ms-DatePicker-picker ms-DatePicker-picker--opened ms-DatePicker-picker--focused ' + (this.props.isMonthPickerVisible ? 'is-monthPickerVisible' : '') } >
            <div className='ms-DatePicker-holder' onKeyDown={ this._onDatePickerPopupKeyDown }>
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
    let { formatDate, onSelectDate } = this.props;

    this.setState({
      selectedDate: date,
      isDatePickerShown: false,
      formattedDate: formatDate && date ? formatDate(date) : null,
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
      ev.preventDefault();
      this._onGotoToday();
    }
  };

  private _onTextFieldFocus(ev: React.FocusEvent) {
    if (!this.props.allowTextInput) {
      if (!this._preventFocusOpeningPicker) {
        this._showDatePickerPopup();
      }

      this._preventFocusOpeningPicker = false;
    }
  };

  private _onTextFieldBlur(ev: React.FocusEvent) {
    this._validateTextInput();
  };

  private _onTextFieldChanged(newValue: string) {
    if (this.props.allowTextInput) {
      if (this.state.isDatePickerShown) {
        this._dismissDatePickerPopup();
      }

      this.setState({
        errorMessage: '',
        formattedDate: newValue
      });
    }
  }

  private _onTextFieldKeyDown(ev: React.KeyboardEvent) {
    switch (ev.which) {
      case KeyCodes.enter:
        ev.preventDefault();
        ev.stopPropagation();
        if (!this.state.isDatePickerShown) {
          this._showDatePickerPopup();
        } else {
          // When DatePicker allows input date string directly,
          // it is expected to hit another enter to close the popup
          if (this.props.allowTextInput) {
            this._restoreFocusToTextField();
            this._dismissDatePickerPopup();
          }
        }
        break;

      case KeyCodes.escape:
        this._handleEscKey(ev);
        break;

      default:
        break;
    }
  };

  private _onDatePickerPopupKeyDown(ev: React.KeyboardEvent) {
    switch (ev.which) {
      case KeyCodes.enter:
        ev.preventDefault();
        break;

      case KeyCodes.backspace:
        ev.preventDefault();
        break;

      case KeyCodes.escape:
        this._handleEscKey(ev);
        break;

      default:
        break;
    }
  }

  private _onClickCapture(ev: React.MouseEvent) {
    if (!this.refs.root.contains(ev.target as HTMLElement)) {
      this._dismissDatePickerPopup();
    }
  }

  private _onTextFieldClick(ev: React.MouseEvent) {
    if (!this.state.isDatePickerShown) {
      this._showDatePickerPopup();
    } else {
      if (this.props.allowTextInput) {
        this.setState({
          isDatePickerShown: false
        });
      }
    }
  }

  private _showDatePickerPopup() {
    if (!this.state.isDatePickerShown) {
      this._focusOnSelectedDateOnUpdate = true;
      this.setState({
        isDatePickerShown: true,
        navigatedDate: this.state.selectedDate,
        errorMessage: ''
      });
    }
  }

  private _dismissDatePickerPopup() {
    if (this.state.isDatePickerShown) {
      this.setState({
        isDatePickerShown: false
      });

      this._validateTextInput();
    }
  }

  private _handleEscKey(ev: React.KeyboardEvent) {
    this._restoreFocusToTextField();
    this._dismissDatePickerPopup();
  }

  private _validateTextInput() {
    let { isRequired, allowTextInput, strings, formatDate, parseDateFromString, onSelectDate } = this.props;
    const inputValue: string = this.state.formattedDate;

    // Do validation only if DatePicker's popup is dismissed
    if (this.state.isDatePickerShown) {
      return;
    }

    // Check when DatePicker is a required field but has NO input value
    if (isRequired && !inputValue) {
      this.setState({
        // Since fabic react doesn't have loc support yet
        // use the symbol '*' to represent error message
        errorMessage: strings.isRequiredErrorMessage || '*'
      });
      return;
    }

    let date = null;
    if (allowTextInput) {
      if (inputValue) {
        date = parseDateFromString(inputValue);
        if (!date) {
          this.setState({
            errorMessage: strings.invalidInputErrorMessage || '*'
          });
        } else {
          this.setState({
            selectedDate: date,
            formattedDate: formatDate && date ? formatDate(date) : null,
            errorMessage: ''
          });
        }
      } else {
        // No input date string shouldn't be an error if field is not required
        this.setState({
          errorMessage: ''
        });
      }
    }

    // Execute onSelectDate callback
    if (onSelectDate) {
      // If no input date string or input date string is invalid
      // date variable will be null, callback should expect null value for this case
      onSelectDate(date);
    }
  }
}
