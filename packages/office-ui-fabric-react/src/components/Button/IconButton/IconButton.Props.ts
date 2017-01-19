import * as React from 'react';
import { IconButton } from './IconButton';
import { IButtonProps } from '../ButtonBase/ButtonBase.Props';


export interface IIconButtonProps extends IButtonProps {
  /**
 * The button icon shown in command or hero type.
 */
  icon: string;
}