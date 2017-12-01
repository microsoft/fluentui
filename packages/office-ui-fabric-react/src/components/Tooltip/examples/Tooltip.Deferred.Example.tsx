/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IRenderFunction } from '../../../Utilities';
import {
  TooltipHostDeferred,
  Tooltip,
  ITooltipProps
} from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipAsyncExample extends BaseComponent<any, any> {

  public render() {

    const loadTooltipDeferred: IRenderFunction<ITooltipProps> = (tooltipProps: ITooltipProps) => {
        return (<Tooltip {...tooltipProps}/>);
    };

    return (
      <div>
        <TooltipHostDeferred content='This is the tooltip' id='myDeferredTooltipID' calloutProps={ { gapSpace: 0 }} onRenderTooltip= {loadTooltipDeferred}>
          <DefaultButton aria-describedby='myID'>Hover Over Me</DefaultButton>
        </TooltipHostDeferred>
      </div>
    );
  }
}