import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, IBaseProps } from '@uifabric/utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import { withTheme } from '../../ThemeProvider/withTheme';
const styles: any = require('./IconButton.scss');

export const IconButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--icon',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  root: styles.root
};

@withTheme('IconButton')
export class IconButton extends BaseComponent<IButtonProps, {}> {
  public render() {
    return (
      <BaseButton
        classNames={ IconButtonClassNames }
        onRenderLabel={ this._nullRender }
        onRenderDescription={ this._nullRender }
        { ...this.props } />
    );
  }

  private _nullRender() {
    return null;
  }

  /**
   * We override this to let the BaseButton receive innerRef and resolve it.
   */
  protected _updateInnerRef(currentProps: IBaseProps<IButtonProps>, newProps: IBaseProps<IButtonProps> = {}) { }
}
