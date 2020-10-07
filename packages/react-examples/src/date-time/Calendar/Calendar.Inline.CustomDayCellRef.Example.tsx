import * as React from 'react';
import {
  Calendar,
  ICalendarDayGridStyles,
  DateRangeType,
  DayOfWeek,
  defaultDayPickerStrings,
} from '@uifabric/date-time';
import { IProcessedStyleSet } from '@uifabric/styling';

import * as styles from './Calendar.Example.scss';

export interface ICalendarInlineExampleState {
  selectedDate?: Date;
}

export class CalendarInlineCustomDayCellRefExample extends React.Component<{}, ICalendarInlineExampleState> {
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
        <Calendar
          dateRangeType={DateRangeType.Day}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          calendarDayProps={{
            customDayCellRef: (
              element: HTMLElement,
              date: Date,
              classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
            ) => {
              if (element) {
                element.title = 'custom title from customDayCellRef: ' + date.toString();
                if (date.getDay() === 0 || date.getDay() === 6) {
                  classNames.dayOutsideBounds && element.classList.add(classNames.dayOutsideBounds);
                  (element.children[0] as HTMLButtonElement).disabled = true;
                }
              }
            },
          }}
          onSelectDate={this._onSelectDate}
          value={this.state.selectedDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={defaultDayPickerStrings}
        />
      </div>
    );
  }

  private _onSelectDate = (date: Date): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        selectedDate: date,
      };
    });
  };
}
