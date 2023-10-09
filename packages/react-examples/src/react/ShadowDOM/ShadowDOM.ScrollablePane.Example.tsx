import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ScrollablePaneDefaultExample } from '../ScrollablePane/ScrollablePane.Default.Example';

export const ShadowDOMScrollablePaneExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ScrollablePaneDefaultExample />
    </Shadow>
  );
};
