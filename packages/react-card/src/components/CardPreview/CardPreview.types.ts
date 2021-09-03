import * as React from 'react';
import type { ComponentProps, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * CardPreview Props
 */
export interface CardPreviewProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Image slot
   */
  logo?: ShorthandPropsCompat<React.ImgHTMLAttributes<HTMLImageElement>>;
}

/**
 * Names of the shorthand properties in CardPreviewProps
 */
export type CardPreviewShorthandProps = 'logo';

/**
 * Names of CardPreviewProps that have a default value in useCardPreview
 */
export type CardPreviewDefaultedProps = never;

/**
 * State used in rendering CardPreview
 */
export interface CardPreviewState
  extends ComponentStateCompat<CardPreviewProps, CardPreviewShorthandProps, CardPreviewDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
