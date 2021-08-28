import * as React from 'react';
import type { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';

/**
 * Text Props
 */
export interface TextProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * Wraps the text content on white spaces.
   *
   * @defaultValue true
   */
  wrap?: boolean;

  /**
   * Truncate overflowing text for block displays.
   *
   * @defaultValue false
   */
  truncate?: boolean;

  /**
   * Applies a block display for the content.
   *
   * @defaultValue false
   */
  block?: boolean;

  /**
   * Applies the italic font style to the content.
   *
   * @defaultValue false
   */
  italic?: boolean;

  /**
   * Applies the underline text decoration to the content.
   *
   * @defaultValue false
   */
  underline?: boolean;

  /**
   * Applies the strikethrough text decoration to the content.
   *
   * @defaultValue false
   */
  strikethrough?: boolean;

  /**
   * Applies font size and line height based on the theme tokens.
   *
   * @defaultValue 300
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

  /**
   * Applies the font family to the content.
   *
   * @defaultValue base
   */
  font?: 'base' | 'monospace' | 'numeric';

  /**
   * Applies font weight to the content.
   *
   * @defaultValue regular
   */
  weight?: 'regular' | 'medium' | 'semibold';

  /**
   * Aligns text based on the parent container.
   *
   * @defaultValue start
   */
  align?: 'start' | 'center' | 'end' | 'justify';

  /**
   * Component to be rendered as.
   *
   * @defaultValue span
   */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'pre';
}

/**
 * Names of TextProps that have a default value in useText
 */
export type TextDefaultedProps = never;

/**
 * State used in rendering Text
 */
export interface TextState extends ComponentStateCompat<TextProps, TextDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
