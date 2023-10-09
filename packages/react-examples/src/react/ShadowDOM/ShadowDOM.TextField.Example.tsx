import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TextFieldBasicExample } from '../TextField/TextField.Basic.Example';

export const ShadowDOMTextFieldExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TextFieldBasicExample />
    </Shadow>
  );
};
