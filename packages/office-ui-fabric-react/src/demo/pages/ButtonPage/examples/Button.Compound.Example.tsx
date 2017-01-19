import * as React from 'react';
import {
  CompoundButton,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonCompoundExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Compound button</Label>
        <CompoundButton
          disabled={ disabled }
        >
          Create account
        </CompoundButton>
      </div>
    );
  }
}