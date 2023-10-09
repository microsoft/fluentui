import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { IconBasicExample } from '../Icon/Icon.Basic.Example';

export const ShadowDOMIconExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <IconBasicExample />
    </Shadow>
  );
};
