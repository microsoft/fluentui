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
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button disabled={ isDisabled }>Create account</Button>
      </div>
    );
  }
}
