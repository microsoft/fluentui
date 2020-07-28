import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { key: 'day', text: 'Day', iconProps: { iconName: 'CalendarDay' } },
  { key: 'week', text: 'Week', iconProps: { iconName: 'CalendarWeek' } },
  { key: 'month', text: 'Month', iconProps: { iconName: 'Calendar' }, disabled: true },
];

export const ChoiceGroupIconExample: React.FunctionComponent = () => {
  return <ChoiceGroup label="Pick one icon" defaultSelectedKey="day" options={options} />;
};
