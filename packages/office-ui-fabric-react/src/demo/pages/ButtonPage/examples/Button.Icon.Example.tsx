import * as React from 'react';
import { IconButton, IButtonProps } from '../../../../Button';
import { Label } from '../../../../Label';

export class ButtonIconExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Icon button</Label>
        <IconButton
          disabled={ disabled }
          icon='Emoji2'
          title='Emoji'
          ariaLabel='Emoji' />
      </div>
    );
  }
}