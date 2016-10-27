import * as React from 'react';
import {
  DayOfWeek,
  IDatePickerProps
} from './DatePicker.Props';
import { DatePickerDay } from './DatePickerDay';
import { DatePickerMonth } from './DatePickerMonth';
import { TextField } from '../../TextField';
import {
  autobind,
  BaseComponent,
  KeyCodes,
  css,
  elementContains
} from '../../Utilities';
import './DatePicker.scss';

export interface IDatePickerState {
  /** The currently focused date in the drop down, but not necessarily selected */
  navigatedDate?: Date;
  selectedDate?: Date;
  formattedDate?: string;
  isDatePickerShown?: boolean;
  errorMessage?: string;
}

export class DatePicker extends BaseComponent<IDatePickerProps, IDatePickerState> {
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

    this._preventFocusOpeningPicker = false;
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

  @autobind
  private _onNavigateDate(date: Date, focusOnNavigatedDay: boolean) {
    this._focusOnSelectedDateOnUpdate = this._focusOnSelectedDateOnUpdate || focusOnNavigatedDay;
    this._navigateDay(date);
  }

  @autobind
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

  @autobind
  private _onGotoToday() {
    this._focusOnSelectedDateOnUpdate = true;
    this._navigateDay(new Date());
  };

  @autobind
  private _onGotoTodayKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      this._onGotoToday();
    }
  };

  @autobind
  private _onTextFieldFocus(ev: React.FocusEvent<HTMLElement>) {
    if (!this.props.allowTextInput) {
      if (!this._preventFocusOpeningPicker) {
        this._showDatePickerPopup();
      }

      this._preventFocusOpeningPicker = false;
    }
  };

  @autobind
  private _onTextFieldBlur(ev: React.FocusEvent<HTMLElement>) {
    this._validateTextInput();
  };

  @autobind
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

  @autobind
  private _onTextFieldKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
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

  @autobind
  private _onDatePickerPopupKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
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

  @autobind
  private _onClickCapture(ev: React.MouseEvent<HTMLElement>) {
    if (!elementContains(this.refs.root, ev.target as HTMLElement)) {
      this._dismissDatePickerPopup();
    }
  }

  @autobind
  private _onTextFieldClick(ev: React.MouseEvent<HTMLElement>) {
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

  @autobind
  private _handleEscKey(ev: React.KeyboardEvent<HTMLElement>) {
    this._restoreFocusToTextField();
    this._dismissDatePickerPopup();
  }

  @autobind
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

    if (allowTextInput) {
      let date = null;
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

      // Execute onSelectDate callback
      if (onSelectDate) {
        // If no input date string or input date string is invalid
        // date variable will be null, callback should expect null value for this case
        onSelectDate(date);
      }
    }
  }
}
