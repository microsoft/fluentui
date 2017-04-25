import * as React from 'react';
import { BaseButton, IButtonClassNames } from '../BaseButton';
import { BaseComponent, nullRender, assign } from '../../../Utilities';
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
  isOpened: styles.isOpened,
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
        { ...this.props }
        classNames={ assign(CLASS_NAMES, this.props.classNames) }
        onRenderDescription={ nullRender }
      />
    );
  }
}
