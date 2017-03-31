import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, IBaseProps } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import { customizable } from '../../ThemeProvider/customizable';

import styles = require('./DefaultButton.scss');

export const DefaultButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--default',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root
};

@customizable('DefaultButton')
export class DefaultButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ DefaultButtonClassNames }
        onRenderDescription={ this._onRenderNull }
        { ...this.props } />
    );
  }
}
