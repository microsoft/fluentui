import * as React from 'react';
import { BaseComponent, nullRender } from '../../../Utilities';
import { BaseButton, IButtonClassNames } from '../BaseButton';
import { IButtonProps } from '../Button.Props';

import * as stylesImport from './PrimaryButton.scss';
const styles: any = stylesImport;

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--primary',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  isToggled: styles.isToggled,
  label: styles.label,
  root: styles.root
};

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
