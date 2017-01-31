import * as React from 'react';
import { BaseButton } from '../BaseButton';

import './IconButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class IconButton extends BaseButton {
  protected _variantClassName = 'ms-Button--icon';

  protected onRenderLabel() {
    return null;
  }

  protected onRenderDescription() {
    return null;
  }

  protected onRenderChildren() {
    return null;
  }
}
