import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * {@docCategory Portal }
 */
export interface PortalProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Where the portal children are mounted on DOM
   * @defaultValue a new element on document.body without any styling
   */
  mountNode?: HTMLDivElement;

  /**
   * Called when the portal is mounted
   */
  onMount?: () => void;

  /**
   * Called when the portal is unmounted
   */
  onUnmount?: () => void;

  /**
   * Where the portal content is mounted in the mountNode
   */
  insertionOrder?: 'first' | 'last';
}

/**
 * Names of the shorthand properties in PortalProps
 * {@docCategory Portal }
 */
export const portalShorthandProps = [] as const;

/**
 * Names of the shorthand properties in PortalProps
 * {@docCategory Portal }
 */
export type PortalShorthandProps = typeof portalShorthandProps[number];

/**
 * Names of PortalProps that have a default value in usePortal
 * {@docCategory Portal }
 */
export type PortalDefaultedProps = never;

/**
 * {@docCategory Portal }
 */
export type PortalState = ComponentState<
  React.Ref<HTMLElement>,
  PortalProps,
  PortalShorthandProps,
  PortalDefaultedProps
>;
