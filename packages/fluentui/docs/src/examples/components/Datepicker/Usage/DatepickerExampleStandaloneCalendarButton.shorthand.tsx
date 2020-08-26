import { Datepicker, Button } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleStandaloneCalendarButton = () => {
  return (
    <Datepicker
      onDateChange={(e, v) => {
        alert(`You picked '${v.value}'.`);
      }}
      input={null}
      popup={{
        trigger: <Button title="Open calendar" content="Click to Open " />,
      }}
    />
  );
};
export default DatepickerExampleStandaloneCalendarButton;
