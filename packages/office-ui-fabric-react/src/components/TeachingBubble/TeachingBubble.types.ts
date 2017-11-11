import * as React from 'react';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { IImageProps } from '../../Image';
import { IButtonProps } from '../../Button';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { ICalloutProps } from '../../Callout';

export interface ITeachingBubble {

}

/**
 * TeachingBubble component props.
 */

export interface ITeachingBubbleProps extends React.Props<TeachingBubble | TeachingBubbleContent>, IAccessiblePopupProps {
  /**
   * Optional callback to access the ISlider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ITeachingBubble) => void;

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