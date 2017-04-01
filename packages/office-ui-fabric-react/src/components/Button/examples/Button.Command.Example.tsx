import * as React from 'react';
import {
  CommandButton
} from 'office-ui-fabric-react/lib/Button';
import {
  Label
} from 'office-ui-fabric-react/lib/Label';
import { IButtonProps } from '../Button.Props';

export class ButtonCommandExample extends React.Component<IButtonProps, any> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Command button</Label>
        <CommandButton
          data-automation-id='test'
          icon='AddFriend'
          disabled={ disabled }
        >
          Create account
        </CommandButton>
      </div>
    );
  }
}
