import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { IComponent } from '@uifabric/foundation/lib/next/IComponent';
import { IRawFontStyle, IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { ITextSlot } from 'office-ui-fabric-react';
import { IComponentStyles, ISlottableProps, ISlotProp, IStyleableComponentProps } from '../../Foundation';
import { IFontIconSlot } from '../../utilities/factoryComponents.types';
import { IBaseProps } from '../../Utilities';
import {
  IActionable,
  IActionableProps,
  IActionableSlots,
  IActionableTokens,
  IActionableViewProps,
} from './Actionable/Actionable.types';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated
 * {@docCategory Button}
 */
export type IButtonComponent = IComponent<IButtonProps, IButtonTokens, IButtonStyles, IButtonViewProps, IButtonSlots>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * @deprecated
 * {@docCategory Button}
 */
export type IButtonTokenReturnType = ReturnType<Extract<IButtonComponent['tokens'], Function>>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export type IButtonStylesReturnType = ReturnType<Extract<IButtonComponent['styles'], Function>>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export type IButtonSlot = ISlotProp<IButtonProps>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IButtonSlots extends IActionableSlots {
  /**
   * Defines the text that is displayed inside the Button.
   * @deprecated
   */
  content?: ITextSlot;

  /**
   * Defines the icon that is displayed next to the text inside the Button.
   * @deprecated
   */
  icon?: IFontIconSlot;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IButton extends IActionable {}

export type INativeButtonProps = Omit<
  React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>,
  'content'
>;

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Button}
 */
export interface IButtonProps
  extends ISlottableProps<IButtonSlots>,
    Pick<
      IActionableProps,
      'href' | 'disabled' | 'checked' | 'allowDisabledFocus' | 'ariaLabel' | 'keytipProps' | 'uniqueId'
    >,
    IStyleableComponentProps<IButtonProps, IButtonTokens, IButtonStyles>,
    IBaseProps<IButton>,
    INativeButtonProps {
  /**
   * Defines whether the Button should be circular.
   * In general, circular Buttons should not specify the menu and container slots.
   * @defaultvalue false
   * @deprecated
   */
  circular?: boolean;

  /**
   * Defines whether the visual representation of the Button should be emphasized.
   * @defaultvalue false
   * @deprecated
   */
  primary?: boolean;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IButtonViewProps extends Pick<IActionableViewProps, 'buttonRef'>, IButtonProps {}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface IButtonTokens extends IActionableTokens {
  /**
   * Defines how far should the background extend within the Button when the focus is on it.
   * @deprecated
   */
  backgroundClipFocused?: IRawStyleBase['backgroundClip'];

  /**
   * Defines the border color of the Button when the focus is on it.
   * @deprecated
   */
  borderColorFocused?: string;

  /**
   * Defines the border style of the Button when the focus is on it.
   * @deprecated
   */
  borderStyleFocused?: string;

  /**
   * Defines the border width of the Button when the focus is on it.
   * @deprecated
   */
  borderWidthFocused?: number | string;

  /**
   * Defines the padding of the Button, between the Button border and contents, when the focus is on the Button.
   * @deprecated
   */
  contentPaddingFocused?: number | string;

  /**
   * Defines the icon color of the Button when in high contrast mode.
   * @deprecated
   */
  highContrastIconColor?: string;

  /**
   * Defines the icon color of the Button when it is in a hovered state and in high contrast mode.
   * @deprecated
   */
  highContrastIconColorHovered?: string;

  /**
   * Defines the icon color of the Button when it is in an active state and in high contrast mode.
   * @deprecated
   */
  highContrastIconColorPressed?: string;

  /**
   * Defines the icon color of the Button.
   * @deprecated
   */
  iconColor?: string;

  /**
   * Defines the icon color of the Button when it is in a hovered state.
   * @deprecated
   */
  iconColorHovered?: string;

  /**
   * Defines the icon color of the Button when it is in an active state.
   * @deprecated
   */
  iconColorPressed?: string;

  /**
   * Defines the size of the icon inside the Button.
   * @deprecated
   */
  iconSize?: number | string;

  /**
   * Defines the font weight of the icon inside the Button.
   * @deprecated
   */
  iconWeight?: IRawFontStyle['fontWeight'];
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export type IButtonStyles = IComponentStyles<IButtonSlots>;
