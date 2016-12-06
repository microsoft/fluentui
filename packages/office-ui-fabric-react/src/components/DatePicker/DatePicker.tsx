import * as React from 'react';
import {
  IDatePickerProps
} from './DatePicker.Props';
import {
  Calendar,
  DayOfWeek
} from '../../Calendar';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { TextField } from '../../TextField';
import {
  autobind,
  BaseComponent,
  KeyCodes,
  css
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

      return '';
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
  };

  private _calendar: Calendar;
  private _datepicker: HTMLDivElement;
  private _preventFocusOpeningPicker: boolean;
  private _focusOnSelectedDateOnUpdate: boolean;

  constructor(props: IDatePickerProps) {
    super();

    let { formatDate, value } = props;

    this.state = {
      selectedDate: value || new Date(),
      formattedDate: (formatDate && value) ? formatDate(value) : '',
      isDatePickerShown: false,
      errorMessage: null
    };

    this._preventFocusOpeningPicker = false;
  }

  public componentWillReceiveProps(nextProps: IDatePickerProps) {
    let { formatDate, isRequired, strings, value } = nextProps;
    const errorMessage = (isRequired && !value) ? (strings.isRequiredErrorMessage || '*') : null;

    this.setState({
      selectedDate: value || new Date(),
      formattedDate: (formatDate && value) ? formatDate(value) : '',
      errorMessage: errorMessage
    });
  }

  public render() {
    let rootClass = 'ms-DatePicker';
    let { firstDayOfWeek, strings, label, isRequired, ariaLabel, placeholder, allowTextInput } = this.props;
    let { isDatePickerShown, formattedDate, selectedDate, errorMessage } = this.state;

    return (
      <div className={ rootClass } ref='root'>
        <div ref={ (c): HTMLElement => this._datepicker = c }>
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
          <Callout
            isBeakVisible={ false }
            className='ms-DatePicker-callout'
            gapSpace={ 0 }
            doNotLayer={ false }
            targetElement={ this._datepicker }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            onDismiss={ this._calendarDismissed }
            onPositioned={ this._onCalloutPositioned }
            >
            <Calendar
              onSelectDate={ this._onSelectDate }
              onDismiss={ this._calendarDismissed }
              isMonthPickerVisible={ this.props.isMonthPickerVisible }
              value={ selectedDate }
              firstDayOfWeek={ firstDayOfWeek }
              strings={ strings }
              ref={ this._resolveRef('_calendar') }
              >
            </Calendar>
          </Callout>
        ) }
      </div>
    );
  }

  @autobind
  private _onSelectDate(date: Date) {
    let { formatDate, onSelectDate } = this.props;

    this.setState({
      selectedDate: date,
      isDatePickerShown: false,
      formattedDate: formatDate && date ? formatDate(date) : '',
    });

    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  @autobind
  private _onCalloutPositioned() {
    this._calendar.focus();
  }

  @autobind
  private _onTextFieldFocus(ev: React.FocusEvent<HTMLElement>) {
    if (!this.props.allowTextInput) {
      if (!this._preventFocusOpeningPicker) {
        this._showDatePickerPopup();
      } else {
        this._preventFocusOpeningPicker = false;
      }
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

      let { isRequired, value, strings } = this.props;

      this.setState({
        errorMessage: (isRequired && !value) ? (strings.isRequiredErrorMessage || '*') : null,
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
      this._preventFocusOpeningPicker = true;
      this._focusOnSelectedDateOnUpdate = true;
      this.setState({
        isDatePickerShown: true,
        navigatedDate: this.state.selectedDate,
        errorMessage: ''
      });
    }
  }

  @autobind
  private _dismissDatePickerPopup() {
    if (this.state.isDatePickerShown) {
      this.setState({
        isDatePickerShown: false
      });

      this._validateTextInput();
    }
  }

  /**
   * Callback for closing the calendar callout
   */
  @autobind
  private _calendarDismissed() {
    this._preventFocusOpeningPicker = true;
    this._dismissDatePickerPopup();
  }

  @autobind
  private _handleEscKey(ev: React.KeyboardEvent<HTMLElement>) {
    this._calendarDismissed();
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
            formattedDate: formatDate && date ? formatDate(date) : '',
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
