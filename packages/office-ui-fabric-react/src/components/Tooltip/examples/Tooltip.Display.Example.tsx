import * as React from 'react';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export class TooltipDisplayExample extends React.Component<any, any> {
  // Use getId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
  private _host1Id: string = getId('tooltipHost1');
  private _host2Id: string = getId('tooltipHost2');

  public render(): JSX.Element {
    return (
      <div>
        <p>
          In some cases when TooltipHost is wrapping inline-block or inline elements the positioning of the Tooltip may be off so it is
          recommended to modify the display property of the TooltipHost as in the following example.
        </p>
        <TooltipHost content="Incorrect positioning" id={this._host1Id} calloutProps={{ gapSpace: 0 }}>
          <button style={{ fontSize: '2em' }} aria-labelledby={this._host1Id}>
            Hover Over Me
          </button>
        </TooltipHost>{' '}
        <TooltipHost
          content="Correct positioning"
          styles={{ root: { display: 'inline-block' } }}
          id={this._host2Id}
          calloutProps={{ gapSpace: 0 }}
        >
          <button style={{ fontSize: '2em' }} aria-labelledby={this._host2Id}>
            Hover Over Me
          </button>
        </TooltipHost>
      </div>
    );
  }
}
