import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';

export class ButtonPrimaryExample extends React.Component<any, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Primary button</Label>
        <Button disabled={ isDisabled } buttonType={ ButtonType.primary }>Create account</Button>
      </div>
    );
  }
}