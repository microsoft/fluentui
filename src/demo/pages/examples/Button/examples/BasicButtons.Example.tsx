import * as React from 'react';
import { default as Button, ButtonType } from '../../../../../components/Button/index';
import Label from '../../../../../components/Label/index';
import './BasicButtons.Example.scss';

export class BasicButtonsExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Normal button</Label>
        <Button>Create account</Button>

        <Label>Primary button</Label>
        <Button type={ ButtonType.primary }>Create account</Button>

        <Label>Hero button</Label>
        <Button type={ ButtonType.hero }>Create account</Button>

        <Label>Compound button</Label>
        <Button type={ ButtonType.compound }>Create account</Button>

        <Label>Command button</Label>
        <Button type={ ButtonType.command } icon='personAdd' description='Description of the action this button takes'>Create account</Button>

        <Label>Icon button</Label>
        <Button type={ ButtonType.command } icon='star' title='Star' description='Take a star' />
      </div>
    );
  }
}

export default BasicButtonsExample;
