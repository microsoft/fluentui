import * as React from 'react';
import {
  Stepper
} from 'office-ui-fabric-react/lib/Stepper';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './Stepper.Basic.Example.scss';

export class StepperBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSteppersExample'>
        <Label htmlFor='stepper' id='stepperLabel'>Stepper</Label>
        <Stepper ariaLabelledby='stepperLabel' defaultValue={ 3 } />
      </div>
    );
  }
}
