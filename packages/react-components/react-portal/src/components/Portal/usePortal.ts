import * as React from 'react';
import { useIsSSR } from '@fluentui/react-utilities';
import { usePortalMountNode } from './usePortalMountNode';
import { setVirtualParent } from '../../virtualParent/index';
import type { PortalProps, PortalState } from './Portal.types';

/**
 * Create the state required to render Portal.
 *
 * The returned state can be modified with hooks such as usePortalStyles, before being passed to renderPortal_unstable.
 *
 * @param props - props from this instance of Portal
 */
export const usePortal_unstable = (props: PortalProps): PortalState => {
  const { children, mountNode } = props;

  const virtualParentRootRef = React.useRef<HTMLSpanElement>(null);
  const fallbackMountNode = usePortalMountNode({ disabled: !!mountNode });

  const state: PortalState = {
    children,
    mountNode: mountNode ?? fallbackMountNode,
    shouldRender: !useIsSSR(),
    virtualParentRootRef,
  };

  React.useEffect(() => {
    if (state.virtualParentRootRef.current && state.mountNode) {
      setVirtualParent(state.mountNode, state.virtualParentRootRef.current);
    }
  }, [state.virtualParentRootRef, state.mountNode]);

  return state;
};
