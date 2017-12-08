import * as React from 'react';
import {
  IMenuButtonBaseProps,
  IMenuButtonBase,
  IMenuButtonBaseStyles,
  IMenuButtonBaseStyleProps
} from './MenuButton.base.types';
// import { IButtonBaseProps } from './Button.base.types';
// import { IVerticalDividerProps } from '../../../Divider';
import { IStyleFunction } from '../../../Utilities';

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

  getSplitStyles?: IStyleFunction<IMenuButtonBaseStyleProps, IMenuButtonBaseStyles>;

  /**
   * If set to true and if this is a splitButton (split == true) then the primary action of a split button is disabled.
   */
  primaryDisabled?: boolean;

  /**
  * Call to provide customized styling that will layer on top of the variant rules.
  */
  // buttonAs?: IComponentAs<IButtonBaseProps>;

  // dividerAs?: IComponentAs<IVerticalDividerProps>;

  // menuButtonAs?: IComponentAs<IMenuButtonBaseProps>;

}