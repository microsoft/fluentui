import * as React from 'react';
import {
  ActionButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import {
  Label
} from 'office-ui-fabric-react/lib/Label';

export class ButtonActionExample extends React.Component<IButtonProps, any> {
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9
