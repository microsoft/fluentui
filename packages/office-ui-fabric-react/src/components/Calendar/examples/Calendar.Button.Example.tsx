import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Calendar, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';

const DayPickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close'
};

export interface ICalendarButtonExampleState {
  showCalendar: boolean;
  selectedDate: Date | null;
}

export interface ICalendarButtonExampleProps {
  isDayPickerVisible?: boolean;
  isMonthPickerVisible?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  buttonString?: string;
  showMonthPickerAsOverlay?: boolean;
  showGoToToday?: boolean;
}

export class CalendarButtonExample extends React.Component<ICalendarButtonExampleProps, ICalendarButtonExampleState> {
  public static defaultProps: ICalendarButtonExampleProps = {
    showMonthPickerAsOverlay: false,
    isDayPickerVisible: true,
    isMonthPickerVisible: true,
    showGoToToday: true,
    buttonString: 'Click for Calendar'
  };

  private _calendarButtonElement: HTMLElement;

  public constructor(props: ICalendarButtonExampleProps) {
    super(props);

    this.state = {
      showCalendar: false,
      selectedDate: null
    };

    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <div ref={calendarBtn => (this._calendarButtonElement = calendarBtn!)}>
          <DefaultButton
            onClick={this._onClick}
            text={!this.state.selectedDate ? this.props.buttonString : this.state.selectedDate.toLocaleDateString()}
          />
        </div>
        {this.state.showCalendar && (
          <Callout
            isBeakVisible={false}
            className="ms-DatePicker-callout"
            gapSpace={0}
            doNotLayer={false}
            target={this._calendarButtonElement}
            directionalHint={DirectionalHint.bottomLeftEdge}
            onDismiss={this._onDismiss}
            setInitialFocus={true}
          >
            <FocusTrapZone isClickableOutsideFocusTrap={true}>
              <Calendar
                onSelectDate={this._onSelectDate}
                onDismiss={this._onDismiss}
                isMonthPickerVisible={this.props.isMonthPickerVisible}
                value={this.state.selectedDate!}
                firstDayOfWeek={DayOfWeek.Sunday}
                strings={DayPickerStrings}
                isDayPickerVisible={this.props.isDayPickerVisible}
                highlightCurrentMonth={this.props.highlightCurrentMonth}
                highlightSelectedMonth={this.props.highlightSelectedMonth}
                showMonthPickerAsOverlay={this.props.showMonthPickerAsOverlay}
                showGoToToday={this.props.showGoToToday}
              />
            </FocusTrapZone>
          </Callout>
        )}
      </div>
    );
  }

  private _onClick(event: any): void {
    this.setState((prevState: ICalendarButtonExampleState) => {
      prevState.showCalendar = !prevState.showCalendar;
      return prevState;
    });
  }

  private _onDismiss(): void {
    this.setState((prevState: ICalendarButtonExampleState) => {
      prevState.showCalendar = false;
      return prevState;
    });
  }

  private _onSelectDate(date: Date): void {
    this.setState((prevState: ICalendarButtonExampleState) => {
      prevState.showCalendar = false;
      prevState.selectedDate = date;
      return prevState;
    });
  }
}
