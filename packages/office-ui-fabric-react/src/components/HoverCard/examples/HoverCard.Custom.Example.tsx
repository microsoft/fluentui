/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  HoverCardHost,
  HoverCardDelay,
  DirectionalHint
} from 'office-ui-fabric-react/lib/HoverCard';

export class HoverCardCustomExample extends BaseComponent<any, any> {

  public render() {
    return (
      <HoverCardHost
        calloutProps={ { gapSpace: 20 } }
        hoverCardProps={ {
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
        delay={ HoverCardDelay.zero }
        id='customID'
        directionalHint={ DirectionalHint.bottomCenter }
      >
        <DefaultButton
          aria-describedby='customID'
          text='Hover Over Me'
        />
      </HoverCardHost>
    );
  }
}