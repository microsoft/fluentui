import * as React from 'react';
import { PrimaryButton, IButtonProps } from '../../../../Button';
import { Label } from '../../../../Label';

export class ButtonPrimaryExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Primary button</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
        >Create account</PrimaryButton>
      </div>
    );
  }
}