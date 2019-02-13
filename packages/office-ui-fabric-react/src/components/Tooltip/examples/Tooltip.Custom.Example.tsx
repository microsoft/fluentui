import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export class TooltipCustomExample extends React.Component<any, any> {
  // Use getId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure uniqueness.)
  private _hostId: string = getId('tooltipHost');

  public render(): JSX.Element {
    return (
      <TooltipHost
        calloutProps={{ gapSpace: 20 }}
        tooltipProps={{
          onRenderContent: () => {
            return (
              <div>
                <ul style={{ margin: 0, padding: 0 }}>
                  <li>1. One</li>
                  <li>2. Two</li>
                </ul>
              </div>
            );
          }
        }}
        delay={TooltipDelay.zero}
        id={this._hostId}
        directionalHint={DirectionalHint.bottomCenter}
      >
        <DefaultButton aria-labelledby={this._hostId} text="Hover Over Me" />
      </TooltipHost>
    );
  }
}
