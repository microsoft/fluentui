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
  areButtonsDisabled: boolean;
}

export class ButtonBasicExample extends React.Component<any, IBasicButtonsExampleState> {

  public constructor() {
    super();

    this.state = {
      areButtonsDisabled: false
    };
  }

  public render() {
    let { areButtonsDisabled } = this.state;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button disabled={ areButtonsDisabled }>Create account</Button>

        <Label>Primary button</Label>
        <Button disabled={ areButtonsDisabled } buttonType={ ButtonType.primary }>Create account</Button>

        <Label>Hero button</Label>
        <Button disabled={ areButtonsDisabled } buttonType={ ButtonType.hero }>Create account</Button>

        <Label>Compound button</Label>
        <Button disabled={ areButtonsDisabled } buttonType={ ButtonType.compound } description='You can create a new account here.'>Create account</Button>

        <Label>Command button</Label>
        <Button disabled={ areButtonsDisabled } buttonType={ ButtonType.command } icon='personAdd' description='Description of the action this button takes'>Create account</Button>

        <Label>Icon button</Label>
        <Button disabled={ areButtonsDisabled } buttonType={ ButtonType.icon } icon='star' title='Star' ariaLabel='Take a star' />

        <Label>Button like anchor</Label>
        <Button disabled={ areButtonsDisabled } elementType={ ElementType.anchor } buttonType={ ButtonType.primary } href='http://bing.com' target='_blank' title='Let us bing!' description='Navigate to Bing home page.'>Bing</Button>

        <Label>Button with aria description for screen reader</Label>
        <Button disabled={ areButtonsDisabled } buttonType={ ButtonType.primary } ariaDescription='This is aria description used for screen reader.'>Aria Description</Button>

        <Checkbox
          label='Disable buttons'
          checked={ areButtonsDisabled }
          onChange={ (ev, isChecked) => this.setState({ areButtonsDisabled: isChecked }) } />
      </div>
    );
  }

}
