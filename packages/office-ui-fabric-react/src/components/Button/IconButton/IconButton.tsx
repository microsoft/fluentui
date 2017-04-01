import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import styles = require('./IconButton.scss');

export const IconButtonClassNames: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--icon',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  root: styles.root
};

@customizable('IconButton')
export class IconButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ IconButtonClassNames }
        onRenderText={ this._onRenderNull }
        onRenderDescription={ this._onRenderNull }
        { ...this.props } />
    );
  }
}
