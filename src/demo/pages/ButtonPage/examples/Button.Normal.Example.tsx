import * as React from 'react';
import {
  Button,
  Label
} from '../../../../index';

export class ButtonNormalExample extends React.Component<any, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button disabled={ isDisabled }>Create account</Button>
      </div>
    );
  }
}
