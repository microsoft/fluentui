import * as React from 'react';
import { WeeklyDayPicker, DayOfWeek, addDays, defaultWeeklyDayPickerStrings } from '@fluentui/react';

import * as styles from './WeeklyDayPicker.Example.scss';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IWeeklyDayPickerInlineExampleState {
  selectedDate?: Date;
}

export class WeeklyDayPickerInlineExample extends React.Component<{}, IWeeklyDayPickerInlineExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: new Date(),
    };
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <div>
          Selected date(s):{' '}
          <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
        </div>
        <WeeklyDayPicker
          onSelectDate={this._onSelectDate}
          firstDayOfWeek={DayOfWeek.Wednesday}
          strings={defaultWeeklyDayPickerStrings}
          initialDate={this.state.selectedDate}
        />
        <div>
          <DefaultButton className={styles.button} onClick={this._goPrevious} text="Previous" />
          <DefaultButton className={styles.button} onClick={this._goNext} text="Next" />
        </div>
      </div>
    );
  }

  private _onSelectDate = (date: Date): void => {
    this.setState((prevState: IWeeklyDayPickerInlineExampleState) => {
      return {
        selectedDate: date,
      };
    });
  };

  private _goPrevious = () => {
    if (this.state && this.state.selectedDate) {
      this._onSelectDate(addDays(this.state.selectedDate, -1));
    }
  };

  private _goNext = () => {
    if (this.state && this.state.selectedDate) {
      this._onSelectDate(addDays(this.state.selectedDate, 1));
    }
  };
}
