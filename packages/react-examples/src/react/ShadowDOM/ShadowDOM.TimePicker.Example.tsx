import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TimePickerBasicExample } from '../TimePicker/TimePicker.Basic.Example';

export const ShadowDOMTimePickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TimePickerBasicExample />
    </Shadow>
  );
};
