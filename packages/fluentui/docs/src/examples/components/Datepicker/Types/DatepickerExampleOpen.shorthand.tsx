import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';
import { Datepicker } from '@fluentui/react-northstar';

const DatepickerExampleOpen = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' });
  return (
    <Datepicker
      calendarOpenState={open}
      onCalendarOpenStateChange={(_, { calendarOpenState }) => setOpen(calendarOpenState)}
    />
  );
};

export default DatepickerExampleOpen;
