import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipDisplayExample extends BaseComponent<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <TooltipHost content="Incorrect positioning" id="myID" calloutProps={{ gapSpace: 0 }}>
          <button style={{ fontSize: '2em' }} aria-describedby="myID">
            Hover Over Me
          </button>
        </TooltipHost>{' '}
        <TooltipHost content="Correct positioning" display="inline-block" id="myID" calloutProps={{ gapSpace: 0 }}>
          <button style={{ fontSize: '2em' }} aria-describedby="myID">
            Hover Over Me
          </button>
        </TooltipHost>
      </div>
    );
  }
}
