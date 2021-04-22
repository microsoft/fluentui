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
   * Has an affect only when server side rendering is used. Indicates that a Portal will be rendered only on client and
   * it's fine to skip initial null render. Useful for Dialogs and similar components that are never rendered initially.
   *
   * @defaultValue false
   */
  isRenderedOnlyOnClient?: boolean;

  /**
   * React events should not bubble up the portal
   */
  // TODO clarify if this is still needed
  // disableEventBubbling?: 'first' | 'last';
}

export interface PortalState extends PortalProps {
  /** Indicates if a Portal can be rendered. */
  shouldRender: boolean;
}
