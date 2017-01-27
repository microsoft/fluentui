/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/
import {
  BaseComponent,
  getNativeProps,
  anchorProperties,
  buttonProperties
} from '../../../Utilities';

import { Button, IButtonProps, ButtonType } from '../index';

import './PrimaryButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class PrimaryButton extends BaseComponent<IButtonProps, any> {
  public render() {
    return (
      <Button
        className='ms-Button--primary ms-Button'
        buttonType={ ButtonType.clean }
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-label'>{ this.props.children }</span>
      </Button>
    );
  }
}
