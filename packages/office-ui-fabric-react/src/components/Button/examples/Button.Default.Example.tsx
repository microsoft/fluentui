import * as React from 'react';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample ms-BasicButtonsTwoUp'>
        <div>
          <Label>Standard</Label>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Butjon'
          />
        </div>
        <div>
          <Label>Primary</Label>
          <PrimaryButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Butjon'
            onClick={ () => alert('Clicked') }
          />
        </div>
      </div>
    );
  }
}