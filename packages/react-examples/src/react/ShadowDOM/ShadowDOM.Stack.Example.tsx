import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { VerticalStackBasicExample } from '../Stack/Stack.Vertical.Basic.Example';

export const ShadowDOMStackExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <VerticalStackBasicExample />
    </Shadow>
  );
};
