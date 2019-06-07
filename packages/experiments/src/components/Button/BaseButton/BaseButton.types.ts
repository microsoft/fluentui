import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { IFontWeight, IKeytipProps, IStackSlot } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IHTMLElementSlot, ISlotProp, ISlottableProps, IStyleableComponentProps } from '../../../Foundation';
import { IBaseProps } from '../../../Utilities';

/**
 * {@docCategory BaseButton}
 */
export type IBaseButtonComponent = IComponent<IBaseButtonProps, IBaseButtonTokens, IBaseButtonStyles, IBaseButtonViewProps>;

// These types are redundant with IBaseButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * {@docCategory BaseButton}
 */
export type IBaseButtonTokenReturnType = ReturnType<Extract<IBaseButtonComponent['tokens'], Function>>;
/**
 * {@docCategory BaseButton}
 */
export type IBaseButtonStylesReturnType = ReturnType<Extract<IBaseButtonComponent['styles'], Function>>;

/**
 * {@docCategory BaseButton}
 */
export type IBaseButtonSlot = ISlotProp<IBaseButtonProps>;

/**
 * {@docCategory BaseButton}
 */
export type IBaseButtonRootElements = 'a' | 'button' | 'div';

/**
 * {@docCategory BaseButton}
 */
export interface IBaseButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IHTMLElementSlot<IBaseButtonRootElements>;

  /**
   * Defines the horizontal stack used for specifying the inner layout of the Button.
   */
  stack?: IStackSlot;
}

/**
 * {@docCategory BaseButton}
 */
export interface IBaseButton {
  /**
   * Sets focus to the Button.
   */
  focus: () => void;
}

/**
 * {@docCategory BaseButton}
 */
export interface IBaseButtonProps
  extends ISlottableProps<IBaseButtonSlots>,
    IStyleableComponentProps<IBaseButtonProps, IBaseButtonTokens, IBaseButtonStyles>,
    IBaseProps<IBaseButton>,
    React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement> {
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
 * {@docCategory BaseButton}
 */
export interface IBaseButtonViewProps extends IBaseButtonProps {
  /**
   * Defines a reference to the inner Button.
   */
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * {@docCategory BaseButton}
 */
export interface IBaseButtonTokens {
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
 * {@docCategory BaseButton}
 */
export type IBaseButtonStyles = IComponentStyles<IBaseButtonSlots>;
