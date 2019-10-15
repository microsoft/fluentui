import * as React from 'react';

import { BaseComponent, warn } from '../../Utilities';
import { ButtonType, IButtonProps } from './Button.types';
import { DefaultButton } from './DefaultButton/DefaultButton';
import { ActionButton } from './ActionButton/ActionButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { IconButton } from './IconButton/IconButton';
import { PrimaryButton } from './PrimaryButton/PrimaryButton';
/**
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated Use the individual *Button components instead.
 * {@docCategory Button}
 */
export class Button extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._skipComponentRefResolution to true, bypassing resolution of componentRef.
   */
  protected _skipComponentRefResolution = true;

  constructor(props: IButtonProps) {
    super(props);

    warn(
      `The Button component has been deprecated. Use specific variants instead. ` +
        `(PrimaryButton, DefaultButton, IconButton, ActionButton, etc.)`
    );
  }

  public render(): JSX.Element {
    const props = this.props;

    switch (props.buttonType) {
      case ButtonType.command:
        return <ActionButton {...props} />;

      case ButtonType.compound:
        return <CompoundButton {...props} />;

      case ButtonType.icon:
        return <IconButton {...props} />;

      case ButtonType.primary:
        return <PrimaryButton {...props} />;

      default:
        return <DefaultButton {...props} />;
    }
  }
}
