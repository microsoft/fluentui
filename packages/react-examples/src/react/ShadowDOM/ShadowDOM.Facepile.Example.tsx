import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FacepileBasicExample } from '../Facepile/Facepile.Basic.Example';

export const ShadowDOMFacepileExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FacepileBasicExample />
    </Shadow>
  );
};
