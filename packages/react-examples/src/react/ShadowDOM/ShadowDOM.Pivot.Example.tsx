import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { PivotBasicExample } from '../Pivot/Pivot.Basic.Example';

export const ShadowDOMPivotExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <PivotBasicExample />
    </Shadow>
  );
};
