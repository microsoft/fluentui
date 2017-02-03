/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../../../Utilities';
import { Button } from '../../../../Button';
import {
  TooltipHost
} from '../../../../Tooltip';

export class TooltipBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <div>
        <TooltipHost content='This is the tooltip' id='myID'>
          <Button aria-describedby='myID'>Hover Over Me</Button>
        </TooltipHost>
      </div>
    );
  }
}