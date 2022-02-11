import * as React from 'react';

import { usePortal_unstable } from './usePortal';
import type { PortalProps } from './Portal.types';

/**
 * A portal provides a way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
export const Portal: React.FC<PortalProps> = props => {
  const [state, render] = usePortal_unstable(props);

  return render(state);
};

Portal.displayName = 'Portal';
