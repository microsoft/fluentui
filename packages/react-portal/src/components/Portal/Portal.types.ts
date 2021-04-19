import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export interface PortalProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Where the portal children are mounted on DOM
   * @defaultValue a new element on document.body without any styling
   */
  mountNode?: HTMLDivElement;

  /**
   * Called when the portal is mounted
   */
  onMount?(): void;

  /**
   * Called when the portal is unmounted
   */
  onUnmount?(): void;

  /**
   * Where the portal content is mounted in the mountNode
   */
  // TODO clarify if this is still needed
  // insertionOrder?: 'first' | 'last';

  /**
   * React events should not bubble up the portal
   */
  // TODO clarify if this is still needed
  // disableEventBubbling?: 'first' | 'last';
}

/**
 * Names of the shorthand properties in PortalProps
 */
export const portalShorthandProps = [] as const;

/**
 * Names of the shorthand properties in PortalProps
 */
export type PortalShorthandProps = typeof portalShorthandProps[number];

/**
 * Names of PortalProps that have a default value in usePortal
 */
export type PortalDefaultedProps = never;

export type PortalState = ComponentState<
  React.Ref<HTMLElement>,
  PortalProps,
  PortalShorthandProps,
  PortalDefaultedProps
>;
