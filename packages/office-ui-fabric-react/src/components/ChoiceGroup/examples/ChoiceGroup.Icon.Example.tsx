import * as React from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export class ChoiceGroupIconExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ChoiceGroup
        label='Pick one icon'
        options={ [
          {
            key: 'day',
            iconProps: { name: 'CalendarDay' },
            text: 'Day'
          },
          {
            key: 'week',
            iconProps: { name: 'CalendarWeek' },
            text: 'Week'
          },
          {
            key: 'month',
            iconProps: { name: 'Calendar' },
            text: 'Month',
            disabled: true
          }
        ] }
      />
    );
  }
}
