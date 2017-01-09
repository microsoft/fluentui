import * as React from 'react';
import {
  Button,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonNormalExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button data-automation-id='test' disabled={ disabled }>Create account</Button>
      </div>
    );
  }
}
