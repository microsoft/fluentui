import * as React from 'react';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { ThemeSettingName } from '../../../Styling';
import { BaseButton } from '../BaseButton';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './PrimaryButton.styles';

@customizable([ThemeSettingName])

export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    const { theme, styles } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--primary'
        onRenderDescription={ nullRender }
        styles={ getStyles(theme!, styles) }
      />
    );
  }
}
