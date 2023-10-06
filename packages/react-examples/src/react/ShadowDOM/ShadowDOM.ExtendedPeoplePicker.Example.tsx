import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ExtendedPeoplePickerBasicExample } from '../ExtendedPeoplePicker/ExtendedPeoplePicker.Basic.Example';

export const ShadowDOMExtendedPeoplePickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ExtendedPeoplePickerBasicExample />
    </Shadow>
  );
};
