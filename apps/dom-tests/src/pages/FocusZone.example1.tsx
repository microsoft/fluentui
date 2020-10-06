import * as React from 'react';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { Fabric } from '@fluentui/react/lib/Fabric';

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
