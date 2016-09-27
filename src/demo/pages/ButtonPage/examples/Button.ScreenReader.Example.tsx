import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';

export class ButtonScreenReaderExample extends React.Component<any, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Button with aria description for screen reader</Label>
        <Button
          disabled={ isDisabled }
          buttonType={ ButtonType.primary }
          ariaDescription='This is aria description used for screen reader.'>
          Aria Description
        </Button>
      </div>
    );
  }
}