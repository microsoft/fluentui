import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';

/**
 * Text Props
 */
export interface TextProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * Wraps the text content on white spaces.
   *
   * @defaultvalue true
   */
  wrap?: boolean;

  /**
   * Truncate overflowing text for block displays.
   *
   * @defaultvalue false
   */
  truncate?: boolean;

  /**
   * Applies a block display for the content.
   *
   * @defaultvalue false
   */
  block?: boolean;

  /**
   * Applies the italic font style to the content.
   *
   * @defaultvalue false
   */
  italic?: boolean;

  /**
   * Applies the underline text decoration to the content.
   *
   * @defaultvalue false
   */
  underline?: boolean;

  /**
   * Applies the strikethrough text decoration to the content.
   *
   * @defaultvalue false
   */
  strikethrough?: boolean;

  /**
   * Applies font size and line height based on the theme tokens.
   *
   * @defaultvalue 300
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

  /**
   * Applies the font family to the content.
   *
   * @defaultvalue base
   */
  font?: 'base' | 'monospace' | 'numeric';

  /**
   * Applies font weight to the content.
   *
   * @defaultvalue regular
   */
  weight?: 'regular' | 'medium' | 'semibold';

  /**
   * Aligns text based on the parent container.
   *
   * @defaultvalue start
   */
  align?: 'start' | 'center' | 'end' | 'justify';

  /**
   * Component to be rendered as.
   *
   * @defaultvalue span
   */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'pre';
}

/**
 * Names of TextProps that have a default value in useText
 */
export type TextDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Text
 */
export interface TextState extends ComponentStateCompat<TextProps, TextDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
