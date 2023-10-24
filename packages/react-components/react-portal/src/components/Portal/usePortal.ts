import { isHTMLElement, setVirtualParent } from '@fluentui/react-utilities';
import * as React from 'react';

import { usePortalMountNode } from './usePortalMountNode';
import type { PortalProps, PortalState } from './Portal.types';

export function toMountNodeProps(mountNode: PortalProps['mountNode']): {
  element?: HTMLElement | null;
  className?: string;
} {
  if (isHTMLElement(mountNode)) {
    return { element: mountNode };
  }

  if (typeof mountNode === 'object') {
    if (mountNode === null) {
      return { element: null };
    }

    return mountNode;
  }

  return {};
}

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
    if (state.virtualParentRootRef.current && state.mountNode) {
      setVirtualParent(state.mountNode, state.virtualParentRootRef.current);
    }
    return () => {
      if (state.mountNode) {
        setVirtualParent(state.mountNode, undefined);
      }
    };
  }, [state.virtualParentRootRef, state.mountNode]);

  return state;
};
