import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import * as stylesImport from './IconButton.scss';
const styles: any = stylesImport;

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--icon',
  icon: styles.icon,
  menuIcon: styles.icon,
  rootDisabled: styles.isDisabled,
  rootEnabled: styles.isEnabled,
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
        classNames={ CLASS_NAMES }
        onRenderText={ nullRender }
        onRenderDescription={ nullRender }
        { ...this.props } />
    );
  }
}
