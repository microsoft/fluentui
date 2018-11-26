import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IStyle } from '../../Styling';
import { ITextProps } from '../../Text';
import { IIconProps, IContextualMenuProps, IFontWeight, IRefObject } from 'office-ui-fabric-react';
import { IHorizontalStackProps } from '../Stack';

export type IButtonComponent = IComponent<IButtonProps, IButtonViewProps, IButtonStyles>;

// States should only be javascript evaluated states. (Not css states.)
export type IButtonStates = 'baseState' | 'enabled' | 'disabled' | 'expanded';

export type IButtonVariants = 'baseVariant' | 'primary' | 'circular';

// TODO: Are these the slots we really want?
//  * if stack is a slot, does that mean its entire content can be changed?
//    * is 'stack' descriptive enough in this case?
//    * should it be called something else like 'content' instead?
//    * should 'menuIcon' be a core slot or should it be an HOC of button that redefines content?
export type IButtonSlots = 'root' | 'stack' | 'text' | 'icon' | 'menuIcon';

export interface IButton {}

export interface IButtonProps extends IStyleableComponentProps<IButtonProps, IButtonStyles> {
  as?: keyof JSX.IntrinsicElements;
  componentRef?: IRefObject<IButton>;
  className?: string;
  href?: string;

  // Slots
  // TODO: should we more strongly identify slots in props? is the typing enough?
  // TODO: add consolidated typing for Slots, like Slot<Component, Props, etc.>
  stack?: IHorizontalStackProps;
  text?: string | ITextProps | JSX.Element;
  icon?: string | IIconProps | JSX.Element;

  primary?: boolean;
  circular?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;

  variant?: IButtonVariants;

  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  menu?: React.ReactType<IContextualMenuProps>;
  styleVariables?: IButtonStyleVariables;
}

export interface IButtonStyleVariablesTypes {
  backgroundColor?: string;
  backgroundColorHovered?: string;
  backgroundColorPressed?: string;
  color?: string;
  colorHovered?: string;
  colorPressed?: string;
  borderColor?: string;
  borderColorHovered?: string;
  borderColorPressed?: string;
  iconColor?: string;
  iconColorHovered?: string;
  iconColorPressed?: string;
  borderRadius?: number | string;
  borderWidth?: number | string;
  contentPadding?: number | string;
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
}

export type IButtonStyleVariables = { [PVariant in IButtonVariants]?: { [PState in IButtonStates]?: IButtonStyleVariablesTypes } };

export type IButtonStyles = { [key in IButtonSlots]: IStyle };

export type IButtonViewProps = IButtonProps & {
  onMenuDismiss: () => void;
  menuTarget: HTMLElement | undefined;
};
