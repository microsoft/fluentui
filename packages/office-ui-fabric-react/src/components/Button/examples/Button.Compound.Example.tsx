import * as React from 'react';
import {
  CompoundButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonCompoundExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, toggled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Compound button</Label>
        <CompoundButton
          description='You can create a new account here.'
          disabled={ disabled }
          toggled={ toggled }
        >
          Create account
        </CompoundButton>
      </div>
    );
  }
}