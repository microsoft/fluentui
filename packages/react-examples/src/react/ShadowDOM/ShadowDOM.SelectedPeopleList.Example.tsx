import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SelectedPeopleListBasicExample } from '../SelectedPeopleList/SelectedPeopleList.Basic.Example';

export const ShadowDOMSelectedPeopleListExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SelectedPeopleListBasicExample />
    </Shadow>
  );
};
