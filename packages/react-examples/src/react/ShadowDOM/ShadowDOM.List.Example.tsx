import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ListBasicExample } from '../List/List.Basic.Example';

export const ShadowDOMListExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ListBasicExample />
    </Shadow>
  );
};
