import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IStyle } from '../../Styling';
import { IHorizontalStackProps } from '../../Stack';
import { ITextProps } from '../../Text';
import { IIconProps, IContextualMenuProps, IFontWeight, IRefObject } from 'office-ui-fabric-react';
import { ISlotProp, IChildrenProp } from '../../utilities/createSlot';

// TODO: these types should be defined in Icon.types
export const IconDefaultProp: keyof IIconProps = 'iconName';
export type IIconDefaultProp = IIconProps['iconName'];

export type IButtonComponent = IComponent<IButtonProps, IButtonViewProps, IButtonStyles>;

// States should only be javascript evaluated states. (Not css states.)
export type IButtonStates = 'baseState' | 'enabled' | 'disabled' | 'expanded';

export type IButtonVariants = 'baseVariant' | 'primary' | 'circular';

export interface IButtonSlots {
  // TODO: remove test slots
  // TODO: make sure children are still disallowed via typings when removed here
  root?: ISlotProp<React.ButtonHTMLAttributes<any>>;
  stack?: ISlotProp<IHorizontalStackProps>;
  content?: ISlotProp<ITextProps, IChildrenProp>;
  icon?: ISlotProp<IIconProps, IIconDefaultProp>;
  menu?: ISlotProp<IContextualMenuProps>;
  menuIcon?: ISlotProp<IIconProps, IIconDefaultProp>;
  test1?: ISlotProp<ITextProps, IChildrenProp>;
  test2?: ISlotProp<React.AllHTMLAttributes<any>>;
}

export interface IButton {}

export interface IButtonProps extends IButtonSlots, IStyleableComponentProps<IButtonProps, IButtonStyles> {
  componentRef?: IRefObject<IButton>;
  className?: string;
  href?: string;

  // TODO: remove
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

export type IButtonStyles = { [key in keyof IButtonSlots]: IStyle };

export type IButtonViewProps = IButtonProps & {
  onMenuDismiss: () => void;
  menuTarget: HTMLElement | undefined;
};
