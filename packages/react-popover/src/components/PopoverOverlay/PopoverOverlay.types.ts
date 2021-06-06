import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { PopoverContextValue } from '../../popoverContext';

/**
 * PopoverOverlay Props
 */
export interface PopoverOverlayProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * Names of the shorthand properties in PopoverOverlayProps
 */
export type PopoverOverlayShorthandProps = never;

/**
 * Names of PopoverOverlayProps that have a default value in usePopoverOverlay
 */
export type PopoverOverlayDefaultedProps = never;

/**
 * PopoverOverlay State
 */
export interface PopoverOverlayState
  extends ComponentState<PopoverOverlayProps, PopoverOverlayShorthandProps, PopoverOverlayDefaultedProps>,
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
