import * as React from 'react';

export type PortalProps = {
  /**
   * React children
   */
  children?: React.ReactNode;

  /**
   * Where the portal children are mounted on DOM
   *
   * @default a new element on document.body without any styling
   */
  mountNode?: HTMLElement | null | { element?: HTMLElement | null; className?: string };

  /**
   * When this flag is set, the Portal does not set a virtual parent
   * @default false
   */
  noVirtualParent?: boolean;
};

export type PortalState = Pick<PortalProps, 'children'> &
  Pick<Required<PortalProps>, 'noVirtualParent'> & {
    mountNode: HTMLElement | null | undefined;

    /**
     * Ref to the root span element as virtual parent
     */
    virtualParentRootRef: React.MutableRefObject<HTMLSpanElement | null>;
  };
