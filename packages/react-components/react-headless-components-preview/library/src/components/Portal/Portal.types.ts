import type * as React from 'react';

export type PortalProps = {
  /**
   * Content to render into the portal mount node.
   */
  children?: React.ReactNode;

  /**
   * The DOM element to mount portal content into.
   *
   * When omitted, defaults to `targetDocument.body` from the parent Fluent context,
   * which makes the portal escape ancestor stacking constraints (`overflow`,
   * `clip-path`, `transform`) on the original tree location.
   */
  mountNode?: HTMLElement | null;
};

export type PortalState = Pick<PortalProps, 'children'> & {
  /**
   * Resolved mount node — either the user-provided `mountNode` or
   * `targetDocument.body` from Fluent context. `undefined` on the server
   * (or before hydration completes) so the render stays SSR-safe.
   */
  mountNode: HTMLElement | null | undefined;

  /**
   * Ref to the anchor `<span hidden>` rendered at the original tree location.
   *
   * Used to link the mount node to its React parent via `setVirtualParent`,
   * so utilities that walk the DOM (click-outside detection, focus traps,
   * `elementContains`) treat the portalled subtree as logically nested under
   * its React parent.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  anchorRef: React.MutableRefObject<HTMLSpanElement | null>;
};
