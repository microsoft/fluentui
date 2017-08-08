import * as React from 'react';
import {
  CompoundButton,
  IButtonProps,
  ButtonTheme
} from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonCompoundExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample ms-BasicButtonsTwoUp'>
        <div>
          <Label>Standard</Label>
          <CompoundButton
            description='You can create a new account here.'
            disabled={ disabled }
            checked={ checked }
          >
            Create account
          </CompoundButton>
        </div>
        <div>
          <Label>Primary</Label>
          <CompoundButton
            buttonTheme={ ButtonTheme.primary }
            description='You can create a new account here.'
            disabled={ disabled }
            checked={ checked }
          >
            Create account
          </CompoundButton>
        </div>
      </div>
    );
  }
}