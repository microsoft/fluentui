import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IStyle } from '../../Styling';
import { IIconProps, IContextualMenuProps, IFontWeight, IRefObject } from 'office-ui-fabric-react';

export type IButtonComponent = IComponent<IButtonProps, IButtonViewProps, IButtonStyles>;

// States should only be javascript evaluated states. (Not css states.)
export type IButtonStates = 'baseState' | 'enabled' | 'disabled' | 'expanded';

export type IButtonVariants = 'baseVariant' | 'primary' | 'circular';

export type IButtonSlots = 'root' | 'stack' | 'text' | 'icon' | 'menuIcon';

export interface IButton {}

export interface IButtonProps extends IStyleableComponentProps<IButtonProps, IButtonStyles> {
  as?: keyof JSX.IntrinsicElements;
  componentRef?: IRefObject<IButton>;
  className?: string;
  href?: string;
  text?: string;

  primary?: boolean;
  circular?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;

  variant?: IButtonVariants;

  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  menu?: React.ReactType<IContextualMenuProps>;
  icon?: string | IIconProps | JSX.Element;
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
