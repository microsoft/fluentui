import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getTheme } from '@uifabric/styling';
import { getCompoundButtonStyles } from './CompoundButton.styles';

export class CompoundButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { classNames } = this.props;
    return (
      <BaseButton
        classNames={ getCompoundButtonStyles(getTheme(), classNames) }
        { ...this.props }
      />
    );
  }
}
