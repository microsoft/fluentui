import { IStackSlot } from 'office-ui-fabric-react';
import { IComponent, IComponentStyles, IHTMLSlot, ISlotProp, IStyleableComponentProps } from '../../../Foundation';
import { IBaseProps } from '../../../Utilities';
import {
  IMenuButtonProps,
  IMenuButtonSlot,
  IMenuButtonSlots,
  IMenuButtonTokens,
  IMenuButtonViewProps
} from '../MenuButton/MenuButton.types';

export type ISplitButtonComponent = IComponent<ISplitButtonProps, ISplitButtonTokens, ISplitButtonStyles, ISplitButtonViewProps>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ISplitButtonTokenReturnType = ReturnType<Extract<ISplitButtonComponent['tokens'], Function>>;
export type ISplitButtonStylesReturnType = ReturnType<Extract<ISplitButtonComponent['styles'], Function>>;

export type ISplitButtonSlot = ISlotProp<ISplitButtonProps>;

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

export interface ISplitButton {}

export interface ISplitButtonProps
  extends ISplitButtonSlots,
    Pick<IMenuButtonProps, 'href' | 'primary' | 'disabled' | 'onClick' | 'ariaLabel' | 'defaultExpanded' | 'expanded' | 'onKeyDown'>,
    IStyleableComponentProps<ISplitButtonProps, ISplitButtonTokens, ISplitButtonStyles>,
    IBaseProps<ISplitButton> {
  /**
   * Defines whether the first action of the SplitButton is disabled.
   * @defaultvalue false
   */
  primaryActionDisabled?: boolean;
}

export interface ISplitButtonViewProps extends Pick<IMenuButtonViewProps, 'onMenuDismiss' | 'menuTarget'>, ISplitButtonProps {
  /**
   * Defines an event callback that is triggered when the secondary action of a SplitButton is clicked.
   */
  onSecondaryActionClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface ISplitButtonTokens extends IMenuButtonTokens {}

export type ISplitButtonStyles = IComponentStyles<ISplitButtonSlots>;
