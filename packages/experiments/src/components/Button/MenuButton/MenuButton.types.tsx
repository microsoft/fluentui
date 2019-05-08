import { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '../../../Foundation';
import { IContextualMenuSlot, IIconSlot } from '../../../utilities/factoryComponents.types';
import { IBaseProps } from '../../../Utilities';
import { IButtonProps, IButtonSlot, IButtonSlots, IButtonTokens, IButtonViewProps } from '../Button.types';

/**
 * {@docCategory Button}
 */
export type IMenuButtonComponent = IComponent<IMenuButtonProps, IMenuButtonTokens, IMenuButtonStyles, IMenuButtonViewProps>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * {@docCategory Button}
 */
export type IMenuButtonTokenReturnType = ReturnType<Extract<IMenuButtonComponent['tokens'], Function>>;
/**
 * {@docCategory Button}
 */
export type IMenuButtonStylesReturnType = ReturnType<Extract<IMenuButtonComponent['styles'], Function>>;

/**
 * {@docCategory Button}
 */
export type IMenuButtonSlot = ISlotProp<IMenuButtonProps>;

/**
 * {@docCategory Button}
 */
export interface IMenuButtonSlots extends IButtonSlots {
  /**
   * Defines the button that is going to be rendered.
   */
  button?: IButtonSlot;

  /**
   * Defines the contextual menu that appears when you click on the MenuButton.
   */
  menu?: IContextualMenuSlot;

  /**
   * Defines the menu chevron icon that is displayed insisde the MenuButton.
   */
  menuIcon?: IIconSlot;
}

/**
 * {@docCategory Button}
 */
export interface IMenuButton {
  /**
   * Sets focus to the MenuButton.
   */
  focus: () => void;
}

/**
 * {@docCategory Button}
 */
export interface IMenuButtonProps
  extends IMenuButtonSlots,
    Pick<IButtonProps, 'href' | 'primary' | 'disabled' | 'onClick' | 'allowDisabledFocus' | 'ariaLabel' | 'ariaHidden'>,
    IStyleableComponentProps<IMenuButtonProps, IMenuButtonTokens, IMenuButtonStyles>,
    IBaseProps<IMenuButton> {
  /**
   * Defines the inital expanded state of the MenuButton. If you want the MenuButton to maintain its own state, use this.
   * Otherwise refer to `expanded`.
   * @defaultvalue false
   */
  defaultExpanded?: boolean;

  /**
   * Defines whether the MenuButton is in an expanded state.
   * @defaultvalue defaultExpanded
   */
  expanded?: boolean;

  /**
   * Defines an event callback that is triggered when a keypress is made with the focus on a MenuButton.
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * {@docCategory Button}
 */
export interface IMenuButtonViewProps extends Pick<IButtonViewProps, 'buttonRef'>, IMenuButtonProps {
  /**
   * Defines a callback that runs after the MenuButton's contextual menu has been closed (removed from the DOM).
   */
  onMenuDismiss?: () => void;

  /**
   * Defines the target that the contextual menu uses to position itself.
   */
  menuTarget?: HTMLElement | undefined;
}

/**
 * {@docCategory Button}
 */
export interface IMenuButtonTokens extends IButtonTokens {}

/**
 * {@docCategory Button}
 */
export type IMenuButtonStyles = IComponentStyles<IMenuButtonSlots>;
