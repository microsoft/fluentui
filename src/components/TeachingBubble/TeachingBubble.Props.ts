import * as React from 'react';
import { TeachingBubble } from './TeachingBubble';
import { IImageProps } from '../Image/Image.Props';

/**
 * Checkbox class interface.
 */
export interface ITeachingBubble {

}

/**
 * TeachingBubble component props.
 */

export interface ITeachingBubbleProps extends React.Props<TeachingBubble>, IImageProps {
  /**
   * The type of TeachingBubble (changes bg color and text color)
   * @default normal
   */
  teachingBubbleType: TeachingBubbleTypes;

  /**
   * A title for the Teaching Bubble.
   */
  title?: string;

  /**
   * An Image for the Teaching Bubble.
   */
  imageProps?: IImageProps;

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

export enum TeachingBubbleTypes {
  normal,
  reversed
}