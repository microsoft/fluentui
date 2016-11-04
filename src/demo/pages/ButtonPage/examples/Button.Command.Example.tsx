import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonCommandExample extends React.Component<IButtonProps, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Command button</Label>
        <Button
          data-automation-id='test'
          buttonType={ ButtonType.command }
          icon='AddFriend'
          description='Description of the action this button takes'
          disabled={ isDisabled }
        >
          Create account
        </Button>
      </div>
    );
  }
}
