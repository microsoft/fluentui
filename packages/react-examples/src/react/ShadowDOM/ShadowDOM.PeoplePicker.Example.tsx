import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { PeoplePickerNormalExample } from '../PeoplePicker/PeoplePicker.Normal.Example';

export const ShadowDOMPeoplePickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <PeoplePickerNormalExample />
    </Shadow>
  );
};
