import * as React from 'react';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonPrimaryExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Primary button</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          text='Create account'
          onClick={ () => alert('Clicked') }
        />
      </div>
    );
  }
}
