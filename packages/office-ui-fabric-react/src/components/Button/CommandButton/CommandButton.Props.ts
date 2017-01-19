import * as React from 'react';
import { CommandButton } from './CommandButton';
import { IButtonProps } from '../ButtonBase/ButtonBase.Props';


export interface ICommandButtonProps extends IButtonProps {
  /**
 * The button icon shown in command or hero type.
 */
  icon: string;
}