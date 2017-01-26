/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/

import { BaseButton } from '../BaseButton';
import './PrimaryButton.scss';
import '../ButtonCore/ButtonCore.scss';

export class PrimaryButton extends BaseButton {
  protected _variantClassName = 'ms-Button--primary';
}
