import * as React from 'react';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { ThemeSettingName } from '../../../Styling';
import { DefaultButton } from '../';
import { IButtonProps } from '../Button.Props';

@customizable([ThemeSettingName])

export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    const { theme, styles } = this.props;

    return (
      <DefaultButton
        { ...this.props }
        primary={ true }
        onRenderDescription={ nullRender }
      />
    );
  }
}
