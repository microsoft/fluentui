/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  HoverCardHost
} from 'office-ui-fabric-react/lib/HoverCard';

export class HoverCardBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <div>
        <HoverCardHost content='This is the HoverCard' id='myID1' calloutProps={ { gapSpace: 0 } }>
          <DefaultButton aria-describedby='myID1'>Hover Over Me</DefaultButton>
        </HoverCardHost>
        <HoverCardHost content='This is the HoverCard' id='myID2' calloutProps={ { gapSpace: 0 } }>
          <DefaultButton aria-describedby='myID2'>Hover Over Me</DefaultButton>
          <DefaultButton aria-describedby='myID2'>Hover Over Me</DefaultButton>
        </HoverCardHost>
      </div>
    );
  }
}