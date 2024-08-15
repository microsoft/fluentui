import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { OverflowSetBasicExample } from '../OverflowSet/OverflowSet.Basic.Example';

export const ShadowDOMOverflowSetExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <OverflowSetBasicExample />
    </Shadow>
  );
};
