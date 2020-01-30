import * as React from 'react';
import { DatePicker, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';
import './DatePicker.Examples.scss';

export interface IDatePickerDisabledExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerDisabledExample extends React.Component<{}, IDatePickerDisabledExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render(): JSX.Element {
    const { firstDayOfWeek } = this.state;

    return (
      <div className="docs-DatePickerExample">
        <DatePicker
          firstDayOfWeek={firstDayOfWeek}
          strings={defaultDayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          disabled={true}
        />

        <DatePicker
          label="Disabled (with label)"
          firstDayOfWeek={firstDayOfWeek}
          strings={defaultDayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          disabled={true}
        />
      </div>
    );
  }
}
