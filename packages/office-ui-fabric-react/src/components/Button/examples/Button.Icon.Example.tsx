import * as React from 'react';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonIconExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Icon button</Label>
        <IconButton
          disabled={ disabled }
          checked={ checked }
          iconProps={ { iconName: 'Emoji2' } }
          title='Emoji'
          ariaLabel='Emoji' />
      </div>
    );
  }
}