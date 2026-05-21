'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { setVirtualParent } from '@fluentui/react-utilities';

import type { PortalProps, PortalState } from './Portal.types';

/**
 * Create the state required to render Portal.
 *
 * Resolves the mount node (user-provided `mountNode` falls back to
 * `targetDocument.body` from Fluent context) and links the anchor span at the
 * original tree location to the mount node via `setVirtualParent`.
 *
 * The virtual parent link is what allows DOM-walking utilities (click-outside,
 * focus traps, `elementContains`) to treat the portalled subtree as logically
 * nested under its React parent — without it, the portal is detached from the
 * tree-position perspective.
 */
export const usePortal = (props: PortalProps): PortalState => {
  const { children, mountNode: mountNodeProp } = props;

  const { targetDocument } = useFluent();
  const anchorRef = React.useRef<HTMLSpanElement>(null);

  const mountNode = mountNodeProp ?? targetDocument?.body;

  React.useEffect(() => {
    const anchor = anchorRef.current;
    if (!mountNode || !anchor) {
      return;
    }

    // Skip linking when the anchor already lives inside the mount node — happens
    // when a consumer passes a custom mountNode that is itself a descendant of
    // the React parent. Linking would create a parent cycle.
    if (mountNode.contains(anchor)) {
      return;
    }

    setVirtualParent(mountNode, anchor);

    return () => {
      setVirtualParent(mountNode, undefined);
    };
  }, [mountNode]);

  return {
    children,
    mountNode,
    anchorRef,
  };
};
