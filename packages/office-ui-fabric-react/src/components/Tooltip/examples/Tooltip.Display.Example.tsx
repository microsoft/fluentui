import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipDisplayExample extends BaseComponent<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <p>
          In some cases when TooltipHost is wrapping inline-block or inline elements the positioning of the Tooltip may be off so it is
          recommended to modify the display property of the TooltipHost as in the following example.
        </p>
        <TooltipHost content="Incorrect positioning" id="myID" calloutProps={{ gapSpace: 0 }}>
          <button style={{ fontSize: '2em' }} aria-describedby="myID">
            Hover Over Me
          </button>
        </TooltipHost>{' '}
        <TooltipHost content="Correct positioning" styles={{ root: { display: 'inline-block' } }} id="myID" calloutProps={{ gapSpace: 0 }}>
          <button style={{ fontSize: '2em' }} aria-describedby="myID">
            Hover Over Me
          </button>
        </TooltipHost>
      </div>
    );
  }
}
