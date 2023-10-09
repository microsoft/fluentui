import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { MarqueeSelectionBasicExample } from '../MarqueeSelection/MarqueeSelection.Basic.Example';

export const ShadowDOMMarqueeSelectionExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <MarqueeSelectionBasicExample />
    </Shadow>
  );
};
