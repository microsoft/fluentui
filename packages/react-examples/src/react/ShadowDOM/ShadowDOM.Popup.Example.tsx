import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { PopupBasicExample } from '../Popup/Popup.Basic.Example';

export const ShadowDOMPopupExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <PopupBasicExample />
    </Shadow>
  );
};
