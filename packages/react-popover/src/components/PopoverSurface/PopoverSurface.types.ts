import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';
import { PopoverContextValue } from '../../popoverContext';

/**
 * PopoverSurface Props
 */
export interface PopoverSurfaceProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {}

/**
 * Names of the shorthand properties in PopoverSurfaceProps
 */
export type PopoverSurfaceShorthandProps = never;

/**
 * Names of PopoverSurfaceProps that have a default value in usePopoverSurface
 */
export type PopoverSurfaceDefaultedProps = never;

/**
 * PopoverSurface State
 */
export interface PopoverSurfaceState
  extends ComponentStateCompat<PopoverSurfaceProps, PopoverSurfaceShorthandProps, PopoverSurfaceDefaultedProps>,
    Pick<PopoverContextValue, 'open' | 'mountNode' | 'noArrow' | 'size' | 'brand' | 'inverted'> {
  ref: React.Ref<HTMLElement>;
  /**
   * Ref to the arrow element
   */
  arrowRef?: React.Ref<HTMLDivElement>;

  /**
   * CSS class for the arrow element
   */
  arrowClassName?: string;
}
