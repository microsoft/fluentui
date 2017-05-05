import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './IconButton.styles';

export class IconButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { styles } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--icon'
        styles={ getStyles(undefined, styles) }
        onRenderText={ nullRender }
        onRenderDescription={ nullRender }
      />
    );
  }
}
