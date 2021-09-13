import * as React from 'react';

export interface PortalCommons {
  /**
   * React children
   */
  children: React.ReactNode;
  /**
   * Where the portal children are mounted on DOM
   * @defaultValue a new element on document.body without any styling
   */
  mountNode: HTMLDivElement | undefined;
}

export interface PortalProps extends Partial<PortalCommons> {}

export interface PortalState extends PortalCommons {
  /** Indicates if a Portal should be rendered. */
  shouldRender: boolean;

  /**
   * Ref to the root span element as virtual parent
   */
  virtualParentRootRef: React.MutableRefObject<HTMLSpanElement | null>;
}
