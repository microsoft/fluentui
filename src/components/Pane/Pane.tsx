/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { BaseComponent } from '../../common/BaseComponent';
import { IPaneProps, PaneType } from './Pane.Props';
import { Popup } from '../Popup/index';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import { getRTL } from '../../utilities/rtl';
import { PaneContent } from './PaneContent';
import { WrappedContent } from './WrappedContent';
import './Pane.scss';

export interface IPaneState {
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
  id?: string;
}

export class Pane extends BaseComponent<IPaneProps, IPaneState> {

}