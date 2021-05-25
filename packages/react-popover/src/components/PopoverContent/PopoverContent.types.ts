import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { PopoverContextValue } from '../../popoverContext';

/**
 * PopoverContent Props
 */
export interface PopoverContentProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * Names of the shorthand properties in PopoverContentProps
 */
export type PopoverContentShorthandProps = never;

/**
 * Names of PopoverContentProps that have a default value in usePopoverContent
 */
export type PopoverContentDefaultedProps = never;

/**
 * PopoverContent State
 */
export interface PopoverContentState
  extends ComponentState<PopoverContentProps, PopoverContentShorthandProps, PopoverContentDefaultedProps>,
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
