import { IBaseAutoFill, IBaseAutoFillProps } from '../BaseAutoFill.Props';

export interface IDynamicAutoFill extends IBaseAutoFill {

}

export interface IDynamicAutoFillProps extends IBaseAutoFillProps {
  /**
   * the default value to be visible
   */
  defaultVisibleValue?: string;

}