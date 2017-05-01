import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.Props';
import { getStyles } from './CommandButton.styles';
import { getTheme } from '@uifabric/styling';

export class CommandButton extends BaseComponent<IButtonProps, {}> {

  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    let { classNames } = this.props;

    return (
      <BaseButton
        { ...this.props }
        variantClassName='ms-Button--command'
        classNames={ getStyles(getTheme(), classNames) }
        onRenderDescription={ nullRender }
      />
    );
  }
}
