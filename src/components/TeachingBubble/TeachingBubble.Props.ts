import * as React from 'react';
import { TeachingBubble } from './TeachingBubble';
import { IImageProps } from '../Image/Image.Props';
import { IButtonProps } from '../Button/Button.Props';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';

/**
 * Checkbox class interface.
 */
export interface ITeachingBubble {

}

/**
 * TeachingBubble component props.
 */

export interface ITeachingBubbleProps extends React.Props<TeachingBubble>, IAccessiblePopupProps {
  /**
   * A headline for the Teaching Bubble.
   */
  headline?: string;

  /**
   * A variation with smaller bold headline and no margins.
   */
  hasCondensedHeadline?: boolean;

  /**
   * Does the TeachingBubble have a close button in the top right corner?
   */
  hasCloseIcon?: boolean;

  /**
   * An Image for the Teaching Bubble.
   */
  imageProps?: IImageProps;

  /**
   * A body for the Teaching Bubble.
   */
  body?: string;

  /**
   * The Primary interaction button
   */
  primaryButtonProps?: IButtonProps;

  /**
   * The Secondary interaction button
   */
  secondaryButtonProps?: IButtonProps;

  /**
   * Element to anchor the TeachingBubble to.
   */
  targetElement?: HTMLElement;

  /**
   * Callback when the TeachingBubble tries to close.
   */
  onDismiss?: (ev?: any) => void;
}