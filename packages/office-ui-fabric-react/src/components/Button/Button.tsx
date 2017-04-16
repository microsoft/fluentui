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
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated
 */
export class Button extends BaseComponent<IButtonProps, {}> implements IButton {
  private _button: BaseButton;

  public render() {
    let props = this.props;

    switch (props.buttonType) {
      case ButtonType.command:
        return <CommandButton { ...props } ref={ this._resolveRef('_button') } />;

      case ButtonType.compound:
        return <CompoundButton { ...props } ref={ this._resolveRef('_button') } />;

      case ButtonType.icon:
        return <IconButton { ...props } ref={ this._resolveRef('_button') } />;

      case ButtonType.primary:
        return <PrimaryButton { ...props } ref={ this._resolveRef('_button') } />;

      default:
        return <DefaultButton { ...props } ref={ this._resolveRef('_button') } />;
    }
  }

  public focus() {
    if (this._button) {
      this._button.focus();
    }
  }
}
