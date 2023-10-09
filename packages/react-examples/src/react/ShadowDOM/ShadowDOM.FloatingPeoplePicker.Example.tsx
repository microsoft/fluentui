import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FloatingPeoplePickerTypesExample } from '../FloatingPeoplePicker/FloatingPeoplePicker.Basic.Example';

export const ShadowDOMFloatingPeoplePickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FloatingPeoplePickerTypesExample />
    </Shadow>
  );
};
