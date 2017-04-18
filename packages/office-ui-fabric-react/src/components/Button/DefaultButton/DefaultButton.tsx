import * as React from 'react';
import { BaseButton, IButtonClassNames } from '../BaseButton';
import { BaseComponent, nullRender } from '@uifabric/utilities';
import { IButtonProps } from '../Button.Props';

import styles = require('./DefaultButton.scss');

export const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--default',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root
};

export class DefaultButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CLASS_NAMES }
        onRenderDescription={ nullRender }
        { ...this.props } />
    );
  }
}
