import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { DatePickerBasicExample } from '../DatePicker/DatePicker.Basic.Example';

export const ShadowDOMDatePickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <DatePickerBasicExample />
    </Shadow>
  );
};
