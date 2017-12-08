import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './ActionButton.styles';

@customizable('ActionButton', ['theme'])
export class ActionButton extends BaseComponent<IButtonProps, {}> {

  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;
  private _button: BaseButton;

  public render() {
    let { styles, theme } = this.props;

    return (
      <BaseButton
        { ...this.props }
        ref={ button => { if (button) this._button = button; } }
        variantClassName='ms-Button--action ms-Button--command'
        styles={ getStyles(theme!, styles) }
        onRenderDescription={ nullRender }
      />
    );
  }

  public focus(): void {
    if (this._button) {
      this._button.focus();
    }
  }
}
