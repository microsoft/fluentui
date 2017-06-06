import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <div>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            iconProps={ { iconName: 'Add' } }
            description='I am a description'
            text='Create account'
          />
        </div>
      </div>
    );
  }
}