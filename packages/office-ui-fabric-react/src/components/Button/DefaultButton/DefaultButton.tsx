import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, nullRender } from '../../../Utilities';
import { IButtonProps, IButtonClassNames } from '../Button.Props';
import { getStyles } from './DefaultButton.styles';
import { getTheme } from '@uifabric/styling';

export class DefaultButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  public render() {
    const { classNames } = this.props;

    return (
      <BaseButton
        { ...this.props }
        classNames={ getStyles(getTheme(), classNames) }
        onRenderDescription={ nullRender }
      />
    );
  }
}
