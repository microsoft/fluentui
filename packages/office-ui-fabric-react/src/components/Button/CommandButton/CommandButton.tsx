/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/
import {
  BaseComponent,
  getNativeProps,
  anchorProperties,
  buttonProperties
} from '../../../Utilities';

import { Button } from '../Button';
import { ButtonType } from '../Button.Props';
import { ICommandButtonProps } from './CommandButton.Props';
import './CommandButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class CommandButton extends BaseComponent<ICommandButtonProps, any> {

  public render() {
    let { icon } = this.props;
    return (
      <Button
        className='ms-Button--command'
        buttonType={ ButtonType.clean }
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-icon'><i className={ `ms-Icon ms-Icon--${icon}` }></i></span>
        <span className='ms-Button-label'>{ this.props.children }</span>
      </Button>
    );
  }
}
