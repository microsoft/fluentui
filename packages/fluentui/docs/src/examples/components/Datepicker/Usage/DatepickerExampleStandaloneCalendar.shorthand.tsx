import { DatepickerCalendar, Popup, Button } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleStandaloneCalendar = () => {
  return <Popup trigger={<Button title="Open calendar" content="Click to Open " />} content={<DatepickerCalendar />} />;
};

export default DatepickerExampleStandaloneCalendar;
