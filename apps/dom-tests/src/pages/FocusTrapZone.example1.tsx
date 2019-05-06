import * as React from 'react';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

export default class FocusZoneExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Fabric>
        <div>
          <FocusTrapZone id="fz" forceFocusInsideTrap={false} focusPreviouslyFocusedInnerElement={true} data-is-focusable={true}>
            <button className={'f'}>f</button>
            <FocusZone>
              <button className={'a'}>a</button>
              <button className={'b'}>b</button>
            </FocusZone>
          </FocusTrapZone>
          <button className={'z'}>z</button>
        </div>
      </Fabric>
    );
  }
}
