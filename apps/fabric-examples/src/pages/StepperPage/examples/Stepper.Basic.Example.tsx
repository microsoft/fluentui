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
          label='Basic Stepper:'
        />

        <Stepper
          label='Stepper with unit:'
          defaultValue={ '7' }
          onBlur={ (value: string, state: IStepperState, props: IStepperProps) => {
            return '2';
          } }
          onIncrement={ (value: string) => {
            return String(+value + 1);
          } }
          onDecrement={ (value: string) => {
            return String(+value - 1);
          } }
        />

      </div>
    );
  }
}
