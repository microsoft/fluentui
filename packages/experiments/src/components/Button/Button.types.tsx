import { IComponent, IComponentStyles, IHTMLElementSlot, ISlotProp, IStyleableComponentProps } from '../../Foundation';
import { IFontWeight, IStackSlot, ITextSlot } from 'office-ui-fabric-react';
import { IIconSlot } from '../../utilities/factoryComponents.types';
import { IBaseProps } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';

export type IButtonComponent = IComponent<IButtonProps, IButtonTokens, IButtonStyles, IButtonViewProps>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IButtonTokenReturnType = ReturnType<Extract<IButtonComponent['tokens'], Function>>;
export type IButtonStylesReturnType = ReturnType<Extract<IButtonComponent['styles'], Function>>;

export type IButtonSlot = ISlotProp<IButtonProps>;

export interface IButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IHTMLElementSlot<'button'>;

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

export interface IButton {}

export interface IButtonProps
  extends IButtonSlots,
    IStyleableComponentProps<IButtonProps, IButtonTokens, IButtonStyles>,
    IBaseProps<IButton> {
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
   * Defines an event callback that is triggered when the Button is clicked.
   */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;

  /**
   * The aria label that the screen readers use when focus goes on the Button.
   */
  ariaLabel?: string;
}

export interface IButtonViewProps extends IButtonProps {}

export interface IButtonTokens {
  backgroundColor?: string;
  backgroundColorHovered?: string;
  backgroundColorPressed?: string;
  highContrastBackgroundColor?: string;
  highContrastBackgroundColorHovered?: string;
  highContrastBackgroundColorPressed?: string;
  color?: string;
  colorHovered?: string;
  colorPressed?: string;
  highContrastColor?: string;
  highContrastColorHovered?: string;
  highContrastColorPressed?: string;
  borderColor?: string;
  borderColorFocused?: string;
  borderColorHovered?: string;
  borderColorPressed?: string;
  highContrastBorderColor?: string;
  highContrastBorderColorHovered?: string;
  highContrastBorderColorPressed?: string;
  msHighContrastAdjust?: string;
  iconColor?: string;
  iconColorHovered?: string;
  iconColorPressed?: string;
  highContrastIconColor?: string;
  highContrastIconColorHovered?: string;
  highContrastIconColorPressed?: string;
  outlineColor?: string;
  borderRadius?: number | string;
  borderWidth?: number | string;
  contentPadding?: number | string;
  contentPaddingFocused?: number | string;
  cursor?: string | undefined;
  textFamily?: string;
  textSize?: number | string;
  textWeight?: IFontWeight;
  width?: number | string;
  height?: number | string;
  iconSize?: number | string;
  iconWeight?: number;
  lineHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  backgroundClip?: IRawStyleBase['backgroundClip'];
}

export type IButtonStyles = IComponentStyles<IButtonSlots>;
