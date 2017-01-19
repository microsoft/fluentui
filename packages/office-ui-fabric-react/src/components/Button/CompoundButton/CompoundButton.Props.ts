import * as React from 'react';
import { CompoundButton } from './CompoundButton';
import { IButtonProps } from '../ButtonBase/ButtonBase.Props';


export interface ICompoundButtonProps extends IButtonProps {

  /**
 * Description of the action this button takes.
 */
  description: string;

}