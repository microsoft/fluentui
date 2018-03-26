import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost
} from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipInteractiveExample extends BaseComponent<any, any> {

  public render() {
    return (
      <div>
        <TooltipHost content='This is the tooltip' id='myID' calloutProps={ { gapSpace: 0 } } closeDelay={ 500 }>
          <DefaultButton aria-describedby='myID'>Interact with my tooltip</DefaultButton>
        </TooltipHost>
      </div>
    );
  }
}