import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';

export class ButtonIconExample extends React.Component<any, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Icon button</Label>
        <Button 
          disabled={ isDisabled }
          buttonType={ ButtonType.icon }
          icon='Emoji2'
          rootProps={ { title: 'Emoji' } }
          ariaLabel='Emoji' />
      </div>
    );
  }
}