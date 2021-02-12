import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { IComponent } from '@uifabric/foundation/lib/next/IComponent';
import { IFontWeight, IKeytipProps } from 'office-ui-fabric-react';
import {
  IComponentStyles,
  IHTMLElementSlot,
  ISlotProp,
  ISlottableProps,
  IStyleableComponentProps,
} from '../../../Foundation';
import { IBaseProps } from '../../../Utilities';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export type IActionableComponent = IComponent<
  IActionableProps,
  IActionableTokens,
  IActionableStyles,
  IActionableViewProps,
  IActionableSlots
>;

// These types are redundant with IActionableComponent but are needed until TS function return widening issue
// is resolved: https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * @deprecated
 * {@docCategory Actionable}
 */
export type IActionableTokenReturnType = ReturnType<Extract<IActionableComponent['tokens'], Function>>;
/**
 * @deprecated
 * {@docCategory Actionable}
 */
export type IActionableStylesReturnType = ReturnType<Extract<IActionableComponent['styles'], Function>>;

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export type IActionableSlot = ISlotProp<IActionableProps>;

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export type IActionableRootElements = 'a' | 'button' | 'div';

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export interface IActionableSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IHTMLElementSlot<IActionableRootElements>;
}

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export interface IActionable {
  /**
   * Sets focus to the Button.
   */
  focus: () => void;
}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Actionable}
 */
export interface IActionableProps
  extends ISlottableProps<IActionableSlots>,
    IStyleableComponentProps<IActionableProps, IActionableTokens, IActionableStyles>,
    IBaseProps<IActionable>,
    React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement> {
  /**
   * Defines an href reference that, if provided, will make this component render as an anchor.
   * @deprecated
   */
  href?: string;

  /**
   * Defines whether the Button is disabled.
   * @defaultvalue false
   * @deprecated
   */
  disabled?: boolean;

  /**
   * Defines whether the Button is in a checked state (for toggle buttons).
   * @defaultvalue false
   * @deprecated
   */
  checked?: boolean;

  /**
   * Defines whether disabled buttons should be tabbable via keyboard navigation or not.
   * @defaultvalue false
   * @deprecated
   */
  allowDisabledFocus?: boolean;

  /**
   * Defines the aria label that the screen readers use when focus goes on the Button.
   * @deprecated
   */
  ariaLabel?: string;

  /**
   * Defines optional keytips for this button.
   * @deprecated
   */
  keytipProps?: IKeytipProps;

  /**
   * Defines an unique id to identify the item. Typically a duplicate of key value.
   * @deprecated
   */
  uniqueId?: string | number;
}

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export interface IActionableViewProps extends IActionableProps {
  /**
   * Defines a reference to the inner Button.
   * @deprecated
   */
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export interface IActionableTokens {
  /**
   * Defines the background color of the Button.
   * @deprecated
   */
  backgroundColor?: string;

  /**
   * Defines the background color of the Button when it is in a hovered state.
   * @deprecated
   */
  backgroundColorHovered?: string;

  /**
   * Defines the background color of the Button when it is in an active state.
   * @deprecated
   */
  backgroundColorPressed?: string;

  /**
   * Defines the border color of the Button.
   * @deprecated
   */
  borderColor?: string;

  /**
   * Defines the border color of the Button when it is in a hovered state.
   * @deprecated
   */
  borderColorHovered?: string;

  /**
   * Defines the border color of the Button when it is in an active state.
   * @deprecated
   */
  borderColorPressed?: string;

  /**
   * Defines the border radius of the Button.
   * @deprecated
   */
  borderRadius?: number | string;

  /**
   * Defines the border style of the Button.
   * @deprecated
   */
  borderStyle?: string;

  /**
   * Defines the border width of the Button.
   * @deprecated
   */
  borderWidth?: number | string;

  /**
   * Defines the spacing between Button children.
   * @deprecated
   */
  childrenGap?: number | string;

  /**
   * Defines the text color of elements inside the Button.
   * @deprecated
   */
  color?: string;

  /**
   * Defines the text color of elements inside the Button when it is in a hovered state.
   *
   * @deprecated
   */
  colorHovered?: string;

  /**
   * Defines the text color of elements inside the Button when it is in an active state.
   * @deprecated
   */
  colorPressed?: string;

  /**
   * Defines the padding of the Button, between the Button border and the Button contents.
   * @deprecated
   */
  contentPadding?: number | string;

  /**
   * Defines the mouse cursor to be displayed when pointing over the Button.
   * @deprecated
   */
  cursor?: string;

  /**
   * Defines a fixed height for the Button.
   * @deprecated
   */
  height?: number | string;

  /**
   * Defines the background color of the Button when in high contrast mode.
   * @deprecated
   */
  highContrastBackgroundColor?: string;

  /**
   * Defines the background color of the Button when it is in a hovered state and in high contrast mode.
   * @deprecated
   */
  highContrastBackgroundColorHovered?: string;

  /**
   * Defines the background color of the Button when it is in an active state and in high contrast mode.
   * @deprecated
   */
  highContrastBackgroundColorPressed?: string;

  /**
   * Defines the border color of the Button when in high contrast mode.
   * @deprecated
   */
  highContrastBorderColor?: string;

  /**
   * Defines the border color of the Button when it is in a hovered state and in high contrast mode.
   * @deprecated
   */
  highContrastBorderColorHovered?: string;

  /**
   * Defines the border color of the Button when it is in an active state and in high contrast mode.
   * @deprecated
   */
  highContrastBorderColorPressed?: string;

  /**
   * Defines the text color of elements inside the Button when in high contrast mode.
   * @deprecated
   */
  highContrastColor?: string;

  /**
   * Defines the text color of elements inside the Button when it is in a hovered state and in high contrast mode.
   * @deprecated
   */
  highContrastColorHovered?: string;

  /**
   * Defines the text color of elements inside the Button when it is in an active state and in high contrast mode.
   * @deprecated
   */
  highContrastColorPressed?: string;

  /**
   * Defines the line height of elements inside the Button.
   * @deprecated
   */
  lineHeight?: number | string;

  /**
   * Defines a minimum height for the Button.
   * @deprecated
   */
  minHeight?: number | string;

  /**
   * Defines a minimum width for the Button.
   * @deprecated
   */
  minWidth?: number | string;

  /**
   * Defines whether or not to override any styling properties that would have been set in high contrast mode.
   * @deprecated
   */
  msHighContrastAdjust?: string;

  /**
   * Defines the outline color of the Button.
   * @deprecated
   */
  outlineColor?: string;

  /**
   * Defines the font to be used for the text inside the Button.
   * @deprecated
   */
  textFamily?: string;

  /**
   * Defines the size of the text inside the Button.
   * @deprecated
   */
  textSize?: number | string;

  /**
   * Defines the font weight of the text inside the Button.
   * @deprecated
   */
  textWeight?: IFontWeight;

  /**
   * Defines a fixed width for the Button.
   * @deprecated
   */
  width?: number | string;
}

/**
 * @deprecated
 * {@docCategory Actionable}
 */
export type IActionableStyles = IComponentStyles<IActionableSlots>;
