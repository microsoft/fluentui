import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';

export class ButtonHeroExample extends React.Component<any, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Hero button</Label>
        <Button
          disabled={ isDisabled }
          buttonType={ ButtonType.hero }
          icon='Add' >
          Create account
        </Button>
      </div>
    );
  }
}
