import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Text Props
 */
export interface TextProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   *
   * @defaultvalue true
   */
  wrap?: boolean;

  /**
   *
   * @defaultvalue false
   */
  truncate?: boolean;

  /**
   *
   * @defaultvalue false
   */
  block?: boolean;

  /**
   *
   * @defaultvalue false
   */
  italic?: boolean;

  /**
   *
   * @defaultvalue false
   */
  underline?: boolean;

  /**
   *
   * @defaultvalue false
   */
  strikethrough?: boolean;

  /**
   *
   * @defaultvalue 300
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

  /**
   *
   * @defaultvalue base
   */
  font?: 'base' | 'monospace' | 'numeric';

  /**
   *
   * @defaultvalue regular
   */
  weight?: 'regular' | 'medium' | 'semibold';

  /**
   *
   * @defaultvalue start
   */
  align?: 'start' | 'center' | 'end' | 'justify';
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
