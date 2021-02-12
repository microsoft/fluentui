import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { IComponent } from '@uifabric/foundation/lib/next/IComponent';
import { IComponentStyles, IHTMLSlot, ISlotProp, ISlottableProps, IStyleableComponentProps } from '../../../Foundation';
import { IBaseProps } from '../../../Utilities';
import { INativeButtonProps } from '../Button.types';
import {
  IMenuButton,
  IMenuButtonProps,
  IMenuButtonSlot,
  IMenuButtonSlots,
  IMenuButtonTokens,
  IMenuButtonViewProps,
} from '../MenuButton/MenuButton.types';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated
 * {@docCategory Button}
 */
export type ISplitButtonComponent = IComponent<
  ISplitButtonProps,
  ISplitButtonTokens,
  ISplitButtonStyles,
  ISplitButtonViewProps,
  ISplitButtonSlots
>;

// These types are redundant with IButtonComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/**
 * @deprecated
 * {@docCategory Button}
 */
export type ISplitButtonTokenReturnType = ReturnType<Extract<ISplitButtonComponent['tokens'], Function>>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export type ISplitButtonStylesReturnType = ReturnType<Extract<ISplitButtonComponent['styles'], Function>>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export type ISplitButtonSlot = ISlotProp<ISplitButtonProps>;

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface ISplitButtonSlots extends IMenuButtonSlots {
  /**
   * Defines the root slot of the component.
   * @deprecated
   */
  root?: IHTMLSlot;

  /**
   * Menu button that is going to be rendered.
   * @deprecated
   */
  menuButton?: IMenuButtonSlot;

  /**
   * Defines the container for the divider that is used for styling purposes.
   * @deprecated
   */
  splitDividerContainer?: IHTMLSlot;

  /**
   * Defines the divider that separates the left and right parts of a SplitButton.
   * @deprecated
   */
  splitDivider?: IHTMLSlot;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface ISplitButton extends IMenuButton {}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
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
      | 'onKeyDown'
      | 'checked'
      | 'allowDisabledFocus'
      | 'ariaLabel'
      | 'keytipProps'
      | 'uniqueId'
      | 'defaultExpanded'
      | 'expanded'
      | 'onMenuDismiss'
    >,
    IStyleableComponentProps<ISplitButtonProps, ISplitButtonTokens, ISplitButtonStyles>,
    IBaseProps<ISplitButton>,
    INativeButtonProps {
  /**
   * Defines whether the first action of the SplitButton is disabled.
   * @defaultvalue false
   * @deprecated
   */
  primaryActionDisabled?: boolean;

  /**
   * Defines the aria label that the screen readers use when focus goes on the second focus stop of the SplitButton.
   * @deprecated
   */
  secondaryAriaLabel?: string;

  /**
   * Defines an event callback that is triggered when the secondary action of a SplitButton is clicked.
   * @deprecated
   */
  onSecondaryActionClick?: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => void;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface ISplitButtonViewProps
  extends Pick<IMenuButtonViewProps, 'buttonRef' | 'menuButtonRef'>,
    ISplitButtonProps {}

/**
 * @deprecated
 * {@docCategory Button}
 */
export interface ISplitButtonTokens extends IMenuButtonTokens {
  /**
   * Defines the color of the SplitButton divider.
   * @deprecated
   */
  dividerColor?: string;

  /**
   * Defines the color of the SplitButton divider when in high contrast mode.
   * @deprecated
   */
  highContrastDividerColor?: string;

  /**
   * Defines the padding of the menu section of the SplitButton.
   * @deprecated
   */
  secondaryPadding?: number | string;
}

/**
 * @deprecated
 * {@docCategory Button}
 */
export type ISplitButtonStyles = IComponentStyles<ISplitButtonSlots>;
