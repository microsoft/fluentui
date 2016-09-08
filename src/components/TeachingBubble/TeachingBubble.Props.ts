import * as React from 'react';

/**
 * TeachingBubble component props.
 */
export interface ITeachingBubbleProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * A title for the Teaching Bubble.
   */
  title?: string;

}