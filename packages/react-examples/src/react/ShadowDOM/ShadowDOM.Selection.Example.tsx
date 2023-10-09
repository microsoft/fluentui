import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SelectionBasicExample } from '../Selection/Selection.Basic.Example';

export const ShadowDOMSelectionExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SelectionBasicExample />
    </Shadow>
  );
};
