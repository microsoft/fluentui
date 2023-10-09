import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { LinkBasicExample } from '../Link/Link.Basic.Example';

export const ShadowDOMLinkExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <LinkBasicExample />
    </Shadow>
  );
};
