import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { CommandBarBasicExample } from '../CommandBar/CommandBar.Basic.Example';

export const ShadowDOMCommandBarExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <CommandBarBasicExample />
    </Shadow>
  );
};
