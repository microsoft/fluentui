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
import { IDefaultButtonProps } from './DefaultButton.Props';
import './DefaultButton.scss';

export class DefaultButton extends BaseComponent<IDefaultButtonProps, any> {
  private _buttonElement: HTMLButtonElement;
  public render() {
    return (
      <ButtonBase
        className='ms-Button--default'
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-label'>{ this.props.children }</span>
      </ButtonBase>
    );
  }
}

