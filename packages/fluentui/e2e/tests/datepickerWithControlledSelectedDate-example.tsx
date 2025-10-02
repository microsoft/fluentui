import * as React from 'react';
import { Datepicker, Button } from '@fluentui/react-northstar';

const defaultSelectedDate = new Date(2020, 6, 23, 0, 0, 0, 0);
const getNextDay = (date: Date) => {
  date.setDate(date.getDate() + 1);
  return new Date(date.getTime());
};

const DatepickerExample = () => {
  const [selectedDate, setSelectedDate] = React.useState(defaultSelectedDate);

  return (
    <>
      <Datepicker today={new Date(2020, 6, 23, 0, 0, 0, 0)} selectedDate={selectedDate} />
      <Button
        className="select-next-day"
        content="Select the next day"
        onClick={() => {
          setSelectedDate(selectedDate => {
            if (!selectedDate) {
              return getNextDay(defaultSelectedDate);
            }
            return getNextDay(selectedDate);
          });
        }}
      />
    </>
  );
};

export default DatepickerExample;
