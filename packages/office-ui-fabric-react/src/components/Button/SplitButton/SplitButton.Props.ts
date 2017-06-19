import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { Button } from '../Button';
import { IRenderFunction } from '../../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';
import { IIconProps, IconName } from '../../Icon';
import { IStyle, ITheme } from '../../../Styling';
import { IButtonStyles } from '../Button.Props'

export interface ISplitButtonStyles extends IButtonStyles {
  /**
     * Style override for the container div around a SplitButton element
     */
  splitButtonContainer?: IStyle;

  /**
   * Style override for the container div around a SplitButton element in a disabled state
   */
  splitButtonContainerDisabled?: IStyle;

  /**
   * Style override for the SplitButton menu button
   */
  splitButtonMenuButton?: IStyle;

  /**
   * Style override for the SplitButton menu button element in a disabled state.
   */
  splitButtonMenuButtonDisabled?: IStyle;

  /**
   * Style override for the SplitButton menu button element in a checked state
   */
  splitButtonMenuButtonChecked?: IStyle;

  /**
   * Style override for the SplitButton menu icon element
   */
  splitButtonMenuIcon?: IStyle;

  /**
   * Style override for the SplitButton menu icon element in a disabled state
   */
  splitButtonMenuIconDisabled?: IStyle;

}
