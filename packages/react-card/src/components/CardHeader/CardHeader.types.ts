import * as React from 'react';
import type { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * CardHeader Props
 */
export interface CardHeaderProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * Image slot
   */
  image: ShorthandPropsCompat<React.ImgHTMLAttributes<HTMLImageElement>>;

  /**
   * Header title slot
   */
  header: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Description slot
   */
  description: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Actions slot
   */
  action?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

/**
 * Names of the shorthand properties in CardHeaderProps
 */
export type CardHeaderShorthandProps = 'image' | 'header' | 'description' | 'action'; // TODO add shorthand property names

/**
 * Names of CardHeaderProps that have a default value in useCardHeader
 */
export type CardHeaderDefaultedProps = never;

/**
 * State used in rendering CardHeader
 */
export interface CardHeaderState extends ComponentStateCompat<CardHeaderProps, CardHeaderShorthandProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
