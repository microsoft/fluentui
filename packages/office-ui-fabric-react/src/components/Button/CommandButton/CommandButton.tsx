import * as React from 'react';
import { BaseButton, IButtonClassNames } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import * as stylesImport from './CommandButton.scss';
const styles: any = stylesImport;

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--command',
  icon: styles.icon,
  menuIcon: styles.icon,
  isDisabled: styles.isDisabled,
  isEnabled: styles.isEnabled,
  isToggled: styles.isToggled,
  label: styles.label,
  root: styles.root,
  flexContainer: styles.flexContainer
};

export class CommandButton extends BaseComponent<IButtonProps, {}> {

  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <BaseButton
        classNames={ CLASS_NAMES }
        onRenderDescription={ nullRender }
        { ...this.props } />
    );
  }
}
