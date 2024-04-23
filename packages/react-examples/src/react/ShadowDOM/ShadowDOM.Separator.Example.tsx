import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SeparatorBasicExample } from '../Separator/Separator.Basic.Example';

export const ShadowDOMSeparatorExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SeparatorBasicExample />
    </Shadow>
  );
};
