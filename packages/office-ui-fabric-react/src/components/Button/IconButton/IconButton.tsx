import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender, assign } from '../../../Utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import * as stylesImport from './IconButton.scss';
const styles: any = stylesImport;

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--icon',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  isOpened: styles.isOpened,
  root: styles.root
};

export class IconButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        { ...this.props }
        classNames={ assign({}, CLASS_NAMES, this.props.classNames) }
        onRenderText={ nullRender }
        onRenderDescription={ nullRender }
      />
    );
  }
}
