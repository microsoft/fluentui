import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ToggleBasicExample } from '../Toggle/Toggle.Basic.Example';

export const ShadowDOMToggleExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ToggleBasicExample />
    </Shadow>
  );
};
