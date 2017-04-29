import * as React from 'react';
import { BaseComponent, nullRender } from '../../../Utilities';
import { getTheme } from '@uifabric/styling';
import { BaseButton } from '../BaseButton';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './PrimaryButton.styles';

export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    const { classNames } = this.props;
    const styles = getStyles();

    return (
      <BaseButton
        { ...this.props }
        onRenderDescription={ nullRender }
        classNames={ getStyles(getTheme(), classNames) }
      />
    );
  }
}
