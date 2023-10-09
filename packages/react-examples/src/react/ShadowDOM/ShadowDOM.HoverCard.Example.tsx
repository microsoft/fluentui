import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { HoverCardBasicExample } from '../HoverCard/HoverCard.Basic.Example';

export const ShadowDOMHoverCardExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <HoverCardBasicExample />
    </Shadow>
  );
};
