import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IButtonProps } from './IButtonProps';

export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <div>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            icon='Add'
            description='I am a description'
            label='Create account'
          />
        </div>
      </div>
    );
  }
}