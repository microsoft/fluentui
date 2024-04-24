import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { NavBasicExample } from '../Nav/Nav.Basic.Example';

export const ShadowDOMNavExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <NavBasicExample />
    </Shadow>
  );
};
