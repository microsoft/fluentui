import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost
} from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipBasicExample extends BaseComponent<any, any> {

  public render(): JSX.Element {
    return (
      <div>
        <TooltipHost content='This is the tooltip' id='myID' calloutProps={ { gapSpace: 0 } }>
          <DefaultButton aria-describedby='myID'>Hover Over Me</DefaultButton>
        </TooltipHost>
      </div>
    );
  }
}