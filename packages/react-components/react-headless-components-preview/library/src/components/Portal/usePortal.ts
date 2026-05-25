'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { setVirtualParent } from '@fluentui/react-utilities';

import type { PortalProps, PortalState } from './Portal.types';

/**
 * Create the state required to render Portal.
 *
 * Resolves the mount node and links the anchor span at the original tree
 * location to it via `setVirtualParent`. When no `mountNode` is provided, a
 * dedicated `<div data-portal-node="true">` is appended to `targetDocument.body`
 * — we cannot mount into `body` directly because `body.contains(anchor)` is
 * always true (the anchor is rendered into the React tree, which lives inside
 * body), which would defeat the virtual-parent cycle guard below.
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

  // Stable detached `<div>` used as the default mount node. Created during the
  // first client render via `targetDocument` (SSR-safe — `targetDocument` is
  // undefined on the server). An effect below appends it to `body`.
  const [defaultMountNode] = React.useState<HTMLDivElement | null>(() => {
    if (!targetDocument) {
      return null;
    }
    const element = targetDocument.createElement('div');
    element.setAttribute('data-portal-node', 'true');
    return element;
  });

  React.useEffect(() => {
    if (mountNodeProp || !defaultMountNode || !targetDocument) {
      return;
    }
    targetDocument.body.appendChild(defaultMountNode);
    return () => {
      defaultMountNode.remove();
    };
  }, [defaultMountNode, mountNodeProp, targetDocument]);

  const mountNode = mountNodeProp ?? defaultMountNode;

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
