import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ProgressIndicatorBasicExample } from '../ProgressIndicator/ProgressIndicator.Basic.Example';

export const ShadowDOMProgressIndicatorExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ProgressIndicatorBasicExample />
    </Shadow>
  );
};
