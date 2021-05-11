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
export const PopoverContentShorthandProps = [] as const;

/**
 * Names of the shorthand properties in PopoverContentProps
 */
export type PopoverContentShorthandProps = typeof PopoverContentShorthandProps[number];

/**
 * Names of PopoverContentProps that have a default value in usePopoverContent
 */
export type PopoverContentDefaultedProps = never;

/**
 * PopoverContent State
 */
export type PopoverContentState = ComponentState<
  React.Ref<HTMLElement>,
  PopoverContentProps & Pick<PopoverContextValue, 'open' | 'mountNode'>,
  PopoverContentShorthandProps,
  PopoverContentDefaultedProps
>;
