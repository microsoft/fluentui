import * as React from 'react';
import { BaseButton, IButtonClassNames } from '../BaseButton';
import { BaseComponent, nullRender } from '@uifabric/utilities';
import { IButtonProps } from '../Button.Props';
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

export class IconButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ IconButtonClassNames }
        onRenderText={ nullRender }
        onRenderDescription={ nullRender }
        { ...this.props } />
    );
  }
}
