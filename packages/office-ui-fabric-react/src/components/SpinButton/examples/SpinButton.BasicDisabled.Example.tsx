import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonBasicDisabledExample extends React.Component<any, any> {
  public render() {
    return (
      <SpinButton
        defaultValue='25'
        width='250px'
        label={ 'Basic SpinButton:' }
        min={ 0 }
        max={ 100 }
        step={ 1 }
        disabled={ true }
      />
    );
  }
}
