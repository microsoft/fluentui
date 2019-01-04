import { IComponent, ISlotProp, IComponentStyles, IStyleableComponentProps } from '../../Foundation';
import { IFontWeight, IRefObject } from 'office-ui-fabric-react';
import { IContextualMenuSlot, IHTMLButtonSlot, IStackSlot, IIconSlot, ITextSlot } from '../../utilities/factoryComponents.types';

export type IButtonComponent = IComponent<IButtonProps, IButtonViewProps, IButtonStyles, IButtonTokens>;

export type IButtonSlot = ISlotProp<IButtonProps>;

export interface IButtonSlots {
  root?: IHTMLButtonSlot;
  stack?: IStackSlot;
  content?: ITextSlot;
  icon?: IIconSlot;
  menu?: IContextualMenuSlot;
  menuIcon?: IIconSlot;
  // TODO: remove, for testing nested Slot components using new createComponent
  button?: IButtonSlot;
}

export interface IButton {}

export interface IButtonProps extends IButtonSlots, IStyleableComponentProps<IButtonProps, IButtonStyles, IButtonTokens> {
  componentRef?: IRefObject<IButton>;
  className?: string;
  href?: string;

  primary?: boolean;
  circular?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;

  // remove
  renderTestButton?: boolean;

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

// TODO: Call this out in PR.
// TODO: How will this approach affect subcomponentStyles?
//        If styles functions have access to slot component's props, is subcomponentStyles still needed?
//        If subcomponentStyles is still needed, the Slots functions won't be looking up styles for it and would need to be modified.
//        Is the IStyle typing correct? In new createComponent, are we merging IStyles or styles of each slot's type?
//        New createComponent changes seem to mixin subcomponent styles objects, which means targeting a subcomponents style sections
//          is now possible:
//          <Button icon="PeopleAdd" circular styles={{ icon: { color: 'pink ' } }} />
// TODO: And this also means the definition of IStyle may not be correct. Should possibly be a lookup on slot's component styles type.
//        See examples in Button.Styles.example
export type IButtonStyles = IComponentStyles<IButtonSlots>;

export type IButtonViewProps = IButtonProps & {
  onMenuDismiss: () => void;
  menuTarget: HTMLElement | undefined;
};
