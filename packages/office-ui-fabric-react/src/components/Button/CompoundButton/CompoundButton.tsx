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
import { ICompoundButtonProps } from './CompoundButton.Props';
import './CompoundButton.scss';

export class CompoundButton extends BaseComponent<ICompoundButtonProps, any> {
  private _buttonElement: HTMLButtonElement;
  public render() {
    let { description } = this.props;
    return (
      <ButtonBase
        className='ms-Button--compound'
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-label'>{ this.props.children }</span>
        <span className='ms-Button-description'>{ description }</span>
      </ButtonBase>
    );
  }
}

