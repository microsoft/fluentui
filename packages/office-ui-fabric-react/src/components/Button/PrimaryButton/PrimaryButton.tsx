import * as React from 'react';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { IButtonProps } from '../Button.types';

/**
 * {@docCategory Button}
 */
@customizable('PrimaryButton', ['theme', 'styles'], true)
export class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  /**
   * Set this BaseComponent._skipComponentRefResolution to true, bypassing resolution of componentRef.
   */
  protected _skipComponentRefResolution = true;

  public render(): JSX.Element {
    return <DefaultButton {...this.props} primary={true} onRenderDescription={nullRender} />;
  }
}
