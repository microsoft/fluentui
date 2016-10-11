import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonScreenReaderExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Button with aria description for screen reader</Label>
        <Button
          data-automation-id='test'
          disabled={ isDisabled }
          buttonType={ ButtonType.primary }
          ariaDescription='This is aria description used for screen reader.'>
          Aria Description
        </Button>
      </div>
    );
  }
}