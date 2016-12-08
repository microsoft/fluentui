import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonHeroExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Hero button</Label>
        <Button
          disabled={ disabled }
          buttonType={ ButtonType.hero }
          icon='Add' >
          Create account
        </Button>
      </div>
    );
  }
}
