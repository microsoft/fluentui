import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { IFontWeight } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IHTMLElementSlot, ISlotProp, IStyleableComponentProps } from '../../../Foundation';
import { IContextualMenuSlot, IIconSlot } from '../../../utilities/factoryComponents.types';
import { IBaseProps } from '../../../Utilities';
import { IButtonProps, IButtonSlot, IButtonSlots, IButtonTokens } from '../Button.types';

export type IMenuButtonComponent = IComponent<IMenuButtonProps, IMenuButtonTokens, IMenuButtonStyles, IMenuButtonViewProps>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IMenuButtonTokenReturnType = ReturnType<Extract<IMenuButtonComponent['tokens'], Function>>;
export type IMenuButtonStylesReturnType = ReturnType<Extract<IMenuButtonComponent['styles'], Function>>;

export type IMenuButtonSlot = ISlotProp<IMenuButtonProps>;

export interface IMenuButtonSlots extends IButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IHTMLElementSlot<'div'>;

  /**
   * Defines the button that is going to be rendered.
   */
  button?: IButtonSlot;

  /**
   * Defines the contextual menu that appears when you click on the Button.
   */
  menu: IContextualMenuSlot;

  /**
   * Defines the menu chevron icon that is displayed insisde the Button.
   */
  menuIcon?: IIconSlot;
}

export interface IMenuButton {}

export interface IMenuButtonProps
  extends IMenuButtonSlots,
    Pick<IButtonProps, 'href' | 'primary' | 'disabled' | 'onClick'>,
    IStyleableComponentProps<IMenuButtonProps, IMenuButtonTokens, IMenuButtonStyles>,
    IBaseProps<IMenuButton> {
  /**
   * Defines the inital expanded state of the Button. If you want the Button to maintain its own state, use this.
   * Otherwise refer to `expanded`.
   */
  defaultExpanded?: boolean;

  /**
   * Defines whether the Button is in an expanded state.
   * @defaultvalue defaultExpanded
   */
  expanded?: boolean;

  /**
   * Defines an event callback that is triggered when a keypress is made with the focus on a Button.
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;
}

export interface IMenuButtonViewProps extends IMenuButtonProps {
  /**
   * Defines a callback that runs after the Button's contextual menu has been closed (removed from the DOM).
   */
  onMenuDismiss: () => void;

  /**
   * Defines the target that the contextual menu uses to position itself.
   */
  menuTarget: HTMLElement | undefined;
}

export interface IMenuButtonTokens extends IButtonTokens {
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
}

export type IMenuButtonStyles = IComponentStyles<IMenuButtonSlots>;
