import { makeMergeProps, useIsSSR } from '@fluentui/react-utilities';

import { PortalProps, PortalState } from './Portal.types';
import { usePortalMountNode } from './usePortalMountNode';

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
  const state = mergeProps({ shouldRender: !useIsSSR() }, defaultProps, props);
  const fallbackMountNode = usePortalMountNode({ disabled: !!state.mountNode });

  state.mountNode = state.mountNode ?? fallbackMountNode;

  return state;
};
