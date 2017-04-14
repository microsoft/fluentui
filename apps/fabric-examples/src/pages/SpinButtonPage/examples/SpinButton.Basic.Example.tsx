import * as React from 'react';
import { SpinButton, ISpinButtonState, ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';
import { Label, assign } from 'office-ui-fabric-react/lib';
//import { assign } from 'office-ui-fabric-react/lib/Utilities';

export class SpinButtonBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <SpinButton
        label={ 'Basic SpinButton:' }
        min={ 0 }
        max={ 100 }
        step={ 1 }
      />
    );
  }
}
