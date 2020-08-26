import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleStandaloneCalendarInput = () => {
  const inputRef = React.useRef(null);
  return (
    <Datepicker
      input={{ ref: inputRef }}
      popup={{
        trigger: null,
        target: inputRef.current,
      }}
    />
  );
};
export default DatepickerExampleStandaloneCalendarInput;
