/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/
import {
  BaseComponent,
  getNativeProps,
  anchorProperties,
  buttonProperties
} from '../../../Utilities';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { IPrimaryButtonProps } from './PrimaryButton.Props';
import './PrimaryButton.scss';

export class PrimaryButton extends BaseComponent<IPrimaryButtonProps, any> {
  public render() {
    return (
      <ButtonBase
        className='ms-Button--primary'
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-label'>{ this.props.children }</span>
      </ButtonBase>
    );
  }
}
