import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';
import './DatePicker.Examples.scss';

export interface IDatePickerInputExampleState {
  firstDayOfWeek?: DayOfWeek;
  value?: Date | null;
}

export class DatePickerInputExample extends React.Component<{}, IDatePickerInputExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
      value: null
    };
  }

  public render(): JSX.Element {
    const { firstDayOfWeek, value } = this.state;
    const desc = 'This field is required. One of the support input formats is year dash month dash day.';
    return (
      <div className="docs-DatePickerExample">
        <p>
          Text input allowed by default when use keyboard navigation. Mouse click the TextField will popup DatePicker, click the TextField
          again will dismiss the DatePicker and allow text input.
        </p>
        <DatePicker
          label="Start date"
          isRequired={false}
          allowTextInput={true}
          ariaLabel={desc}
          firstDayOfWeek={firstDayOfWeek}
          strings={defaultDayPickerStrings}
          value={value!}
          onSelectDate={this._onSelectDate}
        />
        <DefaultButton onClick={this._onClick} text="Clear" />
      </div>
    );
  }

  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ value: date });
  };

  private _onClick = (): void => {
    this.setState({ value: null });
  };
}
