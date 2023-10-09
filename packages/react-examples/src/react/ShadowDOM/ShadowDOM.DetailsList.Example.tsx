import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { DetailsListBasicExample } from '../DetailsList/DetailsList.Basic.Example';

export const ShadowDOMDetailsListExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <DetailsListBasicExample />
    </Shadow>
  );
};
