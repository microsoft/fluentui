// import * as React from 'react';
import { BaseButton } from '../BaseButton';
import './DefaultButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class DefaultButton extends BaseButton {
  protected _variantClassName = 'ms-Button--default';

  protected onRenderDescription() {
    return null;
  }
}
