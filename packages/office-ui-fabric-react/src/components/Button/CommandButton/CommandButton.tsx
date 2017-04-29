import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import * as stylesImport from './CommandButton.scss';
const styles: any = stylesImport;

const CLASS_NAMES: IButtonClassNames = {
  base: 'ms-Button',
  variant: 'ms-Button--command',
  icon: styles.icon,
  menuIcon: styles.icon,
  rootDisabled: styles.isDisabled,
  rootEnabled: styles.isEnabled,
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
