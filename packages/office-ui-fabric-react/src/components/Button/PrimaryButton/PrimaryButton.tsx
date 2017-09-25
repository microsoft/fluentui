import * as React from 'react';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { IButtonProps } from '../Button.Props';

@customizable('PrimaryButton', ['theme'])
export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    return (
      <DefaultButton
        { ...this.props }
        primary={ true }
        onRenderDescription={ nullRender }
      />
    );
  }
}
