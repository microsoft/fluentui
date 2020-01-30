import * as React from 'react';
import { WeeklyDayPicker, DayOfWeek, addDays, IWeeklyDayPickerProps, defaultDayPickerStrings } from '@uifabric/date-time';

import * as styles from './WeeklyDayPicker.Example.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IWeeklyDayPickerInlineExpandableExampleState {
  selectedDate?: Date;
  expanded?: boolean;
}

export interface IWeeklyDayPickerInlineExpandableExampleProps extends Omit<IWeeklyDayPickerProps, 'strings'> {
  showExpandButton?: boolean;
  showNavigateButtons?: boolean;
}

export class WeeklyDayPickerInlineExpandableExample extends React.Component<
  IWeeklyDayPickerInlineExpandableExampleProps,
  IWeeklyDayPickerInlineExpandableExampleState
> {
  public constructor(props: IWeeklyDayPickerInlineExpandableExampleProps) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      expanded: false
    };

    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        {
          <div>
            Selected date(s): <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
          </div>
        }
        {(this.props.minDate || this.props.maxDate) && (
          <div>
            Date boundary:
            <span>
              {' '}
              {this.props.minDate ? this.props.minDate.toLocaleDateString() : 'Not set'}-
              {this.props.maxDate ? this.props.maxDate.toLocaleDateString() : 'Not set'}
            </span>
          </div>
        )}
        {this.props.restrictedDates && (
          <div>
            Disabled date(s):
            <span>
              {' '}
              {this.props.restrictedDates.length > 0
                ? this.props.restrictedDates.map((d: Date) => d.toLocaleDateString()).join(', ')
                : 'Not set'}
            </span>
          </div>
        )}
        {this.props.showExpandButton && (
          <div>
            <DefaultButton className={styles.button} onClick={this._expand} text="Expand/collapse" aria-expanded={this.state.expanded} />
          </div>
        )}
        <WeeklyDayPicker
          {...this.props}
          onSelectDate={this._onSelectDate}
          firstDayOfWeek={this.props.firstDayOfWeek ? this.props.firstDayOfWeek : DayOfWeek.Sunday}
          strings={defaultDayPickerStrings}
          initialDate={this.state.selectedDate}
          showFullMonth={this.state.expanded}
        />
        {this.props.showNavigateButtons && (
          <div>
            <DefaultButton className={styles.button} onClick={this._goPrevious} text="Previous" />
            <DefaultButton className={styles.button} onClick={this._goNext} text="Next" />
          </div>
        )}
      </div>
    );
  }

  private _onSelectDate(date: Date): void {
    this.setState((prevState: IWeeklyDayPickerInlineExpandableExampleState) => {
      return {
        selectedDate: date
      };
    });
  }

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
      expanded: !this.state.expanded
    });
  };
}
