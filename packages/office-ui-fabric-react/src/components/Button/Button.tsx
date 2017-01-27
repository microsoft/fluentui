/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { BaseComponent } from '../../Utilities';
import { ButtonType, IButton, IButtonProps } from './Button.Props';
import { BaseButton } from './BaseButton';

import { DefaultButton } from './DefaultButton/DefaultButton';
import { CommandButton } from './CommandButton/CommandButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { IconButton } from './IconButton/IconButton';
import { PrimaryButton } from './PrimaryButton/PrimaryButton';

/**
 * @deprecated
 * This class is deprecated. Use the individual *Button components instead.
 */
export class Button extends BaseComponent<IButtonProps, {}> implements IButton {
  private _button: BaseButton;

  public render() {
    let props = this.props;

    switch (props.buttonType) {
      case ButtonType.command:
        return <CommandButton ref={ this._resolveRef('_button') } { ...props } />;

      case ButtonType.compound:
        return <CompoundButton ref={ this._resolveRef('_button') } { ...props } />;

      case ButtonType.icon:
        return <IconButton ref={ this._resolveRef('_button') } { ...props } />;

      case ButtonType.primary:
        return <PrimaryButton ref={ this._resolveRef('_button') } { ...props } />;

      default:
        return <DefaultButton ref={ this._resolveRef('_button') } { ...props } />;
    }
  }

  public focus() {
    if (this._button) {
      this._button.focus();
    }
  }
}
