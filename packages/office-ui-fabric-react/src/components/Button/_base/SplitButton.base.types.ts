import * as React from 'react';
import {
  IMenuButtonBaseProps,
  IMenuButtonBase
} from './MenuButton.base.types';
import { IButtonBaseStyleProps, IButtonBaseStyles, IButtonBaseProps } from './Button.base.types';
import { IVerticalDividerProps } from '../../../Divider';
import { IStyleFunction, IComponentAs } from '../../../Utilities';

export interface ISplitButton extends IMenuButtonBase {

}

export interface ISplitButtonBaseProps extends IMenuButtonBaseProps {
  /**
   * Optional callback to access the IButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ISplitButton) => void;

  /**
   * If set to true, and if menuProps and onClick are provided, the button will render as a SplitButton. Defaults to false.
   */
  split?: boolean;

  getSplitStyles?: IStyleFunction<IButtonBaseStyleProps, IButtonBaseStyles>;

  /**
   * If set to true and if this is a splitButton (split == true) then the primary action of a split button is disabled.
   */
  primaryDisabled?: boolean;

  dividerAs?: IComponentAs<IVerticalDividerProps>;
}