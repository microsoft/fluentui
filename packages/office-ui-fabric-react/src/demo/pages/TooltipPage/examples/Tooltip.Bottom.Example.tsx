/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../../../Utilities';
import { Button } from '../../../../Button';
import {
  TooltipHost,
  TooltipDelay,
  DirectionalHint
} from '../../../../Tooltip';

export class TooltipBottomExample extends BaseComponent<any, any> {

  public render() {
    return (
      <TooltipHost content='This is the tooltip' delay={ TooltipDelay.zero } id='bottomID' directionalHint={ DirectionalHint.bottomCenter }>
        <Button aria-describedby='bottomID'>Hover Over Me</Button>
      </TooltipHost>
    );
  }
}