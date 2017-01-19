/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  anchorProperties,
  buttonProperties
} from '../../../Utilities';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { IPrimaryButtonProps } from './PrimaryButton.Props';
import './PrimaryButton.scss';

export class PrimaryButton extends BaseComponent<IPrimaryButtonProps, any> {
  private _buttonElement: HTMLButtonElement;
  public render() {
    return (
      <ButtonBase
        className='ms-Button--primary'
        { ...this.props }
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
      >
        <span className='ms-Button-label'>{ this.props.children }</span>
      </ButtonBase>
    );
  }
}

