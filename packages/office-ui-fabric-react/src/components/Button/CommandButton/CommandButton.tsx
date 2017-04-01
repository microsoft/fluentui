import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import styles = require('./CommandButton.scss');

export const CommandButtonClassNames: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--command',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root,
  flexContainer: styles.flexContainer
};

@customizable('CommandButton')
export class CommandButton extends BaseComponent<IButtonProps, {}> {

  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CommandButtonClassNames }
        onRenderDescription={ this._onRenderNull }
        { ...this.props } />
    );
  }
}
