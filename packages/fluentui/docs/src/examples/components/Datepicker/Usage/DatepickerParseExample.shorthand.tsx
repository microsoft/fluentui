import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerParseExample = () => {
  const customParser: (dateString: string) => Date = dateString => {
    const trimmedDateString = dateString.trim();
    return new Date(trimmedDateString);
  };
  return <Datepicker parseDate={customParser} />;
};

export default DatepickerParseExample;
