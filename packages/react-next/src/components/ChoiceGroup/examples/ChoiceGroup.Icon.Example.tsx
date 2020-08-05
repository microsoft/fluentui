import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react-next/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { optionKey: 'day', text: 'Day', iconProps: { iconName: 'CalendarDay' } },
  { optionKey: 'week', text: 'Week', iconProps: { iconName: 'CalendarWeek' } },
  { optionKey: 'month', text: 'Month', iconProps: { iconName: 'Calendar' }, disabled: true },
];

export const ChoiceGroupIconExample: React.FunctionComponent = () => {
  return <ChoiceGroup label="Pick one icon" defaultSelectedKey="day" options={options} />;
};
