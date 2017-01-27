import * as React from 'react';
import {
  CommandButton,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

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
