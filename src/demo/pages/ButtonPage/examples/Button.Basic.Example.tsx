import * as React from 'react';
import {
  Button,
  ButtonType,
  ElementType,
  Label,
  Checkbox
} from '../../../../index';
import './Button.Basic.Example.scss';

export interface IBasicButtonsExampleState {
  disabled: boolean;
}

export class ButtonBasicExample extends React.Component<any, IBasicButtonsExampleState> {

  public constructor() {
    super();

    this._onDisabledChanged = this._onDisabledChanged.bind(this);

    this.state = {
      disabled: false
    };
  }

  public render() {
    let { disabled } = this.state;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button disabled={ disabled }>Create account</Button>

        <Label>Primary button</Label>
        <Button disabled={ disabled } buttonType={ ButtonType.primary }>Create account</Button>

        <Label>Hero button</Label>
        <Button disabled={ disabled } buttonType={ ButtonType.hero }>Create account</Button>

        <Label>Compound button</Label>
        <Button disabled={ disabled } buttonType={ ButtonType.compound } description='You can create a new account here.'>Create account</Button>

        <Label>Command button</Label>
        <Button disabled={ disabled } buttonType={ ButtonType.command } icon='personAdd' description='Description of the action this button takes'>Create account</Button>

        <Label>Icon button</Label>
        <Button disabled={ disabled } buttonType={ ButtonType.icon } icon='Emoji2' title='Emoji' ariaLabel='Emoji' />

        <Label>Button like anchor</Label>
        <Button disabled={ disabled } elementType={ ElementType.anchor } buttonType={ ButtonType.primary } href='http://bing.com' target='_blank' title='Let us bing!' description='Navigate to Bing home page.'>Bing</Button>

        <Label>Button with aria description for screen reader</Label>
        <Button disabled={ disabled } buttonType={ ButtonType.primary } ariaDescription='This is aria description used for screen reader.'>Aria Description</Button>

        <Checkbox text='Disable buttons' isChecked={ disabled } onChanged={ this._onDisabledChanged } />
      </div>
    );
  }

  private _onDisabledChanged(isDisabled: boolean) {
    this.setState({
      disabled: isDisabled
    });
  }
}
