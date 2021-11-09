import * as React from 'react';
import { FocusInnerZone } from './FocusInnerZone';
import { FocusZoneProps } from './FocusZone.types';

export const FocusZone = React.forwardRef<any, FocusZoneProps>((props, ref) => {
  return <FocusInnerZone {...props} innerRef={ref} />;
});
