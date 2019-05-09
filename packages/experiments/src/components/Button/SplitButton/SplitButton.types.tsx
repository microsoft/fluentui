import { IStackSlot } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IHTMLSlot, ISlotProp, ISlottableProps, IStyleableComponentProps } from '../../../Foundation';
import { IBaseProps } from '../../../Utilities';
import {
  IMenuButtonProps,
  IMenuButtonSlot,
  IMenuButtonSlots,
  IMenuButtonTokens,
  IMenuButtonViewProps
} from '../MenuButton/MenuButton.types';

/**
 * {@docCategory Button}
 */
export type ISplitButtonComponent = IComponent<ISplitButtonProps, ISplitButtonTokens, ISplitButtonStyles, ISplitButtonViewProps>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * {@docCategory Button}
 */
export type ISplitButtonTokenReturnType = ReturnType<Extract<ISplitButtonComponent['tokens'], Function>>;

/**
 * {@docCategory Button}
 */
export type ISplitButtonStylesReturnType = ReturnType<Extract<ISplitButtonComponent['styles'], Function>>;

/**
 * {@docCategory Button}
 */
export type ISplitButtonSlot = ISlotProp<ISplitButtonProps>;

/**
 * {@docCategory Button}
 */
export interface ISplitButtonSlots extends IMenuButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IStackSlot;

  /**
   * Menu button that is going to be rendered.
   */
  menuButton?: IMenuButtonSlot;

  /**
   * Defines the divider that separates the left and right parts of a SplitButton.
   */
  splitDivider?: IHTMLSlot;
}

/**
 * {@docCategory Button}
 */
export interface ISplitButton {
  /**
   * Sets focus to the first focus stop of the SplitButton.
   */
  focus: () => void;
}

/**
 * {@docCategory Button}
 */
export interface ISplitButtonProps
  extends ISlottableProps<ISplitButtonSlots>,
    Pick<
      IMenuButtonProps,
      | 'href'
      | 'primary'
      | 'disabled'
      | 'onClick'
      | 'checked'
      | 'allowDisabledFocus'
      | 'ariaLabel'
      | 'defaultExpanded'
      | 'expanded'
      | 'onKeyDown'
    >,
    IStyleableComponentProps<ISplitButtonProps, ISplitButtonTokens, ISplitButtonStyles>,
    IBaseProps<ISplitButton> {
  /**
   * Defines whether the first action of the SplitButton is disabled.
   * @defaultvalue false
   */
  primaryActionDisabled?: boolean;

  /**
   * Defines the aria label that the screen readers use when focus goes on the second focus stop of the SplitButton.
   */
  secondaryAriaLabel?: string;
}

/**
 * {@docCategory Button}
 */
export interface ISplitButtonViewProps extends Pick<IMenuButtonViewProps, 'buttonRef' | 'onMenuDismiss' | 'menuTarget'>, ISplitButtonProps {
  /**
   * Defines an event callback that is triggered when the secondary action of a SplitButton is clicked.
   */
  onSecondaryActionClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

/**
 * {@docCategory Button}
 */
export interface ISplitButtonTokens extends IMenuButtonTokens {}

/**
 * {@docCategory Button}
 */
export type ISplitButtonStyles = IComponentStyles<ISplitButtonSlots>;
