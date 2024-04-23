import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SpinButtonBasicExample } from '../SpinButton/SpinButton.Basic.Example';

export const ShadowDOMSpinButtonExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SpinButtonBasicExample />
    </Shadow>
  );
};
