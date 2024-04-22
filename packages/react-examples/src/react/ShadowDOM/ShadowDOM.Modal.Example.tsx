import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ModalBasicExample } from '../Modal/Modal.Basic.Example';

export const ShadowDOMModalExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ModalBasicExample />
    </Shadow>
  );
};
