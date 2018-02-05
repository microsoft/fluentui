import * as React from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export class ChoiceGroupIconExample extends React.Component<any, any> {
  public render() {
    return (
      <ChoiceGroup
        label='Pick one icon'
        options={ [
          {
            key: 'day',
            iconProps: { iconName: 'CalendarDay' },
            text: 'Day'
          },
          {
            key: 'week',
            iconProps: { iconName: 'CalendarWeek' },
            text: 'Week'
          },
          {
            key: 'month',
            iconProps: { iconName: 'Calendar' },
            text: 'Month',
            disabled: true
          }
        ] }
      />
    );
  }
}
