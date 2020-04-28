import * as React from 'react';

import { TeachingBubbleBase } from './TeachingBubble.base';
import { TeachingBubbleContentBase } from './TeachingBubbleContent.base';
import { IImageProps } from '../../Image';
import { IButtonProps } from '../../Button';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { ICalloutProps, ICalloutContentStyleProps, Target } from '../../Callout';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IFocusTrapZoneProps } from '../FocusTrapZone/index';

/**
 * {@docCategory TeachingBubble}
 */
export interface ITeachingBubble {
  /** Sets focus to the TeachingBubble root element */
  focus(): void;
}

/**
 * TeachingBubble component props.
 * {@docCategory TeachingBubble}
 */
export interface ITeachingBubbleProps
  extends React.ClassAttributes<TeachingBubbleBase | TeachingBubbleContentBase>,
    IAccessiblePopupProps {
  /**
   * Optional callback to access the ITeachingBubble interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ITeachingBubble>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ITeachingBubbleStyleProps, ITeachingBubbleStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   * Properties to pass through for FocusTrapZone, reference detail properties in IFocusTrapZoneProps
   */
  focusTrapZoneProps?: IFocusTrapZoneProps;

  /**
   * A headline for the Teaching Bubble.
   */
  headline?: string;

  /**
   * A variation with smaller bold headline and no margins.
   */
  hasCondensedHeadline?: boolean;

  /**
   * @deprecated Use `hasCloseButton`.
   */
  hasCloseIcon?: boolean;

  /**
   * Whether the TeachingBubble renders close button in the top right corner.
   */
  hasCloseButton?: boolean;

  /**
   * An Image for the TeachingBubble.
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
   * Text that will be rendered in the footer of the TeachingBubble.
   * May be rendered alongside primary and secondary buttons.
   */
  footerContent?: string | JSX.Element;

  /**
   * @deprecated use target instead
   * Element to anchor the TeachingBubble to.
   */
  targetElement?: HTMLElement;

  /**
   * Element, MouseEvent, Point, or querySelector string that the TeachingBubble
   * should anchor to.
   */
  target?: Target;

  /**
   * Callback when the TeachingBubble tries to close.
   */
  onDismiss?: (ev?: any) => void;

  /**
   * Whether or not the TeachingBubble is wide, with image on the left side.
   */
  isWide?: boolean;

  /**
   * A variation with smaller bold headline and margins to the body.
   * (`hasCondensedHeadline` takes precedence if it is also set to true.)
   */
  hasSmallHeadline?: boolean;

  /**
   *  Defines the element id referencing the element containing label text for TeachingBubble.
   */
  ariaLabelledBy?: string;

  /**
   * Defines the element id referencing the element containing the description for the TeachingBubble.
   */
  ariaDescribedBy?: string;
}

/**
 * {@docCategory TeachingBubble}
 */
export type ITeachingBubbleStyleProps = Required<Pick<ITeachingBubbleProps, 'theme'>> &
  Pick<ITeachingBubbleProps, 'hasCondensedHeadline' | 'hasSmallHeadline' | 'isWide'> & {
    /** Style props for callout. */
    calloutProps?: ICalloutContentStyleProps;
    /** Class name for primary button. */
    primaryButtonClassName?: string;
    /** Class name for secondary button. */
    secondaryButtonClassName?: string;
    /** If the close button is visible. */
    hasCloseButton?: boolean;
    /** If a headline has been specified. */
    hasHeadline?: boolean;
  };

/**
 * {@docCategory TeachingBubble}
 */
export interface ITeachingBubbleStyles {
  root: IStyle;
  body: IStyle;
  bodyContent: IStyle;
  closeButton: IStyle;
  content: IStyle;
  footer: IStyle;
  header: IStyle;
  headline: IStyle;
  imageContent: IStyle;
  primaryButton: IStyle;
  secondaryButton: IStyle;
  subText: IStyle;
  subComponentStyles?: ITeachingBubbleSubComponentStyles;
}

/**
 * {@docCategory TeachingBubble}
 */
export interface ITeachingBubbleSubComponentStyles {
  /** Refers to the callout that hosts the TeachingBubble. */
  // TODO: this should be the interface once we're on TS 2.9.2 but otherwise causes errors in 2.8.4
  // callout: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
  callout: IStyleFunctionOrObject<any, any>;
}
