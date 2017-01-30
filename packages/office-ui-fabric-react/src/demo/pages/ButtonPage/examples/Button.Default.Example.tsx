import * as React from 'react';
import {
  ButtonType,
  Button,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export interface IButtonDefaultExampleState {
  buttonType: ButtonType;
}

export class ButtonDefaultExample extends React.Component<IButtonProps, IButtonDefaultExampleState> {
  public constructor() {
    super();

    this.state = {
      buttonType: ButtonType.default
    };
  }

  public render() {
    let { disabled } = this.props;
    let { buttonType } = this.state;

    let buttonProps = {
      'data-automation-id': 'test',
      disabled: disabled,
      icon: 'Add',
      description: 'I am a description'
    };

    return (
      <div className='ms-BasicButtonsExample'>
        <div>
          <Button { ...buttonProps } label='default' buttonType={ ButtonType.default } />
          <Button { ...buttonProps } label='primary' buttonType={ ButtonType.primary } />
          <Button { ...buttonProps } label='icon' buttonType={ ButtonType.icon } />
          <Button { ...buttonProps } label='compound' buttonType={ ButtonType.compound } />
          <Button { ...buttonProps } label='command' buttonType={ ButtonType.command } />
        </div>
      </div>
    );
  }
}