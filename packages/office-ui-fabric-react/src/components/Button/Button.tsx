import * as React from 'react';

import { IButtonProps, ButtonType } from './Button.Props';
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
export class Button extends BaseButton {
  public render() {
    let props = this.props;

    switch (props.buttonType) {
      case ButtonType.command:
        return <CommandButton { ...props } />;

      case ButtonType.compound:
        return <CompoundButton { ...props } />;

      case ButtonType.icon:
        return <IconButton { ...props } />;

      case ButtonType.primary:
        return <PrimaryButton { ...props } />;

      default:
        return <DefaultButton { ...props } />;
    }
  }
}
