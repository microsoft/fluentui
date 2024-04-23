import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { MessageBarBasicExample } from '../MessageBar/MessageBar.Basic.Example';

export const ShadowDOMMessageBarExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <MessageBarBasicExample />
    </Shadow>
  );
};
