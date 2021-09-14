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
   * Content slot, wrapper of the header and description slots
   */
  content?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

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
export type CardHeaderShorthandProps = 'image' | 'content' | 'header' | 'description' | 'action';

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
