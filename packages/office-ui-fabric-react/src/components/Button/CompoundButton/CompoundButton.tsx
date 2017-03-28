import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, IBaseProps } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import { withTheme } from '../../ThemeProvider/withTheme';

const styles: any = require('./CompoundButton.scss');

export const CompoundButtonClassNames = {
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

@withTheme('CompoundButton')
export class CompoundButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _resolveComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CompoundButtonClassNames }
        { ...this.props }
      />
    );
  }
}
