import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './IconButton.styles';
import { getTheme } from '@uifabric/styling';

export class IconButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { classNames } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--icon'
        classNames={ getStyles(getTheme(), classNames) }
        onRenderText={ nullRender }
        onRenderDescription={ nullRender }
      />
    );
  }
}
