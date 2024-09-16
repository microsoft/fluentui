import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { CheckboxBasicExample } from '../Checkbox/Checkbox.Basic.Example';

export const ShadowDOMCheckboxExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <CheckboxBasicExample />
    </Shadow>
  );
};
