/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, IRenderFunction } from '../../Utilities';
import { ITooltipHostProps } from './TooltipHost.types';
import { Tooltip } from './Tooltip';
import { ITooltipProps } from './Tooltip.types';
import { TooltipHostDeferred } from './TooltipHostDeferred';

export interface ITooltipHostState {
  isTooltipVisible: boolean;
}

export class TooltipHost extends BaseComponent<ITooltipHostProps, ITooltipHostState> {

  // Render
  public render() {

    const loadTooltip: IRenderFunction<ITooltipProps> = (tooltipProps: ITooltipProps) => {
      return (<Tooltip {...tooltipProps}/>);
    };

    const tooltipHostProps = {
      ...this.props,
      onRenderTooltip: loadTooltip
    };
    return (<TooltipHostDeferred {...tooltipHostProps} />);
  }
}