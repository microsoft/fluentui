import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Text Props
 */
export interface TextProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the textShorthandProps array below
   * Any property that has a default value should be listed in TextDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of TextProps that have a default value in useText
 */
export type TextDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Text
 */
export interface TextState extends ComponentState<TextProps, TextDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
