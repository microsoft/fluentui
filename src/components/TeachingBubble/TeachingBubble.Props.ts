import * as React from 'react';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { IImageProps } from '../Image/Image.Props';
import { IButtonProps } from '../Button/Button.Props';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { ICalloutProps } from '../../index';

/**
 * TeachingBubble component props.
 */

export interface ITeachingBubbleProps extends React.Props<TeachingBubble|TeachingBubbleContent>, IAccessiblePopupProps {
  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

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
  illustrationImage?: IImageProps;

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