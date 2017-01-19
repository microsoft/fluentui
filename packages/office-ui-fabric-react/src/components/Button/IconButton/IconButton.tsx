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
import { IIconButtonProps } from './IconButton.Props';
import './IconButton.scss';

export class IconButton extends BaseComponent<IIconButtonProps, any> {
  public render() {
    let { icon } = this.props;
    return (
      <ButtonBase
        className='ms-Button--icon'
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-icon'><i className={ `ms-Icon ms-Icon--${icon}` }></i></span>
      </ButtonBase>
    );
  }
}
