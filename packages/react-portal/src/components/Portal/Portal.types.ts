import * as React from 'react';
import { ComponentRender } from '@fluentui/react-utilities';

type PortalCommons = {
  /**
   * React children
   */
  children: React.ReactNode;
  /**
   * Where the portal children are mounted on DOM
   * @defaultValue a new element on document.body without any styling
   */
  mountNode: HTMLDivElement | undefined;
};

export type PortalProps = Partial<PortalCommons>;

export type PortalState = PortalCommons & {
  /** Indicates if a Portal should be rendered. */
  shouldRender: boolean;

  /**
   * Ref to the root span element as virtual parent
   */
  virtualParentRootRef: React.MutableRefObject<HTMLSpanElement | null>;
};

export type PortalRender = ComponentRender<PortalState>;
