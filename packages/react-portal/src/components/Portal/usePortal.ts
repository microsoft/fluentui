import * as React from 'react';
import { makeMergeProps, useIsSSR } from '@fluentui/react-utilities';

import { PortalProps, PortalState } from './Portal.types';
import { usePortalMountNode } from './usePortalMountNode';
import { setVirtualParent } from '../../virtualParent/index';

const mergeProps = makeMergeProps<PortalState>();

/**
 * Create the state required to render Portal.
 *
 * The returned state can be modified with hooks such as usePortalStyles, before being passed to renderPortal.
 *
 * @param props - props from this instance of Portal
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePortal = (props: PortalProps, defaultProps?: PortalProps): PortalState => {
  const virtualParentRootRef = React.useRef<HTMLSpanElement>(null);
  const state = mergeProps({ shouldRender: !useIsSSR(), virtualParentRootRef }, defaultProps, props);
  const fallbackMountNode = usePortalMountNode({ disabled: !!state.mountNode });

  state.mountNode = state.mountNode ?? fallbackMountNode;

  React.useEffect(() => {
    if (state.virtualParentRootRef.current && state.mountNode) {
      setVirtualParent(state.mountNode, state.virtualParentRootRef.current);
    }
  }, [state.virtualParentRootRef, state.mountNode]);

  return state;
};
