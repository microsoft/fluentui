/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps } from './Tooltip.Props';
import { ITooltipState } from './Tooltip';
import { getId } from '../../Utilities';
import './Tooltip.scss';

export class TooltipContent extends BaseComponent<ITooltipProps, ITooltipState> {

  // Specify any private variables
  private _id: string;

  // Constructor
  constructor(props: ITooltipProps) {
    super(props);

    this._id = getId('Tooltip');
  }

  public render() {

    let bodyContent;

    if (this.props.children) {
      bodyContent = (
        <div className='ms-Tooltip-body'>
          <p className='ms-Tooltip-subText'>
            { this.props.children }
          </p>
        </div>
      );
    }

    return (
        <div className='ms-Tooltip-content'>
            { bodyContent }
        </div>
    );
  }
}