import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';

export class SpinButtonBasicWithEndPositionExample extends React.Component<any, any> {
  public render() {
    return (
      <div style={ { width: '400px' } }>
        <SpinButton
          defaultValue='0'
          iconProps={ { iconName: 'Light' } }
          label={ 'Basic SpinButton' }
          labelPosition={ Position.end }
          min={ 0 }
          max={ 100 }
          step={ 1 }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />
      </div>
    );
  }
}
