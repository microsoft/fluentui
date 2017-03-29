import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, IBaseProps } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import { withTheme } from '../../ThemeProvider/withTheme';

const styles: any = require('./CommandButton.scss');

export const CommandButtonClassNames: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--command',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  label: styles.label,
  root: styles.root,
  flexContainer: styles.flexContainer
};

@withTheme('CommandButton')
export class CommandButton extends BaseComponent<IButtonProps, {}> {

  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CommandButtonClassNames }
        onRenderDescription={ this._onRenderNull }
        { ...this.props } />
    );
  }
}
