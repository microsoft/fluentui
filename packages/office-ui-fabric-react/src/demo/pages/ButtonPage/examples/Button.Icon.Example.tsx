import * as React from 'react';
import {
  IconButton,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

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