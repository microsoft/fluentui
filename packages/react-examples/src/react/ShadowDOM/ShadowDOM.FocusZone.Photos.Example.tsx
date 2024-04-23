import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusZonePhotosExample } from '../../react-focus/FocusZone/FocusZone.Photos.Example';

export const ShadowDOMFocusZonePhotosExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusZonePhotosExample />
    </Shadow>
  );
};
