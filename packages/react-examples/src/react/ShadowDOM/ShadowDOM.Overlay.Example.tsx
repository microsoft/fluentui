import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { OverlayLightExample } from '../Overlay/Overlay.Light.Example';

export const ShadowDOMOverlayExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <OverlayLightExample />
    </Shadow>
  );
};
