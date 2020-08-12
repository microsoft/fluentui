import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerParseExample = () => {
  const customParse = (dateString: string) => {
    const trimmedDateString = dateString.trim();
    return new Date(trimmedDateString);
  };
  return <Datepicker parseDate={customParse} />;
};

export default DatepickerParseExample;
