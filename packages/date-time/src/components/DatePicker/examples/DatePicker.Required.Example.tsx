import * as React from 'react';
import { DatePicker, DayOfWeek } from '@uifabric/date-time';
import './DatePicker.Examples.scss';
import { DayPickerStrings } from '../defaults';

export interface IDatePickerRequiredExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerRequiredExample extends React.Component<{}, IDatePickerRequiredExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render(): JSX.Element {
    const { firstDayOfWeek } = this.state;

    return (
      <div className="docs-DatePickerExample">
        <p>Validation will happen when Date Picker loses focus.</p>
        <DatePicker
          label="Date required (with label)"
          isRequired={true}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
        />
        <DatePicker
          isRequired={true}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Date required with no label..."
          ariaLabel="Select a date"
        />
      </div>
    );
  }
}
