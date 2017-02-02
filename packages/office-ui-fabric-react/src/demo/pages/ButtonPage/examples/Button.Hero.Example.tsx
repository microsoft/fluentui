import * as React from 'react';
import { IButtonProps, Button, ButtonType } from '../../../../Button';
import { Label } from '../../../../Label';

export class ButtonHeroExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Hero button</Label>
        <Button
          disabled={ disabled }
          buttonType={ ButtonType.hero }
          icon='Add' >
          Create account
        </Button>
      </div>
    );
  }
}