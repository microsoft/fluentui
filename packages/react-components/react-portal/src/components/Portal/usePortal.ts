import { setVirtualParent } from '@fluentui/react-utilities';
import * as React from 'react';

import { toMountNodeProps } from '../../utils/toMountNodeProps';
import { usePortalMountNode } from './usePortalMountNode';
import type { PortalProps, PortalState } from './Portal.types';

/**
 * Create the state required to render Portal.
 *
 * The returned state can be modified with hooks such as usePortalStyles, before being passed to renderPortal_unstable.
 *
 * @param props - props from this instance of Portal
 */
export const usePortal_unstable = (props: PortalProps): PortalState => {
  const { element, className } = toMountNodeProps(props.mountNode);

  const virtualParentRootRef = React.useRef<HTMLSpanElement>(null);
  const fallbackElement = usePortalMountNode({ disabled: !!element, className });

  const state: PortalState = {
    children: props.children,
    mountNode: element ?? fallbackElement,
    virtualParentRootRef,
  };

  React.useEffect(() => {
    const virtualParent = virtualParentRootRef.current;
    if (virtualParent && state.mountNode && !state.mountNode.contains(virtualParent)) {
      setVirtualParent(state.mountNode, virtualParent);
      return () => {
        if (state.mountNode) {
          setVirtualParent(state.mountNode, undefined);
        }
      };
    }
  }, [virtualParentRootRef, state.mountNode]);

  return state;
};
