import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';

export class ButtonAnchorExample extends React.Component<any, any> {
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