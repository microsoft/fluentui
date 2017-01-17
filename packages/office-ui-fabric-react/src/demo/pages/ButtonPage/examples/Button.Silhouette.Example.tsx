import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';
import { IButtonProps } from './IButtonProps';

export class ButtonSilhouetteExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Silhouette button</Label>
        <Button
          disabled={ disabled }
          buttonType={ ButtonType.silhouette }
          icon='PeopleAdd' >
          Add members
        </Button>
      </div>
    );
  }
}
