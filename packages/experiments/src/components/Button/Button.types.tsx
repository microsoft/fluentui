import { IComponent, IComponentStyles, IHTMLButtonSlot, ISlotProp, IStyleableComponentProps } from '../../Foundation';
import { IFontWeight } from 'office-ui-fabric-react';
import { IContextualMenuSlot, IIconSlot } from '../../utilities/factoryComponents.types';
import { IStackSlot } from '../../Stack';
import { ITextSlot } from '../../Text';
import { IBaseProps } from '../../Utilities';

export type IButtonComponent = IComponent<IButtonProps, IButtonTokens, IButtonStyles, IButtonViewProps>;

export type IButtonSlot = ISlotProp<IButtonProps>;

export interface IButtonSlots {
  root?: IHTMLButtonSlot;
  stack?: IStackSlot;
  content?: ITextSlot;
  icon?: IIconSlot;
  menu?: IContextualMenuSlot;
  menuIcon?: IIconSlot;
}

export interface IButton {}

export interface IButtonProps
  extends IButtonSlots,
    IStyleableComponentProps<IButtonProps, IButtonTokens, IButtonStyles>,
    IBaseProps<IButton> {
  href?: string;

  primary?: boolean;
  circular?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;

  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface IButtonTokens {
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

export type IButtonStyles = IComponentStyles<IButtonSlots>;

export type IButtonViewProps = IButtonProps & {
  onMenuDismiss: () => void;
  menuTarget: HTMLElement | undefined;
};
