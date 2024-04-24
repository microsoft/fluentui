import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ChoiceGroupBasicExample } from '../ChoiceGroup/ChoiceGroup.Basic.Example';

export const ShadowDOMChoiceGroupExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ChoiceGroupBasicExample />
    </Shadow>
  );
};
