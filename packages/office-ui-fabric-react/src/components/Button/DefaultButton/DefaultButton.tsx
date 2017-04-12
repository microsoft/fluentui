import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';

import styles = require('./DefaultButton.scss');

export const DefaultButtonClassNames: IButtonClassNames = {
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
        onRenderDescription={ nullRender }
        { ...this.props } />
    );
  }
}
