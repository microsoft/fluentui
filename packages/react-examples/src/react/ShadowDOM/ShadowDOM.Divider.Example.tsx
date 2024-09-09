import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { VerticalDividerBasicExample } from '../Divider/VerticalDivider.Basic.Example';

export const ShadowDOMVerticalDividerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <VerticalDividerBasicExample />
    </Shadow>
  );
};
