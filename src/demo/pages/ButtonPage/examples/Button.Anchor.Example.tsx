import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonAnchorExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Button like anchor</Label>
        <Button
          disabled={ isDisabled }
          buttonType={ ButtonType.primary }
          href='http://bing.com'
          rootProps={ { target: '_blank', title: 'Let us bing!' } }
          description='Navigate to Bing home page.'>
          Bing
        </Button>
      </div>
    );
  }
}