/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { Button } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost,
  TooltipDelay,
  DirectionalHint
} from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipBottomExample extends BaseComponent<any, any> {

  public render() {
    return (
      <TooltipHost content='This is the tooltip' delay={ TooltipDelay.zero } id='bottomID' directionalHint={ DirectionalHint.bottomCenter }>
        <Button aria-describedby='bottomID'>Hover Over Me</Button>
      </TooltipHost>
    );
  }
}