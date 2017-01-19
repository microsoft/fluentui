import * as React from 'react';
import {
  PrimaryButton,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonAnchorExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Button like anchor</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          href='http://bing.com'
          target='_blank'
          title='Let us bing!'>
          Bing
        </PrimaryButton>
      </div >
    );
  }
}