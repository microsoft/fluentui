import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
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
          <DefaultButton
            primary={ true }
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Butjon'
            onClick={ this._alertClicked }
          />
        </div>
      </div>
    );
  }

  private _alertClicked(): void {
    alert('Clicked');
  }
}