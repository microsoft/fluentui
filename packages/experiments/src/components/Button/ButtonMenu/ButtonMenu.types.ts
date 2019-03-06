import { IComponent, IComponentStyles, IHTMLSlot, ISlotProp, IStyleableComponentProps } from '../../../Foundation';
import { IBaseProps, IPoint } from '../../../Utilities';
import { DirectionalHint } from 'office-ui-fabric-react';

export type IButtonMenuComponent = IComponent<IButtonMenuProps, IButtonMenuTokens, IButtonMenuStyles>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IButtonMenuTokenReturnType = ReturnType<Extract<IButtonMenuComponent['tokens'], Function>>;
export type IButtonMenuStylesReturnType = ReturnType<Extract<IButtonMenuComponent['styles'], Function>>;

export type IButtonMenuSlot = ISlotProp<IButtonMenuProps>;

export interface IButtonMenuSlots {
  root?: IHTMLSlot;
}

export interface IButtonMenu {}

export interface IButtonMenuProps
  extends IButtonMenuSlots,
    IStyleableComponentProps<IButtonMenuProps, IButtonMenuTokens, IButtonMenuStyles>,
    IBaseProps<IButtonMenu> {
  /**
   * Defines the target that the ButtonMenu should try to position itself based on.
   * It can be either an Element a querySelector string of a valid Element
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: Element | string | MouseEvent | IPoint | null;

  /**
   * Defines the callback that is exectued when the ButtonMenu tries to close.
   * If dismissAll is true then all submenus will be dismissed.
   */
  onDismiss?: (ev?: any, dismissAll?: boolean) => void;

  /**
   * Defines a collection of menu items.
   * @defaultvalue []
   */
  items: any[];

  /**
   * Defines how the element should be positioned.
   * @defaultvalue DirectionalHint.bottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * Defines the type of menu that is to be rendered.
   */
  menuType: any;
}

export interface IButtonMenuTokens {}

export type IButtonMenuStyles = IComponentStyles<IButtonMenuSlots>;
