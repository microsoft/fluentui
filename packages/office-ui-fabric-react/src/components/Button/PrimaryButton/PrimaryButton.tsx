import * as React from 'react';
import { BaseComponent, customizable, nullRender } from '@uifabric/utilities';
import { BaseButton } from '../BaseButton';
import { IButtonProps, IButtonClassNames } from '../Button.Props';

import styles = require('./PrimaryButton.scss');

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--primary',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root
};

@customizable('PrimaryButton')
export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CLASS_NAMES }
        onRenderDescription={ nullRender }
        { ...this.props }
      />
    );
  }
}
