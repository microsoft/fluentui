import { defaultSSRContextValue, isSSR, makeMergeProps, useSSRContext } from '@fluentui/react-utilities';
import * as React from 'react';

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
  const ssrContextValue = useSSRContext();

  // Determines if a Portal can be rendered during first render:
  // - ✔ client-side apps
  // - ❌ server-side apps, until "isRenderedOnlyOnClient" is true
  const [shouldRender, setShouldRender] = React.useState(
    props.isRenderedOnlyOnClient ? true : ssrContextValue === defaultSSRContextValue,
  );

  const state = mergeProps((defaultProps ?? {}) as PortalState, props);
  const fallbackMountNode = usePortalMountNode({ disabled: !!state.mountNode });

  state.mountNode = state.mountNode ?? fallbackMountNode;
  state.shouldRender = shouldRender;

  // If on the client, and the component was initially server rendered, then schedule a layout effect to update the
  // component after hydration.
  if (!isSSR()) {
    // This if statement technically breaks the rules of hooks, but is safe because the condition never changes after
    // mounting.
    // eslint-disable-next-line
    React.useLayoutEffect(() => {
      if (!shouldRender) {
        setShouldRender(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return state;
};
