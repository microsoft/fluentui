import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <SpinButton
        width='500px'
        label={ 'Basic SpinButton:' }
        min={ 0 }
        max={ 100 }
        step={ 1 }
      />
    );
  }
}
