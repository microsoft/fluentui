import * as React from 'react';
import {
  ActionButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';

export class ButtonActionExample extends React.Component<IButtonProps> {
  public constructor(props: {}) {
    super(props);
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
