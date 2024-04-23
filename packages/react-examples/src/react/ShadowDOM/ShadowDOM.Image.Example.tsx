import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ImageDefaultExample } from '../Image/Image.Default.Example';

export const ShadowDOMImageExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ImageDefaultExample />
    </Shadow>
  );
};
