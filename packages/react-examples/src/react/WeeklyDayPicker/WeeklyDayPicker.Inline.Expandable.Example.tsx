import * as React from 'react';
import { WeeklyDayPicker, DayOfWeek, addDays, defaultWeeklyDayPickerStrings } from '@fluentui/react';

import * as styles from './WeeklyDayPicker.Example.scss';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IWeeklyDayPickerInlineExpandableExampleState {
  selectedDate?: Date;
  expanded?: boolean;
}

export class WeeklyDayPickerInlineExpandableExample extends React.Component<
  {},
  IWeeklyDayPickerInlineExpandableExampleState
> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      expanded: false,
    };
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <div>
          Selected date(s):{' '}
          <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
        </div>
        <div>
          <DefaultButton
            className={styles.button}
            onClick={this._expand}
            text="Expand/collapse"
            aria-expanded={this.state.expanded}
          />
        </div>
        <WeeklyDayPicker
          weeksToShow={6}
          onSelectDate={this._onSelectDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={defaultWeeklyDayPickerStrings}
          initialDate={this.state.selectedDate}
          showFullMonth={this.state.expanded}
        />
        <div>
          <DefaultButton className={styles.button} onClick={this._goPrevious} text="Previous" />
          <DefaultButton className={styles.button} onClick={this._goNext} text="Next" />
        </div>
      </div>
    );
  }

  private _onSelectDate = (date: Date): void => {
    this.setState((prevState: IWeeklyDayPickerInlineExpandableExampleState) => {
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

  private _expand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };
}
