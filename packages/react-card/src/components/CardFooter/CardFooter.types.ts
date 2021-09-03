import * as React from 'react';
import type { ComponentProps, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * CardFooter Props
 */
export interface CardFooterProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Actions slot
   */
  action?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

/**
 * Names of the shorthand properties in CardFooterProps
 */
export type CardFooterShorthandProps = 'action'; // TODO add shorthand property names

/**
 * Names of CardFooterProps that have a default value in useCardFooter
 */
export type CardFooterDefaultedProps = never;

/**
 * State used in rendering CardFooter
 */
export interface CardFooterState
  extends ComponentStateCompat<CardFooterProps, CardFooterShorthandProps, CardFooterDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
