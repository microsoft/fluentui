import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleNoInput = () => <Datepicker allowManualInput={false} today={new Date(2020, 9, 1, 0, 0, 0, 0)} />;

export default DatepickerExampleNoInput;
