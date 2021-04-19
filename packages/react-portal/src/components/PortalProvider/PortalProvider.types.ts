import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { UsePortalElementOptions } from '../../usePortalMountNode';

export interface PortalProviderProps extends ComponentProps, UsePortalElementOptions {
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
  React.Ref<HTMLElement>,
  PortalProviderProps,
  PortalProviderShorthandProps,
  PortalProviderDefaultedProps
>;
