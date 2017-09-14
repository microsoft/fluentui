/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { BaseComponent, warn } from '../../Utilities';
import { ButtonType, IButtonProps } from './Button.Props';
import { DefaultButton } from './DefaultButton/DefaultButton';
import { CommandButton } from './CommandButton/CommandButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { IconButton } from './IconButton/IconButton';
import { PrimaryButton } from './PrimaryButton/PrimaryButton';
/**
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated
 */
export class Button extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  constructor(props: IButtonProps) {
    super(props);

    warn(
      `The Button component has been deprecated. Use specific variants instead. ` +
      `(PrimaryButton, DefaultButton, IconButton, CommandButton, etc.)`
    );
  }

  public render() {
    const props = this.props;

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
