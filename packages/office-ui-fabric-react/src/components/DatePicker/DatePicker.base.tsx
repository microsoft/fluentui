import * as React from 'react';
import { IDatePicker, IDatePickerProps, IDatePickerStrings, IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import { BaseComponent, KeyCodes, classNamesFunction, getId, getNativeProps, divProperties, css } from '../../Utilities';
import { Calendar, ICalendar, DayOfWeek } from '../../Calendar';
import { FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { TextField, ITextField } from '../../TextField';
import { compareDates, compareDatePart } from '../../utilities/dateMath/DateMath';
import { FocusTrapZone } from '../../FocusTrapZone';

const getClassNames = classNamesFunction<IDatePickerStyleProps, IDatePickerStyles>();

export interface IDatePickerState {
  selectedDate?: Date;
  formattedDate?: string;
  isDatePickerShown?: boolean;
  errorMessage?: string;
}

const DEFAULT_STRINGS: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};

export class DatePickerBase extends BaseComponent<IDatePickerProps, IDatePickerState> implements IDatePicker {
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
    initialPickerDate: new Date(),
    isRequired: false,
    isMonthPickerVisible: true,
    showMonthPickerAsOverlay: false,
    strings: DEFAULT_STRINGS,
    highlightCurrentMonth: false,
    highlightSelectedMonth: false,
    borderless: false,
    pickerAriaLabel: 'Calendar',
    showWeekNumbers: false,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    showGoToToday: true,
    dateTimeFormatter: undefined,
    showCloseButton: false,
    underlined: false,
    allFocusable: false
  };

  private _calendar = React.createRef<ICalendar>();
  private _datePickerDiv = React.createRef<HTMLDivElement>();
  private _textField = React.createRef<ITextField>();
  private _preventFocusOpeningPicker: boolean;
  private _id: string;

  constructor(props: IDatePickerProps) {
    super(props);
    this.state = this._getDefaultState();

    this._id = props.id || getId('DatePicker');

    this._preventFocusOpeningPicker = false;
  }

  public componentWillReceiveProps(nextProps: IDatePickerProps): void {
    const { formatDate, isRequired, strings, value, minDate, maxDate } = nextProps;

    if (
      compareDates(this.props.minDate!, nextProps.minDate!) &&
      compareDates(this.props.maxDate!, nextProps.maxDate!) &&
      this.props.isRequired === nextProps.isRequired &&
      compareDates(this.state.selectedDate!, value!) &&
      this.props.formatDate === formatDate
    ) {
      // if the props we care about haven't changed, don't run validation or updates
      return;
    }

    let errorMessage = isRequired && !value ? strings!.isRequiredErrorMessage || ' ' : undefined;

    if (!errorMessage && value) {
      errorMessage = this._isDateOutOfBounds(value!, minDate, maxDate) ? strings!.isOutOfBoundsErrorMessage || ' ' : undefined;
    }

    this._id = nextProps.id || this._id;

    // Set error message
    this.setState({
      errorMessage: errorMessage
    });

    // Issue# 1274: Check if the date value changed from old value, i.e., if indeed a new date is being
    // passed in or if the formatting function was modified. We only update the selected date if either of these
    // had a legit change. Note tha the bug will still repro when only the formatDate was passed in props and this
    // is the result of the onSelectDate callback, but this should be a rare scenario.
    const oldValue = this.state.selectedDate;
    if (!compareDates(oldValue!, value!) || this.props.formatDate !== formatDate) {
      this.setState({
        selectedDate: value || undefined,
        formattedDate: formatDate && value ? formatDate(value) : ''
      });
    }
  }

  public componentDidUpdate(prevProps: IDatePickerProps, prevState: IDatePickerState) {
    if (prevState.isDatePickerShown && !this.state.isDatePickerShown) {
      // In browsers like IE, textfield gets unfocused when datepicker is collapsed
      if (this.props.allowTextInput) {
        this._async.requestAnimationFrame(() => this.focus());
      }

      // If DatePicker's menu (Calendar) is closed, run onAfterMenuDismiss
      if (this.props.onAfterMenuDismiss) {
        this.props.onAfterMenuDismiss();
      }
    }
  }

  public render(): JSX.Element {
    const {
      firstDayOfWeek,
      strings,
      label,
      theme,
      className,
      styles,
      initialPickerDate,
      isRequired,
      disabled,
      ariaLabel,
      pickerAriaLabel,
      placeholder,
      allowTextInput,
      borderless,
      minDate,
      maxDate,
      showCloseButton,
      calendarProps,
      calloutProps,
      textField: textFieldProps,
      underlined,
      allFocusable,
      calendarAs: CalendarType = Calendar,
      tabIndex
    } = this.props;
    const { isDatePickerShown, formattedDate, selectedDate, errorMessage } = this.state;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      disabled,
      label: !!label,
      isDatePickerShown
    });

    const calloutId = getId('DatePicker-Callout');
    const nativeProps = getNativeProps(this.props, divProperties, ['value']);
    const iconProps = textFieldProps && textFieldProps.iconProps;

    return (
      <div {...nativeProps} className={classNames.root}>
        <div
          ref={this._datePickerDiv}
          role="combobox"
          aria-expanded={isDatePickerShown}
          aria-haspopup="true"
          aria-owns={isDatePickerShown ? calloutId : undefined}
        >
          <TextField
            label={label}
            ariaLabel={ariaLabel}
            aria-controls={isDatePickerShown ? calloutId : undefined}
            required={isRequired}
            disabled={disabled}
            errorMessage={errorMessage}
            placeholder={placeholder}
            borderless={borderless}
            value={formattedDate}
            componentRef={this._textField}
            underlined={underlined}
            tabIndex={tabIndex}
            readOnly={!allowTextInput}
            {...textFieldProps}
            id={this._id + '-label'}
            className={css(classNames.textField, textFieldProps && textFieldProps.className)}
            iconProps={{
              iconName: 'Calendar',
              ...iconProps,
              className: css(classNames.icon, iconProps && iconProps.className),
              onClick: this._onIconClick
            }}
            onKeyDown={this._onTextFieldKeyDown}
            onFocus={this._onTextFieldFocus}
            onBlur={this._onTextFieldBlur}
            onClick={this._onTextFieldClick}
            onChange={this._onTextFieldChanged}
          />
        </div>
        {isDatePickerShown && (
          <Callout
            id={calloutId}
            role="dialog"
            ariaLabel={pickerAriaLabel}
            isBeakVisible={false}
            gapSpace={0}
            doNotLayer={false}
            target={this._datePickerDiv.current}
            directionalHint={DirectionalHint.bottomLeftEdge}
            {...calloutProps}
            className={css(classNames.callout, calloutProps && calloutProps.className)}
            onDismiss={this._calendarDismissed}
            onPositioned={this._onCalloutPositioned}
          >
            <FocusTrapZone isClickableOutsideFocusTrap={true} disableFirstFocus={this.props.disableAutoFocus}>
              <CalendarType
                {...calendarProps}
                onSelectDate={this._onSelectDate}
                onDismiss={this._calendarDismissed}
                isMonthPickerVisible={this.props.isMonthPickerVisible}
                showMonthPickerAsOverlay={this.props.showMonthPickerAsOverlay}
                today={this.props.today}
                value={selectedDate || initialPickerDate}
                firstDayOfWeek={firstDayOfWeek}
                strings={strings!}
                highlightCurrentMonth={this.props.highlightCurrentMonth}
                highlightSelectedMonth={this.props.highlightSelectedMonth}
                showWeekNumbers={this.props.showWeekNumbers}
                firstWeekOfYear={this.props.firstWeekOfYear}
                showGoToToday={this.props.showGoToToday}
                dateTimeFormatter={this.props.dateTimeFormatter}
                minDate={minDate}
                maxDate={maxDate}
                componentRef={this._calendar}
                showCloseButton={showCloseButton}
                allFocusable={allFocusable}
              />
            </FocusTrapZone>
          </Callout>
        )}
      </div>
    );
  }

  public focus(): void {
    if (this._textField.current) {
      this._textField.current.focus();
    }
  }

  public reset(): void {
    this.setState(this._getDefaultState());
  }

  private _onSelectDate = (date: Date): void => {
    const { formatDate, onSelectDate } = this.props;

    if (this.props.calendarProps && this.props.calendarProps.onSelectDate) {
      this.props.calendarProps.onSelectDate(date);
    }

    this.setState({
      selectedDate: date,
      formattedDate: formatDate && date ? formatDate(date) : ''
    });

    if (onSelectDate) {
      onSelectDate(date);
    }

    this._calendarDismissed();
  };

  private _onCalloutPositioned = (): void => {
    if (this._calendar.current && !this.props.disableAutoFocus) {
      this._calendar.current.focus();
    }
  };

  private _onTextFieldFocus = (ev: React.FocusEvent<HTMLElement>): void => {
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
  };

  private _onTextFieldBlur = (ev: React.FocusEvent<HTMLElement>): void => {
    this._validateTextInput();
  };

  private _onTextFieldChanged = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void => {
    if (this.props.allowTextInput) {
      if (this.state.isDatePickerShown) {
        this._dismissDatePickerPopup();
      }

      const { isRequired, value, strings } = this.props;

      this.setState({
        errorMessage: isRequired && !value ? strings!.isRequiredErrorMessage || ' ' : undefined,
        formattedDate: newValue
      });
    }
  };

  private _onTextFieldKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    switch (ev.which) {
      case KeyCodes.enter:
        ev.preventDefault();
        ev.stopPropagation();
        if (!this.state.isDatePickerShown) {
          this._validateTextInput();
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

  private _onTextFieldClick = (ev: React.MouseEvent<HTMLElement>): void => {
    if (!this.state.isDatePickerShown && !this.props.disabled) {
      this._showDatePickerPopup();
    } else {
      if (this.props.allowTextInput) {
        this.setState({
          isDatePickerShown: false
        });
      }
    }
  };

  private _onIconClick = (ev: React.MouseEvent<HTMLElement>): void => {
    ev.stopPropagation();
    this._onTextFieldClick(ev);
  };

  private _showDatePickerPopup(): void {
    if (!this.state.isDatePickerShown) {
      this._preventFocusOpeningPicker = true;
      this.setState({
        isDatePickerShown: true,
        errorMessage: ''
      });
    }
  }

  private _dismissDatePickerPopup = (): void => {
    if (this.state.isDatePickerShown) {
      this.setState(
        {
          isDatePickerShown: false
        },
        () => {
          // setState is async, so we must call validate in a callback
          this._validateTextInput();
        }
      );
    }
  };

  /**
   * Callback for closing the calendar callout
   */
  private _calendarDismissed = (): void => {
    this._preventFocusOpeningPicker = true;
    this._dismissDatePickerPopup();
    // don't need to focus the text box, if necessary the focusTrapZone will do it
  };

  private _handleEscKey = (ev: React.KeyboardEvent<HTMLElement>): void => {
    ev.stopPropagation();
    this._calendarDismissed();
  };

  private _validateTextInput = (): void => {
    const { isRequired, allowTextInput, strings, parseDateFromString, onSelectDate, formatDate, minDate, maxDate } = this.props;
    const inputValue = this.state.formattedDate;

    // Do validation only if DatePicker's popup is dismissed
    if (this.state.isDatePickerShown) {
      return;
    }

    if (allowTextInput) {
      let date = null;
      if (inputValue) {
        // Don't parse if the selected date has the same formatted string as what we're about to parse.
        // The formatted string might be ambiguous (ex: "1/2/3" or "New Year Eve") and the parser might
        // not be able to come up with the exact same date.
        if (this.state.selectedDate && formatDate && formatDate(this.state.selectedDate) === inputValue) {
          return;
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
              errorMessage: strings!.invalidInputErrorMessage || ' '
            });
          } else {
            // Check against optional date boundaries
            if (this._isDateOutOfBounds(date, minDate, maxDate)) {
              this.setState({
                errorMessage: strings!.isOutOfBoundsErrorMessage || ' '
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
        // Only show error for empty inputValue if it is a required field
        this.setState({
          errorMessage: isRequired ? strings!.isRequiredErrorMessage || ' ' : ''
        });
      }

      // Execute onSelectDate callback
      if (onSelectDate) {
        // If no input date string or input date string is invalid
        // date variable will be null, callback should expect null value for this case
        onSelectDate(date);
      }
    } else if (isRequired && !inputValue) {
      // Check when DatePicker is a required field but has NO input value
      this.setState({
        errorMessage: strings!.isRequiredErrorMessage || ' '
      });
    }
  };

  private _getDefaultState(props: IDatePickerProps = this.props): IDatePickerState {
    return {
      selectedDate: props.value || undefined,
      formattedDate: props.formatDate && props.value ? props.formatDate(props.value) : '',
      isDatePickerShown: false,
      errorMessage: undefined
    };
  }

  private _isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
    return (!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0);
  }
}
