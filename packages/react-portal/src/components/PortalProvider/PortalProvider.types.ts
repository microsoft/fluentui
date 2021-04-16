import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { UsePortalElementOptions } from '../../usePortalMountNode';

/**
 * {@docCategory PortalProvider }
 */
export interface PortalProviderProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    UsePortalElementOptions {
  mountNode?: HTMLDivElement;
}

/**
 * Names of the shorthand properties in PortalProviderProps
 * {@docCategory PortalProvider }
 */
export const portalProviderShorthandProps = [] as const;

/**
 * Names of the shorthand properties in PortalProviderProps
 * {@docCategory PortalProvider }
 */
export type PortalProviderShorthandProps = typeof portalProviderShorthandProps[number];

/**
 * Names of PortalProviderProps that have a default value in usePortalProvider
 * {@docCategory PortalProvider }
 */
export type PortalProviderDefaultedProps = never;

/**
 * {@docCategory PortalProvider }
 */
export type PortalProviderState = ComponentState<
  React.Ref<HTMLElement>,
  PortalProviderProps,
  PortalProviderShorthandProps,
  PortalProviderDefaultedProps
>;
