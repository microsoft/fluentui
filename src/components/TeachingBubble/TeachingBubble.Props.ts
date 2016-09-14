import * as React from 'react';
import { TeachingBubble } from './TeachingBubble';

/**
 * Checkbox class interface.
 */
export interface ITeachingBubble {

}

/**
 * TeachingBubble component props.
 */
export interface ITeachingBubbleProps extends React.Props<TeachingBubble> {
  /**
   * The background color of the TeachingBubble
   * @default white
   */
  backgroundColor?: TeachingBubbleBGColor;

  /**
   * A title for the Teaching Bubble.
   */
  title?: string;

  /**
   * An Image for the Teaching Bubble.
   */
  img?: string;

  /**
   * A body for the Teaching Bubble.
   */
  body?: string;

  /**
   * Element to anchor the TeachingBubble to.
   */
  targetElement?: HTMLElement;

  /**
   * Callback when the TeachingBubble tries to close.
   */
  onDismiss?: (ev?: any) => void;
}

export enum TeachingBubbleBGColor {
  white,
  blue
}