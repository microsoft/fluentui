import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

// TODO: may be hooks?
export default class FocusZoneExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Fabric>
        <div>
          <button key="z" id="z" />
          <FocusZone id="fz">
            <button key="a" id="a" data-is-visible="true">
              button a
            </button>
          </FocusZone>
        </div>
      </Fabric>
    );
  }
}
