import * as React from 'react';
import {
  Button,
  ButtonType,
  ElementType,
  Label
} from '../../../../components/index';
import './Button.Basic.Example.scss';

export class BasicButtonsExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button>Create account</Button>

        <Label>Primary button</Label>
        <Button buttonType={ ButtonType.primary }>Create account</Button>

        <Label>Hero button</Label>
        <Button buttonType={ ButtonType.hero }>Create account</Button>

        <Label>Compound button</Label>
        <Button buttonType={ ButtonType.compound }>Create account</Button>

        <Label>Command button</Label>
        <Button buttonType={ ButtonType.command } icon='personAdd' description='Description of the action this button takes'>Create account</Button>

        <Label>Icon button</Label>
        <Button buttonType={ ButtonType.icon } icon='star' title='Star' description='Take a star' />

        <Label>Button like anchor</Label>
        <Button elementType={ ElementType.anchor } buttonType={ ButtonType.primary } href='http://bing.com' target='_blank' title='Let us bing!' description='Navigate to Bing home page.'>Bing</Button>
      </div>
    );
  }
}

export default BasicButtonsExample;
