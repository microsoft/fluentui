import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { IComponent } from '@uifabric/foundation/lib/next/IComponent';
import { IComponentStyles, IHTMLSlot, ISlottableProps, ISlotProp, IStyleableComponentProps } from '../../../Foundation';
import { IContextualMenuSlot, IFontIconSlot } from '../../../utilities/factoryComponents.types';
import { IBaseProps } from '../../../Utilities';
import {
  IButton,
  IButtonProps,
  IButtonSlot,
  IButtonSlots,
  IButtonTokens,
  IButtonViewProps,
  INativeButtonProps,
} from '../Button.types';

/* eslint-disable deprecation/deprecation */

/**
 * {@docCategory Button}
 * @deprecated
 */
export type IMenuButtonComponent = IComponent<
  IMenuButtonProps,
  IMenuButtonTokens,
  IMenuButtonStyles,
  IMenuButtonViewProps,
  IMenuButtonSlots
>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * @deprecated
 * {@docCategory Button}
 */
export type IMenuButtonTokenReturnType = ReturnType<Extract<IMenuButtonComponent['tokens'], Function>>;
/**
 * @deprecated
 * {@docCategory Button}
 */
export type IMenuButtonStylesReturnType = ReturnType<Extract<IMenuButtonComponent['styles'], Function>>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export type IMenuButtonSlot = ISlotProp<IMenuButtonProps>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IMenuButtonSlots extends IButtonSlots {
  /**
   * Defines the button that is going to be rendered.
   * @deprecated
   */
  button?: IButtonSlot;

  /**
   * Defines the section on the right of the MenuButton that contains the menu icon.
   * @deprecated
   */
  menuArea?: IHTMLSlot;

  /**
   * Defines the contextual menu that appears when you click on the MenuButton.
   * @deprecated
   */
  menu?: IContextualMenuSlot;

  /**
   * Defines the menu chevron icon that is displayed insisde the MenuButton.
   * @deprecated
   */
  menuIcon?: IFontIconSlot;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IMenuButton extends IButton {}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Button}
 */
export interface IMenuButtonProps
  extends ISlottableProps<IMenuButtonSlots>,
    Pick<
      IButtonProps,
      'href' | 'primary' | 'disabled' | 'checked' | 'allowDisabledFocus' | 'ariaLabel' | 'keytipProps' | 'uniqueId'
    >,
    IStyleableComponentProps<IMenuButtonProps, IMenuButtonTokens, IMenuButtonStyles>,
    IBaseProps<IMenuButton>,
    INativeButtonProps {
  /**
   * Inital expanded state of the MenuButton. Use this if you want the MenuButton to maintain its own state.
   * Otherwise use `expanded`.
   * @defaultvalue false
   * @deprecated
   */
  defaultExpanded?: boolean;

  /**
   * Defines whether the MenuButton is in an expanded state.
   * @defaultvalue defaultExpanded
   * @deprecated
   */
  expanded?: boolean;

  /**
   * Defines a callback that runs after the MenuButton's contextual menu has been closed (removed from the DOM).
   * @deprecated
   */
  onMenuDismiss?: () => void;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IMenuButtonViewProps extends Pick<IButtonViewProps, 'buttonRef'>, IMenuButtonProps {
  /**
   * Defines a reference to the MenuButton.
   * @deprecated
   */
  menuButtonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IMenuButtonTokens extends IButtonTokens {
  /**
   * Defines the background color of the MenuButton when its menu is in an expanded state.
   * @deprecated
   */
  backgroundColorExpanded?: string;

  /**
   * Defines the background color of the MenuButton when its menu is in an expanded state and the Button is in
   * a hovered state.
   * @deprecated
   */
  backgroundColorExpandedHovered?: string;

  /**
   * Defines the background color of the MenuButton when its menu is in an expanded state and the Button is in
   * an active state.
   * @deprecated
   */
  backgroundColorExpandedPressed?: string;

  /**
   * Defines the size of the menu icon inside the MenuButton.
   * @deprecated
   */
  menuIconSize?: number | string;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export type IMenuButtonStyles = IComponentStyles<IMenuButtonSlots>;
