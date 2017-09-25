import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './DefaultButton.styles';

@customizable('DefaultButton', ['theme'])
export class DefaultButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    const { primary = false, styles, theme } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName={ primary ? 'ms-Button--primary' : 'ms-Button--default' }
        styles={ getStyles(theme!, styles, primary) }
        onRenderDescription={ nullRender }
      />
    );
  }
}
