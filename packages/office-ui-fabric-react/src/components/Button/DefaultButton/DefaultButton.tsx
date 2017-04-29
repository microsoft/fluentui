import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';

import * as stylesImport from './DefaultButton.scss';
const styles: any = stylesImport;

export const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--default',
  icon: styles.icon,
  menuIcon: styles.icon,
  rootDisabled: styles.isDisabled,
  rootEnabled: styles.isEnabled,
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
        { ...this.props }
        classNames={ CLASS_NAMES }
        onRenderDescription={ nullRender }
      />
    );
  }
}
