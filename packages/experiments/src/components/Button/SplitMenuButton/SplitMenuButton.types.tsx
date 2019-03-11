import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { IFontWeight, IStackSlot } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IHTMLElementSlot, IHTMLSlot, ISlotProp, IStyleableComponentProps } from '../../../Foundation';
import { IBaseProps } from '../../../Utilities';
import {
  IMenuButtonProps,
  IMenuButtonSlot,
  IMenuButtonSlots,
  IMenuButtonTokens,
  IMenuButtonViewProps
} from '../MenuButton/MenuButton.types';

export type ISplitMenuButtonComponent = IComponent<
  ISplitMenuButtonProps,
  ISplitMenuButtonTokens,
  ISplitMenuButtonStyles,
  ISplitMenuButtonViewProps
>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ISplitMenuButtonTokenReturnType = ReturnType<Extract<ISplitMenuButtonComponent['tokens'], Function>>;
export type ISplitMenuButtonStylesReturnType = ReturnType<Extract<ISplitMenuButtonComponent['styles'], Function>>;

export type ISplitMenuButtonSlot = ISlotProp<ISplitMenuButtonProps>;

export interface ISplitMenuButtonSlots extends IMenuButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IHTMLElementSlot<'div'>;

  /**
   * Menu button that is going to be rendered.
   */
  menuButton?: IMenuButtonSlot;

  /**
   * Defines the stack container for the primary action of the Split Button.
   */
  primaryActionContainer?: IStackSlot;

  /**
   * Defines the span container for the secondary action of the Split Button.
   */
  secondaryActionContainer?: IHTMLSlot;

  /**
   * Defines the divider that separates the left and right parts of a Split Button.
   */
  splitDivider?: IHTMLSlot;
}

export interface ISplitMenuButton {}

export interface ISplitMenuButtonProps
  extends ISplitMenuButtonSlots,
    Pick<IMenuButtonProps, 'href' | 'primary' | 'disabled' | 'onClick' | 'defaultExpanded' | 'expanded' | 'onKeyDown'>,
    IStyleableComponentProps<ISplitMenuButtonProps, ISplitMenuButtonTokens, ISplitMenuButtonStyles>,
    IBaseProps<ISplitMenuButton> {
  /**
   * Defines whether the button is rendered as a Split Button.
   * @defaultvalue false
   */
  split?: boolean;

  /**
   * Split Buttons only - Defines whether the first action of the Split Button is disabled.
   * @defaultvalue false
   */
  primaryActionDisabled?: boolean;
}

export interface ISplitMenuButtonViewProps extends Pick<IMenuButtonViewProps, 'onMenuDismiss' | 'menuTarget'>, ISplitMenuButtonProps {
  /**
   * Defines an event callback that is triggered when the secondary action of a Split Button is clicked.
   */
  onSecondaryActionClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface ISplitMenuButtonTokens extends IMenuButtonTokens {
  backgroundColor?: string;
  backgroundColorHovered?: string;
  backgroundColorPressed?: string;
  color?: string;
  colorHovered?: string;
  colorPressed?: string;
  borderColor?: string;
  borderColorFocused?: string;
  borderColorHovered?: string;
  borderColorPressed?: string;
  iconColor?: string;
  iconColorHovered?: string;
  iconColorPressed?: string;
  outlineColor?: string;
  borderRadius?: number | string;
  borderWidth?: number | string;
  contentPadding?: number | string;
  contentPaddingFocused?: number | string;
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

  // The following tokens are specific to Split Button and aren't used if the split property is not present.
  primaryActionBackgroundColor?: string;
  primaryActionBackgroundColorHovered?: string;
  primaryActionBackgroundColorPressed?: string;
  secondaryActionBackgroundColor?: string;
  secondaryActionBackgroundColorHovered?: string;
  secondaryActionBackgroundColorPressed?: string;
  primaryActionColor?: string;
  primaryActionColorHovered?: string;
  primaryActionColorPressed?: string;
  secondaryActionColor?: string;
  secondaryActionColorHovered?: string;
  secondaryActionColorPressed?: string;
}

export type ISplitMenuButtonStyles = IComponentStyles<ISplitMenuButtonSlots>;
