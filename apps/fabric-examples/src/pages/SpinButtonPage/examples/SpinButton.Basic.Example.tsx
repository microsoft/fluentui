import * as React from 'react';
import { SpinButton, ISpinButtonState, ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';
import { Label, assign } from 'office-ui-fabric-react/lib';
//import { assign } from 'office-ui-fabric-react/lib/Utilities';
import './SpinButton.Basic.Example.scss';

export class SpinButtonBasicExample extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-BasicSpinButtonsExample'>

        <SpinButton
          label={ 'Basic SpinButton:' }
          min={ 0 }
          max={ 100 }
          step={ 1 }
        />

        < SpinButton
          label='SpinButton with custom implementation'
          defaultValue={ '7' }
          onBlur={ (value: string, state: ISpinButtonState, props: ISpinButtonProps) => {
            if (isNaN(+value)) {
              return '0'
            }

            const newValue = Math.min(100, Math.max(0, +value));
            return String(newValue);
          } }
          onIncrement={ (value: string) => {
            return String(+value + 2);
          } }
          onDecrement={ (value: string) => {
            return String(+value - 2);
          } }
        />

      </div>
    );
  }
}
