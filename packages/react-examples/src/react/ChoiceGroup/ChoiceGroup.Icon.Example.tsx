import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { key: 'day', text: 'Day', iconProps: { iconName: 'CalendarDay' } },
  { key: 'week', text: 'Week', iconProps: { iconName: 'CalendarWeek' } },
  { key: 'month', text: 'Month', iconProps: { iconName: 'Calendar' }, disabled: true },
];

export const ChoiceGroupIconExample: React.FunctionComponent = () => {
  return (
    <>
      <ChoiceGroup label="Pick one icon" defaultSelectedKey="day" options={options} />;
      <p>
        Warning: this ChoiceGroup option layout restricts the space that label text has to expand and wrap. This can
        cause issues for accessibility, when zoom and text spacing increase the length of words and lines, and also
        internationalization, since translated text length will vary.
      </p>
      <p>We recommend using the standard layout with an inline icon for labels longer than a single short word.</p>
    </>
  );
};
