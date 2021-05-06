import { Datepicker, Tooltip } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerHeaderCellExample = () => {
  return (
    <Datepicker
      today={new Date(2020, 8, 12, 0, 0, 0, 0)}
      calendar={{
        calendarHeaderCell: {
          children: (ComponentType, props) => (
            <Tooltip content={props['aria-label']} trigger={<ComponentType {...props} />} />
          ),
        },
      }}
    />
  );
};

export default DatepickerHeaderCellExample;
