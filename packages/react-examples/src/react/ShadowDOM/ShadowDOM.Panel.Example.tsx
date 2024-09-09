import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { PanelBasicExample } from '../Panel/Panel.Basic.Example';

export const ShadowDOMPanelExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <PanelBasicExample />
    </Shadow>
  );
};
