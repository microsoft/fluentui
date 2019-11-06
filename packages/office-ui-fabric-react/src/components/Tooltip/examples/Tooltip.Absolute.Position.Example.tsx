import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export class TooltipAbsolutePositionExample extends React.Component<any, any> {
  // Use getId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure uniqueness.)
  private _hostId: string = getId('tooltipHost');
  private _buttonId: string = getId('targetButton');

  public render(): JSX.Element {
    return (
      <div
        style={{
          minHeight: 50
        }}
      >
        <TooltipHost
          content="This is the tooltip"
          id={this._hostId}
          calloutProps={{
            gapSpace: 0,
            target: `#${this._buttonId}`
          }}
        >
          <DefaultButton
            id={this._buttonId}
            aria-describedby={this._hostId}
            style={{
              position: 'absolute',
              top: 50,
              left: 200
            }}
          >
            Hover Over Me
          </DefaultButton>
        </TooltipHost>
      </div>
    );
  }
}
