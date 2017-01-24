/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/
import {
  BaseComponent,
  getNativeProps,
  anchorProperties,
  buttonProperties
} from '../../../Utilities';

import { Button, ButtonType } from '../index';
import { ICompoundButtonProps } from './CompoundButton.Props';
import './CompoundButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class CompoundButton extends BaseComponent<ICompoundButtonProps, any> {
  public render() {
    let { description } = this.props;
    return (
      <Button
        className='ms-Button--compound'
        buttonType={ ButtonType.clean }
        { ...getNativeProps(this.props, anchorProperties || buttonProperties) }
        { ...this.props }
      >
        <span className='ms-Button-label'>{ this.props.children }</span>
        <span className='ms-Button-description'>{ description }</span>
      </Button>
    );
  }
}
