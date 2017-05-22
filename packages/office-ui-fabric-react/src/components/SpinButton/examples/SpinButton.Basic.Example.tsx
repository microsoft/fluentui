import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div style={ { width: '203px' } }>
        <SpinButton
          defaultValue='0'
          label={ 'Basic SpinButton:' }
          min={ 0 }
          max={ 100 }
          step={ 1 }
        />
      </div>
    );
  }
}
