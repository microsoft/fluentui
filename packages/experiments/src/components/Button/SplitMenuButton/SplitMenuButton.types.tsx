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

export type ISplitMenuButtonComponent = IComponent<
  ISplitMenuButtonProps,
  ISplitMenuButtonTokens,
  ISplitMenuButtonStyles,
  ISplitMenuButtonViewProps
>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ISplitMenuButtonTokenReturnType = ReturnType<Extract<ISplitMenuButtonComponent['tokens'], Function>>;
export type ISplitMenuButtonStylesReturnType = ReturnType<Extract<ISplitMenuButtonComponent['styles'], Function>>;

export type ISplitMenuButtonSlot = ISlotProp<ISplitMenuButtonProps>;

export interface ISplitMenuButtonSlots extends IMenuButtonSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IStackSlot;

  /**
   * Menu button that is going to be rendered.
   */
  menuButton?: IMenuButtonSlot;

  /**
   * Defines the divider that separates the left and right parts of a Split Button.
   */
  splitDivider?: IHTMLSlot;
}

export interface ISplitMenuButton {}

export interface ISplitMenuButtonProps
  extends ISplitMenuButtonSlots,
    Pick<IMenuButtonProps, 'href' | 'primary' | 'disabled' | 'onClick' | 'defaultExpanded' | 'expanded' | 'onKeyDown'>,
    IStyleableComponentProps<ISplitMenuButtonProps, ISplitMenuButtonTokens, ISplitMenuButtonStyles>,
    IBaseProps<ISplitMenuButton> {
  /**
   * Split Buttons only - Defines whether the first action of the Split Button is disabled.
   * @defaultvalue false
   */
  primaryActionDisabled?: boolean;
}

export interface ISplitMenuButtonViewProps extends Pick<IMenuButtonViewProps, 'onMenuDismiss' | 'menuTarget'>, ISplitMenuButtonProps {
  /**
   * Defines an event callback that is triggered when the secondary action of a Split Button is clicked.
   */
  onSecondaryActionClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface ISplitMenuButtonTokens extends IMenuButtonTokens {}

export type ISplitMenuButtonStyles = IComponentStyles<ISplitMenuButtonSlots>;
