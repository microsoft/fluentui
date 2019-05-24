import { IComponent, IComponentStyles, IHTMLElementSlot, ISlotProp, ISlottableProps, IStyleableComponentProps } from '../../Foundation';
import { IFontWeight, IKeytipProps, IStackSlot, ITextSlot } from 'office-ui-fabric-react';
import { IIconSlot } from '../../utilities/factoryComponents.types';
import { IBaseProps, Omit } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';

/**
 * {@docCategory Button}
 */
export type IButtonComponent = IComponent<IButtonProps, IButtonTokens, IButtonStyles, IButtonViewProps>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * {@docCategory Button}
 */
export type IButtonTokenReturnType = ReturnType<Extract<IButtonComponent['tokens'], Function>>;
/**
 * {@docCategory Button}
 */
export type IButtonStylesReturnType = ReturnType<Extract<IButtonComponent['styles'], Function>>;

/**
 * {@docCategory Button}
 */
export type IButtonSlot = ISlotProp<IButtonProps>;

/**
 * {@docCategory Button}
 */
export type IButtonRootElements = 'a' | 'button' | 'div';

/**
 * {@docCategory Button}
 */
export interface IButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IHTMLElementSlot<IButtonRootElements>;

  /**
   * Defines the horizontal stack used for specifying the inner layout of the Button.
   */
  stack?: IStackSlot;

  /**
   * Defines the text that is displayed inside the Button.
   */
  content?: ITextSlot;

  /**
   * Defines the icon that is displayed next to the text inside the Button.
   */
  icon?: IIconSlot;
}

/**
 * {@docCategory Button}
 */
export interface IButton {
  /**
   * Sets focus to the Button.
   */
  focus: () => void;
}

export type INativeButtonProps = Omit<React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>, 'content'>;

/**
 * {@docCategory Button}
 */
export interface IButtonProps
  extends ISlottableProps<IButtonSlots>,
    IStyleableComponentProps<IButtonProps, IButtonTokens, IButtonStyles>,
    IBaseProps<IButton>,
    INativeButtonProps {
  /**
   * Defines an href reference that, if provided, will make this component render as an anchor.
   */
  href?: string;

  /**
   * Defines whether the visual representation of the Button should be emphasized.
   * @defaultvalue false
   */
  primary?: boolean;

  /**
   * Defines whether the Button should be circular.
   * In general, circular Buttons should not specify the menu and container slots.
   * @defaultvalue false
   */
  circular?: boolean;

  /**
   * Defines whether the Button is disabled.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Defines whether the Button is in a checked state (for toggle buttons).
   */
  checked?: boolean;

  /**
   * Defines whether disabled buttons should be tabbable via keyboard navigation or not.
   * @defaultvalue false
   */
  allowDisabledFocus?: boolean;

  /**
   * Defines the aria label that the screen readers use when focus goes on the Button.
   */
  ariaLabel?: string;

  /**
   * Defines optional keytips for this button.
   */
  keytipProps?: IKeytipProps;

  /**
   * Defines an unique id to identify the item. Typically a duplicate of key value.
   */
  uniqueId?: string | number;
}

/**
 * {@docCategory Button}
 */
export interface IButtonViewProps extends IButtonProps {
  /**
   * Defines a reference to the inner Button.
   */
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * {@docCategory Button}
 */
export interface IButtonTokens {
  /**
   * Defines how far should the background extend within the Button.
   */
  backgroundClip?: IRawStyleBase['backgroundClip'];

  /**
   * Defines the background color of the Button.
   */
  backgroundColor?: string;

  /**
   * Defines the background color of the Button when it is in a hovered state.
   */
  backgroundColorHovered?: string;

  /**
   * Defines the background color of the Button when it is in an active state.
   */
  backgroundColorPressed?: string;

  /**
   * Defines the border color of the Button.
   */
  borderColor?: string;

  /**
   * Defines the border color of the Button when the focus is on it.
   */
  borderColorFocused?: string;

  /**
   * Defines the border color of the Button when it is in a hovered state.
   */
  borderColorHovered?: string;

  /**
   * Defines the border color of the Button when it is in an active state.
   */
  borderColorPressed?: string;

  /**
   * Defines the border radius of the Button.
   */
  borderRadius?: number | string;

  /**
   * Defines the border style of the Button.
   */
  borderStyle?: string;

  /**
   * Defines the border style of the Button when the focus is on it.
   */
  borderStyleFocused?: string;

  /**
   * Defines the border width of the Button.
   */
  borderWidth?: number | string;

  /**
   * Defines the border width of the Button when the focus is on it.
   */
  borderWidthFocused?: number | string;

  /**
   * Defines the text color of elements inside the Button.
   */
  color?: string;

  /**
   * Defines the text color of elements inside the Button when it is in a hovered state.
   */
  colorHovered?: string;

  /**
   * Defines the text color of elements inside the Button when it is in an active state.
   */
  colorPressed?: string;

  /**
   * Defines the padding of the Button, between the Button border and the Button contents.
   */
  contentPadding?: number | string;

  /**
   * Defines the padding of the Button, between the Button border and the Button contents, when the focus is on the Button.
   */
  contentPaddingFocused?: number | string;

  /**
   * Defines the mouse cursor to be displayed when pointing over the Button.
   */
  cursor?: string;

  /**
   * Defines a fixed height for the Button.
   */
  height?: number | string;

  /**
   * Defines the background color of the Button when in high contrast mode.
   */
  highContrastBackgroundColor?: string;

  /**
   * Defines the background color of the Button when it is in a hovered state and in high contrast mode.
   */
  highContrastBackgroundColorHovered?: string;

  /**
   * Defines the background color of the Button when it is in an active state and in high contrast mode.
   */
  highContrastBackgroundColorPressed?: string;

  /**
   * Defines the border color of the Button when in high contrast mode.
   */
  highContrastBorderColor?: string;

  /**
   * Defines the border color of the Button when it is in a hovered state and in high contrast mode.
   */
  highContrastBorderColorHovered?: string;

  /**
   * Defines the border color of the Button when it is in an active state and in high contrast mode.
   */
  highContrastBorderColorPressed?: string;

  /**
   * Defines the text color of elements inside the Button when in high contrast mode.
   */
  highContrastColor?: string;

  /**
   * Defines the text color of elements inside the Button when it is in a hovered state and in high contrast mode.
   */
  highContrastColorHovered?: string;

  /**
   * Defines the text color of elements inside the Button when it is in an active state and in high contrast mode.
   */
  highContrastColorPressed?: string;

  /**
   * Defines the icon color of the Button when in high contrast mode.
   */
  highContrastIconColor?: string;

  /**
   * Defines the icon color of the Button when it is in a hovered state and in high contrast mode.
   */
  highContrastIconColorHovered?: string;

  /**
   * Defines the icon color of the Button when it is in an active state and in high contrast mode.
   */
  highContrastIconColorPressed?: string;

  /**
   * Defines the icon color of the Button.
   */
  iconColor?: string;

  /**
   * Defines the icon color of the Button when it is in a hovered state.
   */
  iconColorHovered?: string;

  /**
   * Defines the icon color of the Button when it is in an active state.
   */
  iconColorPressed?: string;

  /**
   * Defines the size of the icon inside the Button.
   */
  iconSize?: number | string;

  /**
   * Defines the font weight of the icon inside the Button.
   */
  iconWeight?: number;

  /**
   * Defines the line height of elements inside the Button.
   */
  lineHeight?: number | string;

  /**
   * Defines a minimum height for the Button.
   */
  minHeight?: number | string;

  /**
   * Defines a minimum width for the Button.
   */
  minWidth?: number | string;

  /**
   * Defines whether or not to override any styling properties that would have been set in high contrast mode.
   */
  msHighContrastAdjust?: string;

  /**
   * Defines the outline color of the Button.
   */
  outlineColor?: string;

  /**
   * Defines the font to be used for the text inside the Button.
   */
  textFamily?: string;

  /**
   * Defines the size of the text inside the Button.
   */
  textSize?: number | string;

  /**
   * Defines the font weight of the text inside the Button.
   */
  textWeight?: IFontWeight;

  /**
   * Defines a fixed width for the Button.
   */
  width?: number | string;
}

/**
 * {@docCategory Button}
 */
export type IButtonStyles = IComponentStyles<IButtonSlots>;
