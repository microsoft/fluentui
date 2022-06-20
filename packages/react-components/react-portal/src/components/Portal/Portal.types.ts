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
  mountNode?: HTMLElement | null;

  visible: boolean;
};

export type PortalState = Pick<PortalProps, 'children'> &
  Required<Pick<PortalProps, 'mountNode'>> & {
    /** Indicates if a Portal should be rendered. */
    shouldRender: boolean;

    /**
     * Ref to the root span element as virtual parent
     */
    virtualParentRootRef: React.MutableRefObject<HTMLSpanElement | null>;
  };
