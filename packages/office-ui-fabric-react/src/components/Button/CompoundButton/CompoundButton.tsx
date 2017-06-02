import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './CompoundButton.styles';

export class CompoundButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { styles } = this.props;
    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--compound'
        styles={ getStyles(undefined, styles) }
        onRenderIcon={ nullRender }
      />
    );
  }
}
