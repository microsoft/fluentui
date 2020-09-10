import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerFormatExample = () => {
  const customFormatter: (date: Date) => string = date => {
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} of ${year}`;
  };
  return <Datepicker formatMonthDayYear={customFormatter} today={new Date(2020, 8, 12, 0, 0, 0, 0)} />;
};

export default DatepickerFormatExample;
