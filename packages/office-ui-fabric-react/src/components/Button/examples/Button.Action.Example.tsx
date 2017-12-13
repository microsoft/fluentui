import * as React from 'react';
import {
  ActionButton,
  IButtonBaseProps
} from 'office-ui-fabric-react/lib/Button';

export class ButtonActionExample extends React.Component<IButtonBaseProps, any> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <ActionButton
          data-automation-id='test'
          iconProps={ { iconName: 'AddFriend' } }
          disabled={ disabled }
          checked={ checked }
        >
          Create account
        </ActionButton>
      </div>
    );
  }
}
