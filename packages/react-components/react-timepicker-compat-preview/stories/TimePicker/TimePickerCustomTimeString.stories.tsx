import * as React from 'react';
import { TimePicker } from '@fluentui/react-timepicker-compat-preview';

export const CustomTimeString = () => {
  const [anchor] = React.useState(new Date(2023, 1, 1, 12, 0, 0, 0));
  const formatDate = React.useCallback((date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`, []);
  return <TimePicker startHour={8} endHour={20} dateAnchor={anchor} formatDateToTimeString={formatDate} />;
};

CustomTimeString.parameters = {
  docs: {
    description: {
      story: 'The time display format can be customized using `formatDateToTimeString`.',
    },
  },
};
