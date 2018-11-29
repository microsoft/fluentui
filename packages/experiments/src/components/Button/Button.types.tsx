import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IStyle } from '../../Styling';
import { IHorizontalStackProps } from '../../Stack';
import { ITextProps } from '../../Text';
import { IIconProps, IContextualMenuProps, IFontWeight, IRefObject } from 'office-ui-fabric-react';

// TODO: centralize types
export interface ISlotAs<AllowedTypes> {
  // TODO: another alternative is simply not to support 'slotAs' and require use of render functions or JSX
  // We need to somehow distinguish Slot 'as' diretive from component 'as' props.
  //  Slot's 'as' requires swapping out the whole component type.
  //  Component 'as' requires forwarding the prop to the component without changing component type.
  //  Distinguish the two by calling slot's 'as' directive 'slotAs'.
  slotAs?: AllowedTypes;
}

export type IButtonComponent = IComponent<IButtonProps, IButtonViewProps, IButtonStyles>;

// States should only be javascript evaluated states. (Not css states.)
export type IButtonStates = 'baseState' | 'enabled' | 'disabled' | 'expanded';

export type IButtonVariants = 'baseVariant' | 'primary' | 'circular';

// TODO: Are these the slots we really want?
//  * if stack is a slot, does that mean its entire content can be changed?
//    * is 'stack' descriptive enough in this case?
//    * should it be called something else like 'content' instead?
//    * should 'menuIcon' be a core slot or should it be an HOC of button that redefines content?
export type IButtonSlots = 'root' | 'stack' | 'content' | 'icon' | 'menu' | 'menuIcon';

export interface IButton {}

export interface IButtonProps extends IStyleableComponentProps<IButtonProps, IButtonStyles> {
  componentRef?: IRefObject<IButton>;
  className?: string;
  href?: string;

  // Slots
  // TODO: should we more strongly identify slots in props? is the typing enough?
  // TODO: add consolidated typing for Slots, like Slot<Component, Props, etc.>
  root?: ISlotAs<keyof JSX.IntrinsicElements>;
  stack?: ISlotAs<JSX.Element> | IHorizontalStackProps;
  content?: string | ITextProps | JSX.Element;
  // TODO: why does TS not error when passed in Spinner which doesn't take IIconProps?
  icon?: string | IIconProps | JSX.Element | ISlotAs<React.ReactType<IIconProps>>;
  menu?: React.ReactType<IContextualMenuProps>;

  // TODO: props for testing, remove
  test1?: string | ITextProps | JSX.Element;
  test2?: string | JSX.Element;
  enableTestChildren?: boolean;

  primary?: boolean;
  circular?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;

  variant?: IButtonVariants;

  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
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
