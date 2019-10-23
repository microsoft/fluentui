import { BaseButton, Button, IStackSlot, IButtonProps, ISchemeNames, ITextSlot } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IStyleableComponentProps, ISlottableProps, ISlotProp, IHTMLSlot } from '@uifabric/foundation';
import { IFontIconSlot } from '../../utilities/factoryComponents.types';

/**
 * {@docCategory TeachingBanner}
 */
export type ITeachingBannerComponent = IComponent<
  ITeachingBannerProps,
  ITeachingBannerTokens,
  ITeachingBannerStyles,
  ITeachingBannerViewProps
>;

// The following two types are redundant with ITeachingBannerComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.

/**
 * {@docCategory TeachingBanner}
 */
export type ITeachingBannerTokenReturnType = ReturnType<Extract<ITeachingBannerComponent['tokens'], Function>>;

/**
 * {@docCategory TeachingBanner}
 */
export type ITeachingBannerStylesReturnType = ReturnType<Extract<ITeachingBannerComponent['styles'], Function>>;

/*
 * Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.
 * {@docCategory TeachingBanner}
 */
export interface ITeachingBanner {}

/**
 * {@docCategory TeachingBanner}
 */
export interface ITeachingBannerSlots {
  /**
   * Root element.
   */
  root?: IHTMLSlot;

  /**
   * Defines the icon that is displayed in Premium mode.
   * @defaultValue defaultPremiumIcon
   */
  iconPremium?: IFontIconSlot;

  /**
   * Text to add as a headline.
   */
  headline?: ITextSlot;

  /**
   * Content for Teaching Banner
   */
  content?: IStackSlot;

  /**
   * Container for action buttons.
   */
  actionsContainer?: IStackSlot;

  /**
   * Action PrimaryButton Slot.
   */
  actionPrimaryButton?: ISlotProp<IButtonProps>;

  /**
   * Action DefaultButton Slot.
   */
  actionDefaultButton?: ISlotProp<IButtonProps>;

  /**
   * Dismiss IconButton Slot.
   */
  dismissButton?: ISlotProp<IButtonProps>;
}

/**
 * Extending IStyleableComponentProps will automatically add styleable props for you, such as styles, tokens and theme.
 * If you don't want these props to be included in your component, just remove this extension.
 * {@docCategory TeachingBanner}
 */
export interface ITeachingBannerProps
  extends ISlottableProps<ITeachingBannerSlots>,
    IStyleableComponentProps<ITeachingBannerViewProps, ITeachingBannerTokens, ITeachingBannerStyles> {
  /**
   * Changes scheme for sub components
   * @defaultValue strong
   */
  scheme?: ISchemeNames;

  /**
   * Component default Premium icon for use if component is uncontrolled.
   * @defaultValue Diamond
   */
  defaultPremiumIcon?: string;

  /**
   * The action buttons' props you want to show on the other side.
   */
  actions?: IButtonProps[];

  /**
   * Set Premium mode. Shows the banner's icon and thickness is bigger.
   * @defaultValue false
   */
  premium?: boolean;

  /**
   * Enables wrapping text and action buttons.
   * @defaultValue true
   */
  multiline?: boolean;

  /**
   * Whether the Teaching Banner has a dismiss button and its callback.
   * If null, we don't show a dismiss button.
   * @defaultvalue null
   */
  onDismiss?: (ev?: React.MouseEvent<HTMLElement | BaseButton | Button>) => any;
}

/**
 * {@docCategory TeachingBanner}
 */
export interface ITeachingBannerViewProps extends ITeachingBannerProps {
  /**
   * Sample props internal to component. These types of props aren't exposed
   * externally to consumers and their values are typically determined by component state.
   */
  dismissed?: boolean;
}

/**
 * {@docCategory TeachingBanner}
 */
export interface ITeachingBannerTokens {
  /**
   * Token for Premium icon, text and dismissButton color.
   */
  color?: string;

  /**
   * Token for the root background;
   */
  background?: string;

  /**
   * Token for the spacing between elements;
   */
  gap?: number;
}

/**
 * {@docCategory TeachingBanner}
 */
export type ITeachingBannerStyles = IComponentStyles<ITeachingBannerSlots>;
