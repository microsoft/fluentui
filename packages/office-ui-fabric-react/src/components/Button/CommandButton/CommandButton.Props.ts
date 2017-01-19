/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/
import { IButtonProps } from '../ButtonBase/ButtonBase.Props';

export interface ICommandButtonProps extends IButtonProps {
  /**
 * The button icon shown in command or hero type.
 */
  icon: string;
}