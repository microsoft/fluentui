import * as React from 'react';

export interface PortalProps {
  /**
   * React children
   */
  children?: React.ReactNode;
  /**
   * Where the portal children are mounted on DOM
   * @defaultValue a new element on document.body without any styling
   */
  mountNode?: HTMLDivElement | null;

  /**
   * React events should not bubble up the portal
   */
  // TODO clarify if this is still needed
  // disableEventBubbling?: 'first' | 'last';
}

export interface PortalState extends PortalProps {
  /** Indicates if a Portal should be rendered. */
  shouldRender: boolean;

  /**
   * Ref to the root span element as virtual parent
   */
  virtualParentRootRef: React.MutableRefObject<HTMLSpanElement | null>;
}
