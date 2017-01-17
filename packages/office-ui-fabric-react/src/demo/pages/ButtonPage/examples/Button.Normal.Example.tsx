import * as React from 'react';
import {
  DefaultButton,
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
        <DefaultButton data-automation-id='test' disabled={ disabled }>Create account</DefaultButton>
      </div>
    );
  }
}
