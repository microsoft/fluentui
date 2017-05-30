import * as React from 'react';
import { BaseComponent, nullRender } from '../../../Utilities';
import { BaseButton } from '../BaseButton';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './PrimaryButton.styles';

export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    const { styles } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--primary'
        onRenderDescription={ nullRender }
        styles={ getStyles(undefined, styles) }
      />
    );
  }
}
