import * as React from 'react';
import { Stepper, IStepperState, IStepperProps } from 'office-ui-fabric-react/lib/Stepper';
import { Label, assign } from 'office-ui-fabric-react/lib';
//import { assign } from 'office-ui-fabric-react/lib/Utilities';
import './Stepper.Basic.Example.scss';

export class StepperBasicExample extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-BasicSteppersExample'>

        <Stepper
          label={ 'Basic Stepper:' }
          min={ 0 }
          max={ 100 }
          step={ 1 }
        />

        < Stepper
          label='Stepper with custom implementation'
          defaultValue={ '7' }
          onBlur={ (value: string, state: IStepperState, props: IStepperProps) => {
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
