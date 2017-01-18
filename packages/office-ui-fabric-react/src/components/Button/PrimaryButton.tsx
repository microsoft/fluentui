/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  css,
  getNativeProps,
  buttonProperties
} from '../../Utilities';

import { ButtonBase } from './ButtonBase';
import './sass/ButtonBase.scss';
import './sass/ButtonPrimary.scss';

export class PrimaryButton extends ButtonBase {
  protected getRootClassName() { return 'ms-Button--primary'; }
}
