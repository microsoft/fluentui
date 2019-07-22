import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { IButtonProps } from '../Button.types';
import { getStyles } from './DefaultButton.styles';

/**
 * {@docCategory Button}
 */
@customizable('DefaultButton', ['theme', 'styles'], true)
export class DefaultButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _skipComponentRefResolution = true;

  public render(): JSX.Element {
    const { primary = false, styles, theme } = this.props;

    return (
      <BaseButton
        {...this.props}
        variantClassName={primary ? 'ms-Button--primary' : 'ms-Button--default'}
        styles={getStyles(theme!, styles, primary)}
        onRenderDescription={nullRender}
      />
    );
  }
}
