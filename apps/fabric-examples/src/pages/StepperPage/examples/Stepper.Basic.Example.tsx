import * as React from 'react';
import { Stepper, IStepperState, IStepperProps } from 'office-ui-fabric-react/lib/Stepper';
import { Label, assign } from 'office-ui-fabric-react/lib';
//import { assign } from 'office-ui-fabric-react/lib/Utilities';
import './Stepper.Basic.Example.scss';

export class StepperBasicExample extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-BasicSteppersExample'>
        <Stepper label='Stepper' defaultValue={ 3 } validUnitOptions={ ['"', 'in', 'cm', 'pt', 'px'] } />
      </div>
    );
  }
}
