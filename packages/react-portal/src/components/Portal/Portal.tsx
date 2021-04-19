import * as React from 'react';

import { usePortal } from './usePortal';
import { PortalProps } from './Portal.types';
import { renderPortal } from './renderPortal';

/**
 * Component that renders a slot in a React portal
 */
export const Portal = React.forwardRef((props: PortalProps, ref: React.Ref<HTMLElement>) => {
  const state = usePortal(props, ref);

  return renderPortal(state);
});

Portal.displayName = 'Portal';
