import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { LabelBasicExample } from '../Label/Label.Basic.Example';

export const ShadowDOMLabelExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <LabelBasicExample />
    </Shadow>
  );
};
