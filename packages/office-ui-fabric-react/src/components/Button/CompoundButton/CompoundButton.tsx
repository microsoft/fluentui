import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './CompoundButton.styles';

@customizable('CompoundButton', ['theme'])
export class CompoundButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { primary = false, styles, theme } = this.props;
    return (
      <BaseButton
        { ...this.props }
        variantClassName={ primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound' }
        styles={ getStyles(theme!, styles, primary) }
        onRenderIcon={ nullRender }
      />
    );
  }
}
