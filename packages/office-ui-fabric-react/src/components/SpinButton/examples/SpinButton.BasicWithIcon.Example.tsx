import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonBasicWithIconExample extends React.Component<any, any> {
  public render() {
    return (
      <div style={ { width: '233px' } }>
        <SpinButton
          defaultValue='0'
          iconProps={ { iconName: 'IncreaseIndentLegacy' } }
          label={ 'Basic SpinButton:' }
          min={ 0 }
          max={ 100 }
          step={ 1 }
        />
      </div>
    );
  }
}
