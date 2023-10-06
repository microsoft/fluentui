import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SearchBoxFullSizeExample } from '../SearchBox/SearchBox.FullSize.Example';

export const ShadowDOMSearchBoxExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SearchBoxFullSizeExample />
    </Shadow>
  );
};
