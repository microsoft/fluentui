import * as React from 'react';
import {
  IDatePickerProps,
  IDatePickerStrings
} from './DatePicker.types';
import {
  Calendar,
  DayOfWeek
} from '../../Calendar';
import { FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { TextField } from '../../TextField';
import {
  autobind,
  BaseComponent,
  KeyCodes,
  css
} from '../../Utilities';
import { compareDates, compareDatePart } from '../../utilities/dateMath/DateMath';
import * as stylesImport from './DatePicker.scss';
const styles: any = stylesImport;

export interface IDatePickerState {
  /** The currently focused date in the drop down, but not necessarily selected */
  navigatedDate?: Date;
  selectedDate?: Date;
  formattedDate?: string;
  isDatePickerShown?: boolean;
  errorMessage?: string;
}

const DEFAULT_STRINGS: IDatePickerStrings = {
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
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year'
};

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
    showMonthPickerAsOverlay: false,
    strings: DEFAULT_STRINGS,
    highlightCurrentMonth: false,
    borderless: false,
    pickerAriaLabel: 'Calender',
    showWeekNumbers: false,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    showGoToToday: true,
    dateTimeFormatter: undefined
  };

  private _root: HTMLElement;
  private _calendar: Calendar;
  private _datepicker: HTMLDivElement;
  private _textField: TextField;
  private _preventFocusOpeningPicker: boolean;
  private _focusOnSelectedDateOnUpdate: boolean;

  constructor(props: IDatePickerProps) {
    super(props);

    let { formatDate, value } = props;

    this.state = {
      selectedDate: value || new Date(),
      formattedDate: (formatDate && value) ? formatDate(value) : '',
      isDatePickerShown: false,
      errorMessage: undefined
    };

    this._preventFocusOpeningPicker = false;
  }

  public componentWillReceiveProps(nextProps: IDatePickerProps) {
    let { formatDate, isRequired, strings, value, minDate, maxDate } = nextProps;
    let errorMessage = (isRequired && !value) ? (strings!.isRequiredErrorMessage || '*') : undefined;

    if (!errorMessage && value) {
      errorMessage = this._isDateOutOfBounds(value!, minDate, maxDate) ? strings!.isOutOfBoundsErrorMessage || '*' : undefined;
    }

    // Set error message
    this.setState({
      errorMessage: errorMessage
    });

    // Issue# 1274: Check if the date value changed from old value, i.e., if indeed a new date is being
    // passed in or if the formatting function was modified. We only update the selected date if either of these
    // had a legit change. Note tha the bug will still repro when only the formatDate was passed in props and this
    // is the result of the onSelectDate callback, but this should be a rare scenario.
    let oldValue = this.state.selectedDate;
    if (!compareDates(oldValue!, value!) || this.props.formatDate !== formatDate) {
      this.setState({
        selectedDate: value || new Date(),
        formattedDate: (formatDate && value) ? formatDate(value) : '',
      });
    }
  }

  public render() {
    const {
      firstDayOfWeek,
      strings,
      label,
      isRequired,
      disabled,
      ariaLabel,
      pickerAriaLabel,
      placeholder,
      allowTextInput,
      borderless,
      className,
      minDate,
      maxDate,
      calendarProps
    } = this.props;
    const { isDatePickerShown, formattedDate, selectedDate, errorMessage } = this.state;

    return (
      <div className={ css('ms-DatePicker', styles.root, className) } ref={ this._resolveRef('_root') }>
        <div ref={ this._resolveRef('_datepicker') }>
          <TextField
            className={ styles.textField }
            ariaLabel={ ariaLabel }
            aria-haspopup='true'
            aria-expanded={ isDatePickerShown }
            required={ isRequired }
            disabled={ disabled }
            onKeyDown={ this._onTextFieldKeyDown }
            onFocus={ this._onTextFieldFocus }
            onBlur={ this._onTextFieldBlur }
            onClick={ this._onTextFieldClick }
            onChanged={ this._onTextFieldChanged }
            errorMessage={ errorMessage }
            label={ label }
            placeholder={ placeholder }
            borderless={ borderless }
            iconProps={ {
              iconName: 'Calendar',
              onClick: this._onIconClick,
              className: css(
                label ? 'ms-DatePicker-event--with-label' : 'ms-DatePicker-event--without-label',
                label ? styles.eventWithLabel : styles.eventWithoutLabel
              )
            } }
            readOnly={ !allowTextInput }
            value={ formattedDate }
            ref={ this._resolveRef('_textField') }
            role={ allowTextInput ? 'combobox' : 'menu' }
          />
        </div>
        { isDatePickerShown && (
          <Callout
            role='dialog'
            ariaLabel={ pickerAriaLabel }
            isBeakVisible={ false }
            className={ css('ms-DatePicker-callout') }
            gapSpace={ 0 }
            doNotLayer={ false }
            target={ this._datepicker }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            onDismiss={ this._calendarDismissed }
            onPositioned={ this._onCalloutPositioned }
          >
            <Calendar
              { ...calendarProps }
              onSelectDate={ this._onSelectDate }
              onDismiss={ this._calendarDismissed }
              isMonthPickerVisible={ this.props.isMonthPickerVisible }
              showMonthPickerAsOverlay={ this.props.showMonthPickerAsOverlay }
              today={ this.props.today }
              value={ selectedDate }
              firstDayOfWeek={ firstDayOfWeek }
              strings={ strings! }
              highlightCurrentMonth={ this.props.highlightCurrentMonth }
              showWeekNumbers={ this.props.showWeekNumbers }
              firstWeekOfYear={ this.props.firstWeekOfYear }
              showGoToToday={ this.props.showGoToToday }
              dateTimeFormatter={ this.props.dateTimeFormatter }
              minDate={ minDate }
              maxDate={ maxDate }
              ref={ this._resolveRef('_calendar') }
            />
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
    }, () => {
      if (onSelectDate) {
        onSelectDate(date);
      }
    });
  }

  @autobind
  private _onCalloutPositioned() {
    this._calendar.focus();
  }

  @autobind
  private _onTextFieldFocus(ev: React.FocusEvent<HTMLElement>) {
    if (this.props.disableAutoFocus) {
      return;
    }

    if (!this.props.allowTextInput) {
      if (!this._preventFocusOpeningPicker) {
        this._showDatePickerPopup();
      } else {
        this._preventFocusOpeningPicker = false;
      }
    }
  }

  @autobind
  private _onTextFieldBlur(ev: React.FocusEvent<HTMLElement>) {
    this._validateTextInput();
  }

  @autobind
  private _onTextFieldChanged(newValue: string) {
    if (this.props.allowTextInput) {
      if (this.state.isDatePickerShown) {
        this._dismissDatePickerPopup();
      }

      let { isRequired, value, strings } = this.props;

      this.setState({
        errorMessage: (isRequired && !value) ? (strings!.isRequiredErrorMessage || '*') : undefined,
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

  @autobind
  private _onIconClick(ev: React.MouseEvent<HTMLElement>) {
    ev.stopPropagation();
    this._onTextFieldClick(ev);
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

    if (this._textField) {
      this._textField.focus();
    }
  }

  @autobind
  private _handleEscKey(ev: React.KeyboardEvent<HTMLElement>) {
    this._calendarDismissed();
  }

  @autobind
  private _validateTextInput() {
    const { isRequired, allowTextInput, strings, parseDateFromString, onSelectDate, formatDate, minDate, maxDate } = this.props;
    const inputValue = this.state.formattedDate;

    // Do validation only if DatePicker's popup is dismissed
    if (this.state.isDatePickerShown) {
      return;
    }

    // Check when DatePicker is a required field but has NO input value
    if (isRequired && !inputValue) {
      this.setState({
        // Since fabic react doesn't have loc support yet
        // use the symbol '*' to represent error message
        errorMessage: strings!.isRequiredErrorMessage || '*'
      });
      return;
    }

    if (allowTextInput) {
      let date = null;
      if (inputValue) {
        // Don't parse if the selected date has the same formatted string as what we're about to parse.
        // The formatted string might be ambiguous (ex: "1/2/3" or "New Year Eve") and the parser might
        // not be able to come up with the exact same date.
        if (this.state.selectedDate && formatDate && formatDate(this.state.selectedDate) === inputValue) {
          date = this.state.selectedDate;
        } else {
          date = parseDateFromString!(inputValue);

          // Check if date is null, or date is Invalid Date
          if (!date || isNaN(date.getTime())) {

            // Reset invalid input field, if formatting is available
            if (formatDate) {
              date = this.state.selectedDate;
              this.setState({
                formattedDate: formatDate(date!).toString()
              });
            }

            this.setState({
              errorMessage: strings!.invalidInputErrorMessage || '*'
            });

          } else {
            // Check against optional date boundaries
            if (this._isDateOutOfBounds(date, minDate, maxDate)) {
              this.setState({
                errorMessage: strings!.isOutOfBoundsErrorMessage || '*'
              });
            } else {
              this.setState({
                selectedDate: date,
                errorMessage: ''
              });

              // When formatting is available. If formatted date is valid, but is different from input, update with formatted date
              // This occurs when an invalid date is entered twice
              if (formatDate && formatDate(date) !== inputValue) {
                this.setState({
                  formattedDate: formatDate(date).toString()
                });
              }
            }
          }
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

  private _isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
    return ((!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0));
  }
}