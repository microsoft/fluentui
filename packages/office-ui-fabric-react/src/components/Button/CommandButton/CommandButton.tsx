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
import { ICommandButtonProps } from './CommandButton.Props';
import './CommandButton.scss';

export class CommandButton extends BaseComponent<ICommandButtonProps, any> {

  public render() {
    let { icon } = this.props;
    return (
      <ButtonBase
        className='ms-Button--command'
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-icon'><i className={ `ms-Icon ms-Icon--${icon}` }></i></span>
        <span className='ms-Button-label'>{ this.props.children }</span>
      </ButtonBase>
    );
  }
}

