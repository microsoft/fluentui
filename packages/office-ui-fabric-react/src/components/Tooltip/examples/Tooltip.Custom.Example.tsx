import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost,
  TooltipDelay,
  DirectionalHint
} from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipCustomExample extends BaseComponent<any, any> {

  public render(): JSX.Element {
    return (
      <TooltipHost
        calloutProps={ { gapSpace: 20 } }
        tooltipProps={ {
          onRenderContent: () => {
            return (
              <div>
                <ul style={ { margin: 0, padding: 0 } }>
                  <li>1. One</li>
                  <li>2. Two</li>
                </ul>
              </div>
            );
          }
        } }
        delay={ TooltipDelay.zero }
        id='customID'
        directionalHint={ DirectionalHint.bottomCenter }
      >
        <DefaultButton
          aria-describedby='customID'
          text='Hover Over Me'
        />
      </TooltipHost>
    );
  }
}