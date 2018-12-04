import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IStyle } from '../../Styling';
import { IHorizontalStackProps } from '../../Stack';
import { ITextProps } from '../../Text';
import { IIconProps, IContextualMenuProps, IFontWeight, IRefObject } from 'office-ui-fabric-react';
import { ISlotProp, ISlotChildrenType } from '../../utilities/createSlot';

// TODO: centralize types
// TODO: typings tests, particularly around default prop type
// export type ISlot<TProps, TComponentType, TDefaultProps>
export const IconDefaultProp: keyof IIconProps = 'iconName';
export type IconDefaultPropType = IIconProps['iconName'];

export type IButtonComponent = IComponent<IButtonProps, IButtonViewProps, IButtonStyles>;

// States should only be javascript evaluated states. (Not css states.)
export type IButtonStates = 'baseState' | 'enabled' | 'disabled' | 'expanded';

export type IButtonVariants = 'baseVariant' | 'primary' | 'circular';

// TODO: Are these the slots we really want?
//  * if stack is a slot, does that mean its entire content can be changed?
//    * is 'stack' descriptive enough in this case?
//    * should it be called something else like 'content' instead?
//    * should 'menuIcon' be a core slot or should it be an HOC of button that redefines content?
// IButtonSlots = keyof ButtonSlotsTypes?
// export type IButtonSlots = Pick<IButtonProps, 'root' | 'stack' | 'content' | 'icon' | 'menu' | 'menuIcon' | 'test1' | 'test2'>;
// export type IButtonSlots = 'root' | 'stack' | 'content' | 'icon' | 'menu' | 'menuIcon' | 'test1' | 'test2';
export interface IButtonSlots {
  // Slots
  // TODO: should we more strongly identify slots in props? is the typing enough?
  // TODO: add consolidated typing for Slots, like Slot<Component, Props, etc.>
  // TODO: can intrinsic / primitive types be looked up from default prop name? in a centralized way? defaultProps to templated type?
  // root?: ISlotRenderFunction<JSX.IntrinsicAttributes, keyof JSX.IntrinsicElements>;
  // TODO: don't use string here.. should be typeof children somehow
  // content?: string | ITextProps | JSX.Element;
  root?: ISlotProp<IButtonSlotsTypes['root']>;
  stack?: ISlotProp<IButtonSlotsTypes['stack']>;
  content?: ISlotProp<IButtonSlotsTypes['content'], ISlotChildrenType>;
  icon?: ISlotProp<IButtonSlotsTypes['icon'], IconDefaultPropType>;
  menu?: ISlotProp<IButtonSlotsTypes['menu']>;

  // TODO: implement slot for menuIcon:
  menuIcon?: ISlotProp<IButtonSlotsTypes['menuIcon'], IconDefaultPropType>;

  // content?: ISlot<IButtonSlotsTest['content'], IButtonSlotsTest['content']>;
  // TODO: why does TS not error when passed in Spinner which doesn't take IIconProps?
  // icon?: IconDefaultPropType | IIconProps | JSX.Element;

  // TODO: remove redundancy of prop name. something like this would be ideal:
  // ISlot<'icon'>;

  // TODO: props for testing, remove
  // TODO: make sure children are still disallowed via typings when removed here
  test1?: ISlotProp<IButtonSlotsTypes['test1'], ISlotChildrenType>;
  test2?: ISlotProp<IButtonSlotsTypes['test2'], ISlotChildrenType>;
}

// TODO: TRY NOT to use components here.. it'll import way too much stuff
// TODO: this should be tied with getSlots structure somehow
// TODO: consolidate into IButtonSlots type to remove type nesting in props (ISlot<IButtonSlotsTypes>>)
// TODO: way to combine with IButtonSlots (or at least type check keyof against?)
export interface IButtonSlotsTypes {
  root: React.ButtonHTMLAttributes<any>;
  stack: IHorizontalStackProps;
  icon: IIconProps;
  content: ITextProps;
  menu: IContextualMenuProps;
  test1: ITextProps;
  test2: React.AllHTMLAttributes<any>;
  menuIcon: IIconProps;
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
