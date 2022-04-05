import { Datepicker, Tooltip } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerCellExample = () => {
  return (
    <Datepicker
      today={new Date(2020, 8, 12, 0, 0, 0, 0)}
      calendar={{
        calendarCell: {
          children: (ComponentType, props) =>
            props.today ? (
              <Tooltip content="TODAY!" trigger={<ComponentType {...props} />} />
            ) : (
              <ComponentType {...props} />
            ),
        },
      }}
    />
  );
};

export default DatepickerCellExample;
