import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Card Props
 */
export interface CardProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the cardShorthandProps array below
   * Any property that has a default value should be listed in CardDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of the shorthand properties in CardProps
 */
export type CardShorthandProps = never; // TODO add shorthand property names

/**
 * Names of CardProps that have a default value in useCard
 */
export type CardDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Card
 */
export interface CardState extends CardProps, ComponentState {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
