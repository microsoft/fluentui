import * as React from 'react';
import { BaseButton, IButtonClassNames } from '../BaseButton';
import { BaseComponent } from '@uifabric/utilities';
import { IButtonProps } from '../Button.Props';

import styles = require('./CompoundButton.scss');

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--compound',
  description: styles.description,
  flexContainer: styles.flexContainer,
  icon: null,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root
};

export class CompoundButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CLASS_NAMES }
        { ...this.props }
      />
    );
  }
}
