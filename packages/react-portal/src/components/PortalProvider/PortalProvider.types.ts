import * as React from 'react';
import { ComponentState } from '@fluentui/react-utilities';

export interface PortalProviderProps {
  children?: React.ReactNode;
  mountNode?: HTMLDivElement;
}

/**
 * Names of the shorthand properties in PortalProviderProps
 * {@docCategory PortalProvider }
 */
export const portalProviderShorthandProps = [] as const;

/**
 * Names of the shorthand properties in PortalProviderProps
 */
export type PortalProviderShorthandProps = typeof portalProviderShorthandProps[number];

/**
 * Names of PortalProviderProps that have a default value in usePortalProvider
 */
export type PortalProviderDefaultedProps = never;

export type PortalProviderState = ComponentState<
  undefined,
  PortalProviderProps,
  PortalProviderShorthandProps,
  PortalProviderDefaultedProps
>;
