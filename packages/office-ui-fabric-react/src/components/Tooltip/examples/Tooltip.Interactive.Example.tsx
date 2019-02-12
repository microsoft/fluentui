import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export class TooltipInteractiveExample extends React.Component<any, any> {
  // Use getId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure uniqueness.)
  private _hostId: string = getId('tooltipHost');

  public render() {
    return (
      <div>
        <TooltipHost content="This is the tooltip" id={this._hostId} calloutProps={{ gapSpace: 0 }} closeDelay={500}>
          <DefaultButton aria-labelledby={this._hostId}>Interact with my tooltip</DefaultButton>
        </TooltipHost>
      </div>
    );
  }
}
