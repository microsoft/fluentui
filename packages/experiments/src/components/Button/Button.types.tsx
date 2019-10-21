// Temporary import file to experiment with next version of foundation.
import { IComponent } from '@uifabric/foundation/lib/next/IComponent';
import { IRawFontStyle, IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { ITextSlot } from 'office-ui-fabric-react';
import { IComponentStyles, ISlottableProps, ISlotProp, IStyleableComponentProps } from '../../Foundation';
import { IFontIconSlot } from '../../utilities/factoryComponents.types';
import { IBaseProps } from '../../Utilities';
import { IActionable, IActionableProps, IActionableSlots, IActionableTokens, IActionableViewProps } from './Actionable/Actionable.types';

/**
 * {@docCategory Button}
 */
export type IButtonComponent = IComponent<IButtonProps, IButtonTokens, IButtonStyles, IButtonViewProps, IButtonSlots>;

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
export interface IButtonSlots extends IActionableSlots {
  /**
   * Defines the text that is displayed inside the Button.
   */
  content?: ITextSlot;

  /**
   * Defines the icon that is displayed next to the text inside the Button.
   */
  icon?: IFontIconSlot;
}

/**
 * {@docCategory Button}
 */
export interface IButton extends IActionable {}

export type INativeButtonProps = Omit<React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>, 'content'>;

/**
 * {@docCategory Button}
 */
export interface IButtonProps
  extends ISlottableProps<IButtonSlots>,
    Pick<IActionableProps, 'href' | 'disabled' | 'checked' | 'allowDisabledFocus' | 'ariaLabel' | 'keytipProps' | 'uniqueId'>,
    IStyleableComponentProps<IButtonProps, IButtonTokens, IButtonStyles>,
    IBaseProps<IButton>,
    INativeButtonProps {
  /**
   * Defines whether the Button should be circular.
   * In general, circular Buttons should not specify the menu and container slots.
   * @defaultvalue false
   */
  circular?: boolean;

  /**
   * Defines whether the visual representation of the Button should be emphasized.
   * @defaultvalue false
   */
  primary?: boolean;
}

/**
 * {@docCategory Button}
 */
export interface IButtonViewProps extends Pick<IActionableViewProps, 'buttonRef'>, IButtonProps {}

/**
 * {@docCategory Button}
 */
export interface IButtonTokens extends IActionableTokens {
  /**
   * Defines how far should the background extend within the Button when the focus is on it.
   */
  backgroundClipFocused?: IRawStyleBase['backgroundClip'];

  /**
   * Defines the border color of the Button when the focus is on it.
   */
  borderColorFocused?: string;

  /**
   * Defines the border style of the Button when the focus is on it.
   */
  borderStyleFocused?: string;

  /**
   * Defines the border width of the Button when the focus is on it.
   */
  borderWidthFocused?: number | string;

  /**
   * Defines the padding of the Button, between the Button border and the Button contents, when the focus is on the Button.
   */
  contentPaddingFocused?: number | string;

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
  iconWeight?: IRawFontStyle['fontWeight'];
}

/**
 * {@docCategory Button}
 */
export type IButtonStyles = IComponentStyles<IButtonSlots>;
