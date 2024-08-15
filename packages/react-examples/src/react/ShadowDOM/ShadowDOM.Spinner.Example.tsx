import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SpinnerBasicExample } from '../Spinner/Spinner.Basic.Example';

export const ShadowDOMSpinnerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SpinnerBasicExample />
    </Shadow>
  );
};
